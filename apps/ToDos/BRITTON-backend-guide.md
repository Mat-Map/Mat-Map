# MatMap Backend — Setup & Completion Guide (Britton)

This is your working document for taking `apps/backend` from "code exists" to
"fully working, demo-ready, and defensible if someone asks how it works."

---

## 1. Keys and placeholders you must replace

Everything below was scaffolded with placeholder or example values. None of
these are safe to demo with as-is.

| What | Where | Current placeholder | Action needed |
|---|---|---|---|
| Google Maps server key | `.env` → `GOOGLE_MAPS_SERVER_KEY` | `your_server_restricted_key_here` | Create a real key in Google Cloud Console, restricted to **Directions API + Geocoding API only** (no IP restriction once deployed — see §4) |
| Database URL | `.env` → `DATABASE_URL` | `postgresql://user:password@localhost:5432/matmap` | Point at your real local Postgres (Docker) for dev, and at Render's provisioned Postgres URL once deployed |
| CORS origin | `.env` → `CORS_ORIGIN` | `http://localhost:3000` | Update to Fabiola's actual Vercel URL once the frontend is deployed, or every request from the real frontend will fail |
| Stage coordinates | `prisma/seed.js` → `STAGES` array | Approximate placeholder lat/lng | **Verify every coordinate against real locations** before demo day — a wrong pin is the most visible possible bug |
| ML service URL | `.env` (not yet added) | n/a | Add `ML_SERVICE_URL` once Ashley's service has a stable endpoint — leave unset until then, backend falls back to static fares automatically |
| `.env` vs `.env.example` | root of `apps/backend` | `.env.example` has empty key fields, `.env` has placeholders | Never commit `.env`. Confirm `.gitignore` actually excludes it — check now, not after a push |

---

## 2. First-time local setup (do this in order)

```powershell
cd apps/backend
npm install

# Postgres via Docker (skip if you already have one running)
docker run --name matmap-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=matmap -p 5432:5432 -d postgres:16

# Fill in .env with real values from §1 above

npm run prisma:migrate
npm run seed
npm run dev
```

Verify it's alive:
```powershell
curl http://localhost:4000/api/v1/health
curl http://localhost:4000/api/v1/stages
curl "http://localhost:4000/api/v1/journey?from=<real-stage-id>&to=<real-stage-id>"
```

If `/journey` returns a populated `eta` object with a real `durationMinutes`
and `polyline`, your Google integration is genuinely working — not just
returning cached/fake data.

Run the test suite:
```powershell
npm test
```

---

## 3. Google Cloud Console setup checklist

- [ ] Created a Google Cloud project dedicated to MatMap (not a personal/shared project)
- [ ] Enabled **Directions API**
- [ ] Enabled **Geocoding API**
- [ ] Created the **server key** (used only by the backend, never sent to a browser)
- [ ] Created a **separate browser key** for Fabiola (Maps JavaScript API, HTTP-referrer restricted to her dev + deploy domains) — do not reuse your server key for this
- [ ] Set a **billing budget alert** on the project (even a small one — this catches runaway usage before it becomes a bill)
- [ ] Confirmed the per-API free tier caps (roughly 10k requests/month per SKU as of mid-2026) are enough for your expected demo traffic — they will be, but check the Console dashboard once to be sure

---

## 4. Deployment checklist (Render)

- [ ] Backend deployed as a Render **Web Service**, connected to this repo, root directory set to `apps/backend`
- [ ] Render **PostgreSQL** instance provisioned in the same account/region
- [ ] `DATABASE_URL` env var on Render points at the Render Postgres instance (use the internal connection string for lower latency)
- [ ] All other env vars (`GOOGLE_MAPS_SERVER_KEY`, `CORS_ORIGIN`, `DIRECTIONS_CACHE_TTL_MS`, `NODE_ENV=production`) set in Render's dashboard — never committed to the repo
- [ ] Ran `npx prisma migrate deploy` against the Render database (not `migrate dev` — that's for local only)
- [ ] Ran `npm run seed` against the Render database so it isn't empty on demo day
- [ ] Google server key switched from IP-restricted to **API-restricted only** (Render free tier has no static outbound IP)
- [ ] Confirmed `/api/v1/health` responds correctly at the deployed URL
- [ ] Warmed up the service (hit it a few times) shortly before presenting, since Render's free tier sleeps after 15 minutes idle and takes 30-60s to wake

---

## 5. Full project expectations — final checklist

Use this as your "am I actually done" list, not just "does it run."

**Data & domain**
- [ ] All Thika Road stages seeded with verified, accurate coordinates
- [ ] At least 2-3 real matatu routes/SACCOs represented with correct stage sequences
- [ ] Fare data is at minimum plausible (even if not scraped from real sources) and internally consistent (further stages cost more)

**API correctness**
- [ ] `/stages`, `/stages/:id`, `/routes`, `/routes/:id`, `/fares`, `/journey`, `/directions`, `/health` all return correct, well-shaped JSON
- [ ] Invalid input (bad UUIDs, missing query params) returns a clean 400, not a 500 or a crash
- [ ] Nonexistent stage IDs return a clean 404
- [ ] `/journey` degrades gracefully (returns `eta: null`, doesn't crash) if the Google API call fails
- [ ] Rate limiting is active but not so tight it blocks a live demo (60 req/15min on `/journey` and `/directions` should be plenty)

**Security & hygiene**
- [ ] `.env` is gitignored and was never committed (check `git log --all --full-history -- apps/backend/.env`)
- [ ] Server-side Google key is never referenced anywhere in `apps/frontend`
- [ ] CORS only allows Fabiola's actual frontend origin, not `*`

**Team integration**
- [ ] Fabiola has the finalized `docs/api-spec.md` and confirms her frontend successfully calls all endpoints she needs
- [ ] Ashley knows the `ML_SERVICE_URL` contract (`POST /predict/fare`) and you've confirmed the fallback-to-static-fares path actually works when that env var is unset
- [ ] `npm test` passes clean before any deploy

**Demo readiness**
- [ ] You can explain, out loud, what happens end-to-end when a user picks a from/to stage (this matters more than the code itself in a presentation)
- [ ] You have a local fallback (`localhost`) ready in case venue wifi can't reach the deployed services
