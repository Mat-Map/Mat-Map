# MatMap Frontend — Guide for Fabiola

Welcome to `apps/frontend`. This document explains what you're building, why
the file structure looks the way it does, and what "done" means for the MVP.
It does not contain code — just what each piece is responsible for.

---

## 1. What you're building

A Next.js Progressive Web App (PWA) that:
1. Shows a Google Map centered on the Thika Road corridor (CBD → Juja).
2. Places markers for every matatu stage and draws colored lines for each route.
3. Lets a user pick a "from" stage and a "to" stage.
4. Calls the backend's `/journey` endpoint and displays the matched route,
   fare estimate, and live ETA — decoding the returned polyline onto the map.
5. Works reasonably on mobile, since that's how most people would actually
   use something like this in Kenya.

You are the **only** consumer of the backend's REST API — you never call
Google's APIs from the backend, and you never call the ml-service directly.
Everything you need comes through Britton's `/api/v1/*` endpoints (spec in
`docs/api-spec.md`). You'll load Google's Maps JavaScript SDK yourself,
client-side, using a browser-restricted key Britton will give you — that key
is safe to expose in the browser by design (it's locked to your domain).

---

## 2. Environment variables you'll need

Given to you by Britton, placed in `apps/frontend/.env.local` (never commit
this file):

- `NEXT_PUBLIC_API_BASE_URL` — the backend's base URL (`http://localhost:4000/api/v1` in dev)
- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` — your own Maps JavaScript API key, restricted to your dev/deploy domains

Anything prefixed `NEXT_PUBLIC_` is bundled into the browser — that's
intentional here, but never put a secret key behind that prefix.

---

## 3. Recommended file structure

```
apps/frontend/
├── public/
│   ├── manifest.json
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   ├── globals.css
│   │   └── loading.jsx
│   ├── api/
│   │   ├── client.js
│   │   ├── stages.js
│   │   ├── routes.js
│   │   └── journey.js
│   ├── components/
│   │   ├── Map/
│   │   │   ├── MapView.jsx
│   │   │   ├── StageMarker.jsx
│   │   │   └── RoutePolyline.jsx
│   │   ├── JourneyForm.jsx
│   │   ├── JourneyResult.jsx
│   │   └── LoadingSpinner.jsx
│   ├── hooks/
│   │   ├── useStages.js
│   │   ├── useRoutes.js
│   │   └── useJourney.js
│   └── styles/
│       └── variables.css
├── next.config.js
├── package.json
└── .env.local
```

### What each piece is for

**`public/manifest.json`** — the PWA manifest: app name, icons, theme color,
"display: standalone" so it can be added to a phone's home screen and feel
like a real app rather than a browser tab. This is what makes it a *PWA* and
not just a website.

**`public/icons/`** — the actual icon images referenced by the manifest, at
the sizes phones expect (typically 192x192 and 512x512 at minimum).

**`src/app/layout.jsx`** — the root layout: wraps every page, sets up the
`<html>`/`<body>` shell, page metadata (title, description, viewport), links
the manifest, and is where you'd load global fonts or providers.

**`src/app/page.jsx`** — the main (and for the MVP, probably only) screen:
the map plus the journey form. This is where most of your composition
happens — it pulls in `MapView`, `JourneyForm`, and `JourneyResult` and
wires them together.

**`src/app/globals.css`** — app-wide base styles (resets, base typography).

**`src/app/loading.jsx`** — Next.js's built-in loading UI convention, shown
automatically while a route segment is fetching data. Worth having even for
a single-page MVP, since the initial stages/routes fetch has real latency.

**`src/api/client.js`** — a thin wrapper around `fetch` that prefixes
`NEXT_PUBLIC_API_BASE_URL`, handles JSON parsing, and turns non-2xx
responses into thrown errors your hooks can catch consistently. Every other
file in `src/api/` uses this instead of calling `fetch` directly.

**`src/api/stages.js` / `routes.js` / `journey.js`** — one file per backend
resource, each exporting a small function (e.g. `getStages()`,
`getJourney(fromId, toId)`) that calls `client.js`. Keeps your components
from knowing anything about URLs or query params.

**`src/components/Map/MapView.jsx`** — owns the actual Google Map instance:
initializes it, sets the center/zoom over Thika Road, and renders the
markers/polylines passed into it as children or props.

**`src/components/Map/StageMarker.jsx`** — a single stage pin on the map,
probably clickable to select it as "from" or "to."

**`src/components/Map/RoutePolyline.jsx`** — draws one matatu route's line
on the map, colored per the `color` field the backend returns for each route.

**`src/components/JourneyForm.jsx`** — the from/to stage picker (likely two
dropdowns or a searchable select) plus a submit action that triggers the
`/journey` call.

**`src/components/JourneyResult.jsx`** — displays what `/journey` returned:
matched route name/SACCO, fare, ETA, distance — and a clear "no direct
route" state, since the backend explicitly returns that as a valid outcome,
not an error.

**`src/components/LoadingSpinner.jsx`** — shared loading indicator, used
while `/journey` or the initial map data is in flight.

**`src/hooks/useStages.js` / `useRoutes.js`** — fetch-and-cache hooks that
load stage/route data once on mount and expose loading/error state to
whatever component needs it.

**`src/hooks/useJourney.js`** — manages the from/to selection state and
triggers/tracks the `/journey` request, including its loading and error
states.

**`src/styles/variables.css`** — shared CSS custom properties (colors,
spacing) so route colors and UI theme stay consistent without hardcoding
hex values in multiple components.

**`next.config.js`** — Next.js project config. For this project you'll
likely need image domain allowlisting (if you use `next/image` for any
remote images) and possibly PWA plugin configuration if you add
`next-pwa` or similar for offline/service-worker support.

---

## 4. What "up to date Next.js" means for this project

- Use the **App Router** (`src/app/`), not the older Pages Router — it's
  the current default and what the recommended structure above assumes.
- Use the built-in **Metadata API** in `layout.jsx` for title/description/
  viewport instead of a manual `<head>` tag.
- Use `next/image` for any static images so you get automatic optimization.
- Client components that touch the browser (like anything rendering the
  Google Map, which needs `window`) need the `"use client"` directive at
  the top of the file — Server Components are the App Router default, and
  the map explicitly is not one.
- Keep `NEXT_PUBLIC_` env vars out of anything that could be considered a
  secret — they are visible in the shipped JS bundle by design.

---

## 5. Final checklist — project expectations

**Core functionality**
- [ ] Map renders centered on the Thika Road corridor with all stages visible as markers
- [ ] Each seeded route is drawn as a distinct colored polyline
- [ ] User can select a "from" and "to" stage and submit
- [ ] `/journey` result displays route name, SACCO, fare, and ETA clearly
- [ ] The "no direct route" case is handled with real UI, not a blank screen
- [ ] Loading and error states exist for every API call — nothing silently hangs

**PWA correctness**
- [ ] `manifest.json` is complete and linked from `layout.jsx`
- [ ] App icons exist at the required sizes
- [ ] The app can be installed to a phone home screen and opens in standalone mode

**Integration hygiene**
- [ ] `.env.local` is gitignored and never committed
- [ ] Your browser Google Maps key is confirmed to be domain-restricted, not the same key Britton uses server-side
- [ ] You've tested against Britton's locally running backend before assuming a bug is on your side
- [ ] Once deployed, `NEXT_PUBLIC_API_BASE_URL` points at the real deployed backend URL, not `localhost`

**Presentation readiness**
- [ ] Mobile layout doesn't break — test on an actual phone screen size, not just desktop devtools
- [ ] You can explain what happens on screen when `/journey` returns `eta: null` (Google API hiccup) so it doesn't look broken live
- [ ] A basic loading spinner covers the ~1-2s gap while `/journey` resolves, so the UI never looks frozen
