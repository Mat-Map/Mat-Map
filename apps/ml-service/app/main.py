from fastapi import FastAPI

from app.routers import fare
from app.core.config import PORT

app = FastAPI(
    title="MatMap ML Service",
    description="Fare estimation service. See /docs for the live contract.",
    version="0.1.0",
)

app.include_router(fare.router)


@app.get("/health")
def health() -> dict:
    """Simple liveness check — useful for the backend to probe before
    relying on ML_SERVICE_URL, and for confirming the service is up during
    the demo without needing the full /predict/fare payload."""
    return {"status": "ok"}


if __name__ == "__main__":
    # Lets the service also be started with `python -m app.main` and still
    # respect PORT from .env, instead of only working via the uvicorn CLI
    # command in the README. Either way of starting it is equivalent.
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=PORT, reload=True)
