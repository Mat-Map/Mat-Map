# MatMap ML Service — Guide for Ashley

Welcome to `apps/ml-service`. This document explains what's expected of this
service for the MVP, the recommended file structure, and how it plugs into
the rest of the system. No code here — just the shape and purpose of things.

---

## 1. What's actually expected for the MVP

Be honest with yourself about scope here: the goal is **not** a fully
trained, production-grade fare-prediction model by demo day. The goal is a
working, explainable pipeline that produces a fare estimate smarter than a
flat lookup table — even a well-reasoned heuristic (e.g. adjusting for
time-of-day, distance, and known peak/off-peak patterns) is a legitimate,
honest "ML service" for a proof-of-concept. If you have time and real fare
data to train on, great — but a working heuristic that ships beats an
unfinished model that doesn't.

**Your service's one job:** given a from-stage, a to-stage, the distance
between them, and the time of day, return an estimated fare. That's it for
the MVP. Route recommendation, ETA, and mapping all live in the backend and
frontend — you are not responsible for any of that.

---

## 2. How this plugs into the rest of the system — important

You do **not** talk to the frontend directly, and the frontend never calls
you directly either. The flow is:

```
Frontend → Backend (/journey) → your service (POST /predict/fare) → Backend combines result → Frontend
```

This matters for two reasons:
1. It means the frontend team has exactly one API to integrate against
   (Britton's), so you and Fabiola never need to coordinate contracts
   directly.
2. It means your service can be **unfinished or offline** without breaking
   the demo — Britton's backend falls back to static seeded fares if your
   service isn't reachable or `ML_SERVICE_URL` isn't set. Don't treat that
   as pressure-free, though — the fallback is a safety net, not a reason to
   deprioritize this.

**The contract you need to build to:**

```
POST /predict/fare
Request body:
  fromStageId: string
  toStageId: string
  distanceKm: number
  hour: number          (0-23, hour of day the request was made)

Response body:
  estimatedFare: number
  confidence: number    (0-1, your own estimate of how reliable this prediction is)
```

Confirm this exact shape with Britton before you build much — it's the one
thing that has to match exactly on both sides.

---

## 3. Recommended file structure

```
apps/ml-service/
├── app/
│   ├── main.py
│   ├── routers/
│   │   └── fare.py
│   ├── models/
│   │   └── fare_estimator.py
│   ├── schemas/
│   │   └── fare.py
│   └── core/
│       └── config.py
├── data/
│   └── fare_samples.csv
├── notebooks/
│   └── exploration.ipynb
├── requirements.txt
└── .env
```

### What each piece is for

**`app/main.py`** — the FastAPI application entrypoint. Creates the app
instance, mounts your routers, and is what `uvicorn` actually runs to start
the service.

**`app/routers/fare.py`** — defines the `POST /predict/fare` endpoint itself:
receives the request, validates it against your schema, calls into
`fare_estimator.py` for the actual logic, and returns the response. Keep
this thin — it should not contain estimation logic itself.

**`app/models/fare_estimator.py`** — where the actual estimation logic
lives, whatever form it takes: a hand-tuned formula, a small regression
model, or a trained scikit-learn model loaded from disk. This is the file
most likely to evolve over the project's life — the router and schema
around it should stay stable even as this gets smarter.

**`app/schemas/fare.py`** — Pydantic models defining the exact shape of
requests and responses. This is what makes the contract in §2 enforceable —
FastAPI will reject malformed requests automatically based on what you
define here.

**`app/core/config.py`** — loads environment variables (port, any API keys
you end up needing, model file paths) in one place so the rest of the app
doesn't touch `os.environ` directly.

**`data/fare_samples.csv`** — wherever you put real or reference fare data
you gather (from riders, SACCOs, or public sources) to base your estimator
on. Even a small honest dataset here strengthens your story in the
presentation — "here's the data we based this on" is more convincing than
an unexplained number.

**`notebooks/exploration.ipynb`** — your scratch space for exploring the
data and testing approaches before they become real code in
`fare_estimator.py`. Fine for this to stay messy — it's not shipped.

**`requirements.txt`** — start minimal: `fastapi`, `uvicorn`, `pydantic`,
`python-dotenv`. Only add `pandas`/`scikit-learn`/etc. once you actually
have a concrete need for them — don't front-load dependencies you might
not use.

---

## 4. Local setup

```bash
cd apps/ml-service
python -m venv venv
source venv/bin/activate      # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Test it standalone before Britton ever calls it:
```bash
curl -X POST http://localhost:8000/predict/fare \
  -H "Content-Type: application/json" \
  -d '{"fromStageId": "test", "toStageId": "test2", "distanceKm": 12.5, "hour": 8}'
```

---

## 5. Final checklist — project expectations

**Core functionality**
- [ ] `POST /predict/fare` matches the exact contract in §2 — field names, types, and response shape
- [ ] The endpoint returns a sensible `estimatedFare` for a range of realistic inputs (short distance, long distance, peak hour, off-peak hour)
- [ ] `confidence` reflects something real, even if simple (e.g. lower confidence for distance ranges you have little data on) — don't hardcode it to a constant
- [ ] The service runs standalone and responds correctly to `curl` before Britton integrates it

**Data & reasoning**
- [ ] You can explain, in plain terms, how your estimate is derived — this matters more in the presentation than the underlying code
- [ ] Whatever data you used (`fare_samples.csv` or otherwise) is at least loosely grounded in something real, not entirely invented
- [ ] You've noted, for yourself and the team, what you'd improve with more time/data — a good "future work" answer is a strength in a presentation, not a weakness

**Integration hygiene**
- [ ] You've confirmed with Britton the exact `ML_SERVICE_URL` your service will run at (local and, once deployed, its Render URL)
- [ ] You've tested what your service does with malformed input — it should return a clean 4xx, not crash
- [ ] `.env` is gitignored if you add any secrets to it

**Presentation readiness**
- [ ] You can demo the endpoint in isolation (via `curl` or FastAPI's auto-generated `/docs` page) in case the full integrated flow has issues live
- [ ] You know what happens if your service is unreachable during the demo (backend falls back to static fares) so a live hiccup doesn't derail the presentation
