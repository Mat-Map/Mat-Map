# MatMap V1 — 4-Week Implementation Plan

**Scope:** Google Maps public-transit base → matatu fare estimates → traffic-compensated ETAs → live stage crowd levels → nganya/quiet vehicle-vibe filtering.
**Team:** Frontend, Backend, AI/ML, DevOps (4 people, 4 weeks).

This scope is a deliberate narrowing from the original 8-week/USSD/GPS-hardware plan. It drops the driver GPS app and USSD channel and instead layers matatu-specific intelligence **on top of** Google Maps' existing transit data — much faster to demo, and every feature is directly validated by the user research (fare estimates: 87/116 "Very Useful"; route-change alerts: 78/116; crowd levels: 69/116; nganya-vs-quiet vibe preference: named by roughly a third of respondents as a factor that matters).

---

## 1. Product scope for V1

| # | Feature | What it actually does | Data source |
|---|---|---|---|
| 1 | Base routing | User enters origin/destination, gets matatu route(s) + stages, same UX pattern as Google Maps Transit | Google Maps Directions/Routes API (`TRANSIT` mode) |
| 2 | Fare estimates | Shows an estimated fare (range) per route/leg, adjusted for time-of-day and rain/traffic surge patterns | Crowdsourced fare reports + ML surge model |
| 3 | Traffic-compensated ETA | ETA per leg adjusted using live road traffic conditions, not just schedule | Google Maps Traffic-aware Directions API + our own delay model |
| 4 | Vibe filter | Toggle: "Nganya (loud/lit)" vs "Quiet/Chill" — filters/ranks route options by vehicle vibe | Crowdsourced vehicle tags + simple classifier |

**Out of scope for V1** (explicitly deferred): stage crowd levels, driver Android app, GPS hardware tracking, USSD/SMS channel, sacco dashboard, payments. All live vehicle-position/crowd/vibe data in V1 comes from **user-submitted reports**, not GPS hardware — this is what makes a 4-week build possible.

---

## 2. Architecture

```
                        ┌─────────────────────────┐
                        │   Mobile-web frontend    │  (React + Vite, mobile-first PWA)
                        │  Search / Map / Reports  │
                        └───────────┬─────────────┘
                                    │ REST/JSON
                        ┌───────────▼─────────────┐
                        │   Backend API (Node.Js)   │
                        │  - /route  - /fare        │
                        │   - /reports              │
                        └──┬───────────┬──────────┘
                           │           │
              ┌────────────▼───┐  ┌────▼─────────────┐
              │ Google Maps    │  │  ML service        │
              │ Routes API     │  │ (Python/FastAPI)   │
              │ (transit+      │  │ - fare estimator    
              │  traffic)      │  │
              └────────────────┘  │ - vibe classifier   │
                                   └────┬───────────────┘
                                        │
                              ┌─────────▼─────────┐
                              │   PostgreSQL       │
                              │ (stages, routes,   │
                              │  fare reports,vibe 
                                tags)               │
                              │       
                              │                     │
                              └─────────────────────┘

  DevOps: Docker Compose (local) → CI/CD (GitHub Actions) → cloud deploy (Render/Fly.io/AWS free tier)
```

**Key design call:** the backend never invents live vehicle GPS — it's a thin orchestration layer that (a) calls Google Maps for the route skeleton, (b) enriches each leg with fare/crowd/vibe/traffic-adjusted-ETA data pulled from our own DB + ML service, and (c) accepts community reports that feed that DB. This keeps V1 achievable without any driver-side app.

---

## 3. Repo structure (monorepo, GitHub)

```
matmap/
├── .github/
│   └── workflows/
│       ├── ci-backend.yml
│       ├── ci-frontend.yml
│       └── ci-ml.yml
├── apps/
│   ├── frontend/                 # React + Vite PWA
│   │   ├── src/
│   │   │   ├── components/       # SearchBar, RouteCard, StageBadge, VibeToggle, CrowdMeter
│   │   │   ├── pages/            # Home, RouteResults, ReportModal
│   │   │   ├── api/               # api client (fetch wrappers)
│   │   │   ├── hooks/
│   │   │   └── styles/
│   │   └── package.json
│   ├── backend/                   # Node.js/Express (or FastAPI — pick one, see §5)
│   │   ├── src/
│   │   │   ├── routes/            # route.js, fare.js, crowd.js, reports.js
│   │   │   ├── services/          # googleMaps.js, mlClient.js
│   │   │   ├── models/            # Sequelize/Prisma or SQLAlchemy models
│   │   │   ├── middleware/
│   │   │   └── app.js
│   │   ├── migrations/
│   │   └── package.json
│   └── ml-service/                # Python/FastAPI
│       ├── app/
│       │   ├── fare_model/        # fare_estimator.py, train.py
│       │   ├── vibe_model/        # vibe_classifier.py
│       │   └── main.py
│       ├── notebooks/             # EDA on survey + seed data
│       ├── data/                  # seed data, exported from survey CSV
│       └── requirements.txt
├── infra/
│   ├── docker-compose.yml
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── Dockerfile.ml
│   └── terraform/ (optional, or just deploy scripts)
├── docs/
│   ├── api-spec.md               # OpenAPI/endpoint contracts
│   └── data-model.md
├── .env.example
└── README.md
```

**Git workflow:** trunk-based with short-lived branches.
- `main` = always deployable
- Branch naming: `feat/<area>-<short-desc>`, `fix/...`, `chore/...` (e.g. `feat/backend-fare-endpoint`)
- PR required to merge into `main`, 1 reviewer minimum, CI must pass
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`) so changelog/standup is easy to scan
- Each of the three `apps/*` gets its own CI workflow (lint + test) triggered on path filters, so a frontend-only PR doesn't wait on ML tests

---

## 4. Data model (core tables)

```sql
stages(id, name, lat, lng, common_routes[])
routes(id, name, sacco_optional, path_stage_ids[])
fare_reports(id, route_id, stage_from, stage_to, fare_amount, reported_at, time_of_day, weather_flag)
vibe_reports(id, route_id, vehicle_tag_optional, vibe [nganya/quiet], reported_at)
users(id, device_id, trust_score)   -- lightweight, no auth needed for V1, just device-based rate limiting
```

Seed data strategy: bootstrap `fare_reports` and `vibe_reports` from the 116-response survey CSV (it already has time-of-day-adjacent signal and stated preferences) so the app isn't cold-starting with zero data on demo day — the ML service trains its initial heuristics on this seed set, then blends in live community reports as they come in.

---

## 5. Tech stack decision

To move fast with a 4-person team where only one person is doing ML, pick **one** backend language for backend+frontend-adjacent work and let AI/ML own its own Python service:

- **Frontend:** Next.Js, deployed as a PWA (works well on mid-range Android browsers without an app-store step — important for the target user base)
- **Backend:** Node.js + PostgreSQL (Prisma ORM) + Clerk.com for Auth — fastest to stand up REST endpoints and matches original team's Node familiarity from the base doc
- **AI/ML service:** Python + FastAPI, separate microservice, called by backend over internal REST — this isolation lets AI/ML iterate/redeploy models without touching the main API
- **Maps:** Google Maps Platform — Maps Javascript API (transit mode) + Directions API traffic model
- **DevOps:** Docker Compose locally, GitHub Actions for CI, deploy to Render (free/cheap tiers, fast to set up in 4 weeks) 

---

## 6. Role breakdown

### Frontend Engineer
Owns everything the user sees and touches.
- Search screen: origin/destination input (autocomplete via Google Places API), "Nganya / Quiet" toggle
- Results screen: route cards showing stage-to-stage path, fare estimate range, traffic-adjusted ETA, crowd badge per stage, vibe tag per route option
- Map view: embedded Google Map showing route polyline + stage pins colored by crowd level
- Report flow: lightweight modal after a trip ("What was the fare?" "How busy was the stage?" "Vibe?") — this is the data-collection engine for the whole product, so it needs to be under 3 taps
- State management: React Query for API caching (routes/fares/crowd don't need a heavy global store)
- Responsive/mobile-first — most target users are on phones, not desktop

### Backend Engineer
Owns the orchestration API and data layer.
- `GET /route?from=&to=` — calls Google Routes API, returns normalized route + stage list
- `GET /fare?routeId=&from=&to=` — merges Google's raw data with the ML fare estimate call
- `GET /eta?routeId=` — wraps Google's traffic-aware duration, blended with any known delay reports
- `POST /reports/fare`, `POST /reports/crowd`, `POST /reports/vibe` — community report ingestion, with basic abuse guardrails (rate limit per device, outlier rejection e.g. fare > 5x median for that route)
- Postgres schema + migrations (Prisma)
- Internal client for calling the ML service (`services/mlClient.js`)
- API spec written first (OpenAPI/`docs/api-spec.md`) in week 1 so frontend and ML can build against a contract instead of waiting

### AI/ML Engineer
Owns everything that turns raw reports into predictions.
- **Fare estimator:** starts as a rule-based/statistical model (median fare per route/time-bucket from seed CSV + live reports), evolves to weighted regression factoring time-of-day, rain, and report recency if time allows
- **Traffic-ETA blending:** logic layer that takes Google's traffic-aware duration and adjusts it using any active "sudden route change" or delay reports from the community table (this is closer to a rules engine than ML, but lives in the same service)
- **Vibe classifier:** V1 can be mostly a lookup/aggregation of `vibe_reports` per route (majority vote), with a stretch goal of a light classifier if vehicle-tag text data (e.g. matatu names/decorations mentioned in reports) is rich enough
- Exposes all of the above as FastAPI endpoints for backend to call
- Also does the seed-data analysis on the survey CSV in week 1 to calibrate initial fare/crowd baselines

### DevOps Engineer
Owns infra, CI/CD, environments, and API key/secrets management — and doubles as integration glue between the other three.
- Repo setup, branch protection rules, PR templates, CI workflows (lint + test on every PR, path-filtered per app)
- Docker Compose for local dev (all 3 services + Postgres spin up with one command)
- Manage Google Maps API keys and quotas (set up billing alerts — transit/traffic API calls can add up fast under load testing)
- Deployment pipeline: GitHub Actions → build → deploy backend + ML service to Render/Fly.io, frontend to Vercel/Netlify
- Environment configs (`.env.example`, secrets in GitHub Actions secrets, never committed)
- Monitoring: basic uptime check + error logging (e.g. Sentry free tier) so the team knows if the ML service or backend goes down during the demo
- Runs weekly integration checkpoint: pulls all three services together in a shared staging environment so issues surface before demo week

---

## 7. Week-by-week plan

### Week 1 — Foundations & contracts
| Owner | Tasks |
|---|---|
| Backend | Repo scaffolding, Postgres schema + migrations, `/route` endpoint wired to Google Routes API, write `docs/api-spec.md` |
| Frontend | Project scaffold (Vite+React+Tailwind), search screen UI (static/mock data), Google Places autocomplete integration |
| AI/ML | Load & clean survey CSV, exploratory analysis (fare distributions, crowd/vibe stated preferences), define initial fare-bucket and crowd-baseline heuristics |
| DevOps | GitHub repo + branch protections + PR template, Docker Compose skeleton, CI workflows (lint/test stubs), Google Cloud project + Maps API keys provisioned |

**End-of-week demo:** search bar returns a real Google-Maps-based route in the app (no fare/crowd/vibe yet).

### Week 2 — Core enrichment features
| Owner | Tasks |
|---|---|
| Backend | `/fare`, `/crowd` endpoints; report-ingestion endpoints (`POST /reports/*`) with basic validation/rate-limiting; DB seeded from survey data |
| Frontend | Route results screen showing fare range + crowd badge per stage; report modal UI (fare/crowd/vibe submission) |
| AI/ML | Fare estimator v1 (rule-based on seed data) exposed via FastAPI; crowd predictor v1 (historical baseline by stage+hour) exposed via FastAPI |
| DevOps | Staging environment stood up (Render/Fly.io); backend + ML service deployed and talking to each other; Postgres hosted (managed free tier, e.g. Supabase/Neon) |

**End-of-week demo:** full route search shows fare estimate + crowd level per stage, backed by real (seeded) data.

### Week 3 — Traffic ETA + vibe filter + polish
| Owner | Tasks |
|---|---|
| Backend | `/eta` endpoint blending Google traffic data with delay reports; wire vibe filter param into `/route` |
| Frontend | Nganya/Quiet toggle wired to real filtering; traffic-adjusted ETA shown per leg (with a visual cue distinguishing it from Google's raw ETA); map view with colored crowd pins |
| AI/ML | Vibe classifier (majority-vote aggregation + stretch classifier); delay/route-change detection logic for ETA blending; start tuning fare model with any live report data collected so far |
| DevOps | CI test coverage tightened (block merge on failing tests); load-test the Maps API integration to catch quota issues before demo; error monitoring live |

**End-of-week demo:** all 5 features working end-to-end on staging.

### Week 4 — Field test, polish, demo prep
| Owner | Tasks |
|---|---|
| All | Get 10–15 real users (classmates, matatu riders) to run real searches and submit reports — this is the only way to validate crowd/fare/vibe data isn't just synthetic |
| Backend | Bug fixes from field test, response-time optimization, abuse-guardrail tuning based on real report patterns |
| Frontend | UI polish, empty-state handling (routes/stages with zero reports yet), onboarding tooltip for the report flow |
| AI/ML | Recalibrate models with field-test report data, document model limitations/assumptions for the demo pitch |
| DevOps | Production deploy, final CI/CD hardening, uptime check during demo window, rollback plan documented |

**End-of-week demo:** live product demo + short writeup of what real users reported.

---

## 8. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Google Maps API quota/cost during testing | DevOps sets a hard billing cap + alerts in week 1; cache route responses aggressively (routes between fixed stages don't change often) |
| Cold-start: no crowd/fare/vibe data at launch | Seed DB from the 116-response survey CSV in week 1 so every common route has *some* baseline before a single live report comes in |
| Community reports are sparse or low-trust | Rate-limit per device, reject fare outliers (>Nx median), and clearly label estimates as "based on N reports" so users calibrate trust themselves |
| 4 weeks is tight for 5 features across 4 people | Backend/ML contract locked in week 1 (API spec) so frontend/backend/ML build in parallel instead of sequentially; vibe classifier has an explicit "majority vote" fallback if the stretch classifier doesn't land in time |
| Traffic-ETA blending logic gets ML-engineer-heavy | Framed as a rules engine, not a model — keeps it buildable without needing labeled delay data the team doesn't have yet |

---

## 9. What ties back to the user research

- **Fare estimates** rated "Very Useful" by 87/116 respondents — the single highest-rated feature, and the one this plan makes most prominent (surfaced right on the results screen, not buried).
- **Route-change alerts** (78/116 "Very Useful") are handled via the ETA-blending/delay-report logic rather than a separate feature — same underlying data, cheaper to build in 4 weeks.
- **Crowd levels** (69/116 "Very Useful") map directly to the Popular-Times-style stage crowd model.
- **Vibe/culture factors** (loud "nganya" vs quiet, cited by roughly a third of respondents as something that matters) map directly to the vibe filter.
- **66/116 said "Yes" they'd contribute community reports**, with another 33 "Maybe" — this is why the report-modal UX (frontend) and abuse-guardrails (backend) matter as much as the core routing feature: the whole enrichment layer depends on that willingness converting into actual submissions.
