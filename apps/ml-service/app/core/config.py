"""
Central place for environment/config values so nothing else in the app
touches os.environ directly. Keep this the only file that reads .env.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent  # apps/ml-service/

# Port the service listens on locally (Render sets its own $PORT in prod;
# this default is only used for local `uvicorn --reload` runs).
PORT = int(os.getenv("PORT", "8000"))

# Where the fare sample data lives. Overridable via .env so the same code
# works whether data ships inside the container or is mounted separately.
FARE_SAMPLES_PATH = os.getenv(
    "FARE_SAMPLES_PATH",
    str(BASE_DIR / "data" / "fare_samples.csv"),
)

# Hours treated as "peak" for the peak/off-peak heuristic. Defined here,
# not scattered across fare_estimator.py, so it's one obvious place to
# tune if real report data later shows different peak windows.
PEAK_HOURS = {6, 7, 8, 9, 16, 17, 18, 19}
