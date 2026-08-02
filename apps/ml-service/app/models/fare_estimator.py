"""
Fare estimation logic — the one file in this service most likely to
evolve over the project's life. Router and schema stay stable around it.

WHAT THIS IS, HONESTLY:
A hand-fit linear model (fare ~ distance_km + is_peak) trained on
`data/fare_samples.csv`, refined with a local lookup against nearby real
samples when available. This is NOT a trained scikit-learn model and
doesn't need to be for the MVP — see notebooks/exploration.ipynb for the
reasoning and the fit itself. If real community fare_reports become
available later, retrain by re-running that notebook's fit against a
larger/live samples file (the fit happens automatically from
data/fare_samples.csv each time this module loads, so updating that CSV
is enough — no hardcoded coefficients to hunt down), or swap this out for
an actual persisted model — the router won't need to change either way.
"""
from pathlib import Path
import numpy as np
import pandas as pd

from app.core.config import FARE_SAMPLES_PATH, PEAK_HOURS

_samples_cache: pd.DataFrame | None = None


def _load_samples() -> pd.DataFrame:
    global _samples_cache
    if _samples_cache is None:
        path = Path(FARE_SAMPLES_PATH)
        if not path.exists():
            raise FileNotFoundError(
                f"fare samples not found at {path} — check FARE_SAMPLES_PATH in .env"
            )
        _samples_cache = pd.read_csv(path)
    return _samples_cache


def is_peak_hour(hour: int) -> bool:
    """Peak-hour definition lives in one place (app/core/config.py) so it's
    easy to tune later without hunting through estimator logic."""
    return hour in PEAK_HOURS


def _fit_global_model(df: pd.DataFrame) -> tuple[float, float, float]:
    """
    Ordinary least squares: fare = a + b*distance_km + c*is_peak
    Solved directly with numpy (no scikit-learn needed for a 2-feature
    linear fit — avoids pulling in a dependency the MVP doesn't need yet).
    Returns (a, b, c).
    """
    X = np.column_stack([
        np.ones(len(df)),
        df["distance_km"].to_numpy(),
        df["hour"].apply(lambda h: 1.0 if is_peak_hour(h) else 0.0).to_numpy(),
    ])
    y = df["fare"].to_numpy()
    coeffs, *_ = np.linalg.lstsq(X, y, rcond=None)
    a, b, c = coeffs
    return float(a), float(b), float(c)


def estimate_fare(from_stage_id: str, to_stage_id: str, distance_km: float, hour: int) -> tuple[float, float]:
    """
    Returns (estimated_fare, confidence).

    Approach, in plain terms:
    1. Fit a simple global formula (base fare + per-km rate + peak surcharge)
       across all seeded fare samples.
    2. If any seeded samples exist at a similar distance (+/- 25%), blend the
       global formula's answer with the average of those nearby real samples
       — nudges the estimate toward observed data when we have it, without
       throwing away the general formula when we don't.
    3. Confidence starts at a moderate baseline and is adjusted up when the
       requested distance falls inside the range we actually have samples
       for, and up again when nearby samples were found to blend in. It is
       adjusted down the further outside that range the request falls.
       This is intentionally simple and explainable over being maximally
       accurate — see notebooks/exploration.ipynb for the full reasoning.
    """
    df = _load_samples()
    a, b, c = _fit_global_model(df)
    peak = is_peak_hour(hour)
    global_estimate = a + b * distance_km + c * (1.0 if peak else 0.0)

    # --- local refinement: nearby real samples at a similar distance & peak/off-peak state ---
    window = max(distance_km * 0.25, 1.5)  # km tolerance; at least 1.5km for very short hops
    same_peak_state = df["hour"].apply(lambda h: is_peak_hour(h) == peak)
    nearby = df[same_peak_state & (df["distance_km"] - distance_km).abs().le(window)]

    if len(nearby) >= 2:
        local_mean = float(nearby["fare"].mean())
        estimate = 0.5 * global_estimate + 0.5 * local_mean
    else:
        estimate = global_estimate

    estimate = max(estimate, 10.0)  # floor: never return a non-positive/absurdly small fare

    # --- confidence ---
    dist_min, dist_max = df["distance_km"].min(), df["distance_km"].max()
    confidence = 0.5

    if dist_min <= distance_km <= dist_max:
        confidence += 0.2
    else:
        # linearly decay confidence the further outside the observed range we are
        out_of_range_km = min(abs(distance_km - dist_min), abs(distance_km - dist_max))
        confidence -= min(0.3, out_of_range_km * 0.01)

    if len(nearby) >= 2:
        confidence += 0.15
    if len(nearby) >= 5:
        confidence += 0.05

    # hours right at the edge of the peak/off-peak split are guesses either way
    edge_hours = {5, 10, 15, 20}
    if hour in edge_hours:
        confidence -= 0.05

    confidence = float(min(max(confidence, 0.05), 0.95))

    return round(estimate, 2), round(confidence, 2)
