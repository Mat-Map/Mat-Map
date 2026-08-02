# MatMap ML Service

Fare estimation microservice for MatMap, built to the contract in
`apps/ToDos/ASHLEY-ml-service-guide.md`.

## Status

Everything in the "Recommended file structure" section of the ToDo doc is
built and tested end-to-end (not just written — actually started with
`uvicorn` and hit with `curl`, including malformed-input cases).

**⚠️ One thing NOT yet done: the `/predict/fare` contract has not been
confirmed with the backend team.** This was built exactly to the shape in
the ToDo doc (`fromStageId`, `toStageId`, `distanceKm`, `hour` →
`estimatedFare`, `confidence`), but per the doc's own instruction, that
shape needs a direct confirmation before it's load-bearing. If it changes,
only `app/schemas/fare.py` and the one line in `app/routers/fare.py` that
reads from it need to change — the estimator logic itself doesn't care
about the transport shape.

## Quickstart

```bash
cd apps/ml-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Test it:

```bash
curl http://localhost:8000/health

curl -X POST http://localhost:8000/predict/fare \
  -H "Content-Type: application/json" \
  -d '{"fromStageId": "STG004", "toStageId": "DST-THIKA-ROAD", "distanceKm": 25, "hour": 8}'
```

Auto-generated docs (useful for demoing the endpoint in isolation if the
full integration has issues live): `http://localhost:8000/docs`

## How the estimate is derived, in plain terms

A base fare, a per-kilometer rate, and a flat peak-hour surcharge — fit
with ordinary least squares against `data/fare_samples.csv`, then nudged
toward any real nearby samples when the requested distance/time-of-day is
close to something we actually have data for. Confidence is higher when
the request looks like the data we trained on, lower when it's an
extrapolation. Full reasoning and the actual regression fit are in
`notebooks/exploration.ipynb` — worth reading before touching
`fare_estimator.py`.

## Data grounding — what's real and what's approximate

`data/fare_samples.csv` is derived from real, cited 2026 fare-band data —
corridor-level fares sourced from Kenyan news coverage of the 2026 matatu
fuel-hike (kenyans.co.ke, ghafla.co.ke) and nairobipostalcode.org's 2026
fare guide — not invented. The one approximation in it: `distance_km` uses
general-knowledge road distances per corridor (e.g. CBD to Thika town is
about 42km), since no source gave precise per-stage-pair distances. This is
flagged explicitly in `notebooks/exploration.ipynb` — treat it as a
reasonable starting point, not survey-grade precision, and replace it with
real distances once actual stage coordinates exist.

## What I'd improve with more time/data

See the last section of `notebooks/exploration.ipynb` — kept there rather
than duplicated here so there's one place this list lives and gets updated.

## Integration checklist (from the ToDo doc) — status

- [x] `POST /predict/fare` matches the contract in the ToDo doc (pending
      backend-team confirmation — see warning above)
- [x] Returns sensible estimates across short/long, peak/off-peak inputs —
      tested with curl (25km peak → ~128 Ksh; 4km off-peak → ~48 Ksh;
      90km extrapolation → ~277 Ksh with confidence dropping to 0.2)
- [x] `confidence` reflects something real (distance-from-training-range +
      nearby-sample density), not a hardcoded constant
- [x] Runs standalone and responds correctly to curl
- [ ] `ML_SERVICE_URL` confirmed with the backend team (local + Render, once deployed)
- [x] Malformed input returns a clean 4xx (tested: missing field, out-of-range
      hour, and non-JSON body all return 422, no crash)
- [x] `.env` contains no secrets currently — add a `.gitignore` entry for it
      the moment that changes
