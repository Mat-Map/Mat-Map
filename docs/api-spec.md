# MatMap Backend API — v1

> **Provenance:** this spec was reverse-engineered directly from the live backend
> source (`apps/backend/src/{routes,controllers,services,middleware}/**`,
> `apps/backend/prisma/schema.prisma`) — not written speculatively. Britton owns
> the backend; if behavior here and actual behavior ever diverge, the running
> code wins and this doc needs a PR. Frontend must treat this file as the
> **only** contract it builds against — never call Google's APIs or the
> ml-service directly.

**Base URL (dev):** `http://localhost:4000/api/v1`
**Base URL (prod):** set via `NEXT_PUBLIC_API_BASE_URL`

**Auth:** none in v1. No headers required beyond `Content-Type: application/json`
on requests that send a body (none currently do — every v1 endpoint is `GET`).

**CORS:** backend allows only `GET, POST, OPTIONS`, from a single origin set by
its own `CORS_ORIGIN` env var. If every frontend fetch fails with an opaque
network/CORS error and the response never even reaches your error handling,
this is the first thing to check — confirm `CORS_ORIGIN` on the backend
matches the frontend's actual origin (dev port and, later, the deployed URL).

---

## Common response envelope

Success responses are **not** wrapped uniformly — each resource returns its own
shape (see per-endpoint sections below; most wrap in a named key like
`{ stages: [...] }`, a couple return the object directly).

Error responses **are** uniform, from every endpoint, always:

```json
{
  "error": {
    "message": "Human-readable message",
    "statusCode": 404,
    "details": { "from": ["from must be a valid stage id"] }
  }
}
```

- `details` is **only** present on `400` validation errors (Zod field errors,
  keyed by query param name). Don't assume it exists — check for it.
- `500` responses always return the generic message `"Internal server error"`,
  regardless of the real cause — don't try to surface `err.message` from a 500
  to the user, there isn't one worth showing.

## Rate limiting

| Limiter | Applies to | Limit | Response on breach |
|---|---|---|---|
| `directionsLimiter` | `/journey`, `/directions` | 60 requests / 15 min (per IP) | `429` + `{error:{message:"Too many directions requests, please try again later.",statusCode:429}}` |
| `generalLimiter` | everything (incl. the two above) | 300 requests / 15 min (per IP) | `429` + `{error:{message:"Too many requests, please try again later.",statusCode:429}}` |

Both are real, standard `RateLimit-*` headers are sent (`standardHeaders: true`).
**The frontend must handle `429` as a distinct, user-visible state** — not the
same generic "something went wrong" as a `500` — this is easy to hit
accidentally while a `useEffect` is refetching `/journey` on every keystroke
during dev, so build the debounce/guard in from the start rather than after
someone trips it.

---

## Data types

```ts
Stage = {
  id: string        // uuid
  name: string
  slug: string
  lat: number
  lng: number
  order: number      // position along the CBD → Juja corridor, ascending
  createdAt: string  // ISO datetime
}

Route = {
  id: string
  name: string
  sacco: string | null
  color: string | null   // hex, e.g. "#1D9E75" — THIS is the livery color.
                          // There is no separate design-token palette for
                          // per-route color; render whatever the API returns.
                          // It can be null — define a fallback swatch.
  stages: Array<{ id, name, lat, lng, sequence: number }>  // only on
                                                             // list/detail,
                                                             // not on the
                                                             // journey/fare
                                                             // responses
}

Fare = {
  baseFare: number   // Ksh, integer
  peakFare: number | null
}

JourneyOption = {
  type: "direct" | "no_direct_route"
  route: { id, name, sacco, color } | null   // null when type is no_direct_route
  fare: { baseFare, peakFare } | null        // null if no fare row exists for the pair
  eta: { durationMinutes, distanceKm, polyline } | null  // null if Google's
                                                            // Directions API
                                                            // call failed
                                                            // server-side —
                                                            // this is a real,
                                                            // designed-for
                                                            // state, not a bug
}
```

---

## Endpoints

### `GET /health`
No params. Returns `{ "status": "ok", "timestamp": "<ISO datetime>" }`. Not
rate-limited beyond the general limiter. Useful for a build-time smoke test.

### `GET /stages`
No params.
```json
{ "stages": [ { "id": "...", "name": "Nairobi CBD (Ambassadeur)", "slug": "cbd-ambassadeur", "lat": -1.2841, "lng": 36.8259, "order": 1, "createdAt": "..." }, ... ] }
```
Ordered by `order` ascending (i.e. already in CBD → Juja sequence — don't
re-sort client-side, just render in array order).

### `GET /stages/:id`
`:id` is a stage uuid. Returns `{ "stage": {...} }` or `404` with the standard
error envelope if the id doesn't exist.

### `GET /routes`
No params.
```json
{
  "routes": [
    {
      "id": "...",
      "name": "Route 237",
      "sacco": "Thika Rd Shuttle SACCO",
      "color": "#1D9E75",
      "stages": [ { "id": "...", "name": "Nairobi CBD (Ambassadeur)", "lat": -1.2841, "lng": 36.8259, "sequence": 1 }, ... ]
    }
  ]
}
```
**Current seed data:** all 3 routes (Route 237 `#1D9E75`, Forward Travellers
`#378ADD`, Super Metro 25 `#D85A30`) are linked to **every** stage on the
corridor (single-corridor MVP — there's no branching route network yet). This
matters for testing `/journey` below.

### `GET /routes/:id`
Same shape as one item above, wrapped as `{ "route": {...} }`. `404` if not found.

### `GET /fares?from=<stageUuid>&to=<stageUuid>`
Both params **must be stage UUIDs**, not slugs or names — `400` with
`details.from` / `details.to` if either isn't a valid UUID string.
```json
{ "from": {"id":"...","name":"Museum Hill"}, "to": {"id":"...","name":"Kasarani"}, "baseFare": 80, "peakFare": 130, "updatedAt": "..." }
```
`404` (no `details`) if no fare row exists for that exact stage pair — fares
are seeded for every ordered pair of the 12 corridor stages, but if you're
ever testing against a partially-seeded or non-seed DB, this is reachable.

### `GET /directions?from=<stageUuid>&to=<stageUuid>`
Same param validation as `/fares`. Wraps a live call to Google's Directions
API (server-side key, cached ~5 min by default).
```json
{ "from": {...}, "to": {...}, "durationMinutes": 34, "distanceKm": 12.4, "polyline": "<encoded polyline string>" }
```
`404` if either stage id doesn't exist. Rate-limited (see above). The
`polyline` is Google's standard encoded polyline format — decode client-side
with the Maps JS SDK's geometry library, don't hand-roll a decoder.

### `GET /journey?from=<stageUuid>&to=<stageUuid>`
The main screen's endpoint. Same UUID validation, same rate limit as
`/directions`.
```json
{
  "from": { "id": "...", "name": "Museum Hill" },
  "to": { "id": "...", "name": "Kasarani" },
  "options": [
    {
      "type": "direct",
      "route": { "id": "...", "name": "Route 237", "sacco": "Thika Rd Shuttle SACCO", "color": "#1D9E75" },
      "fare": { "baseFare": 80, "peakFare": 130 },
      "eta": { "durationMinutes": 34, "distanceKm": 12.4, "polyline": "..." }
    }
    // ...one entry per route that serves both stages in the right direction
  ]
}
```
`404` if either stage id doesn't exist.

**How to actually reach `no_direct_route` for testing:** because every seeded
route currently serves every stage, the *only* way today's seed data produces
`type: "no_direct_route"` is by picking a `to` stage whose `order` is **less
than or equal to** the `from` stage's `order` — i.e. selecting a destination
that's the same as or earlier along the corridor than the origin. (The
matching logic requires `fromStop.sequence < toStop.sequence` on every
candidate route.) Use that combination to build/verify the empty-state UI
rather than guessing at stage pairs that might not exist.

**How to reach `eta: null` for testing:** temporarily break/omit
`GOOGLE_MAPS_SERVER_KEY` on the backend, or exhaust its quota — the journey
service catches the Directions failure, logs it, and still returns
`route`/`fare` with `eta: null`. This is not a hypothetical edge case; build
and test the UI treatment for it deliberately.

---

## Known gaps — not yet implemented

**There is no community-reports endpoint.** The original planning docs
(`fare_reports` / `crowd_reports` / `vibe_reports` tables, `POST /reports/*`)
describe a feature that was scoped but has **not** been built — it's absent
from `prisma/schema.prisma` (only `Stage`, `Route`, `RouteStage`, `Fare`
exist) and absent from `routes/index.js` (only `stages`, `routes`, `fares`,
`journey`, `directions`, `health` are mounted). If the frontend needs to build
a report-submission UI (e.g. the community report modal), it currently has
**nothing real to submit to** — see the note in the agent prompt's Stage 8 for
how to handle this without the frontend agent touching `apps/backend/`.