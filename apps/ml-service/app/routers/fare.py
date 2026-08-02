from fastapi import APIRouter

from app.schemas.fare import FareRequest, FareResponse
from app.models.fare_estimator import estimate_fare

router = APIRouter()


@router.post("/predict/fare", response_model=FareResponse)
def predict_fare(payload: FareRequest) -> FareResponse:
    """
    Thin by design: validation is handled entirely by FareRequest (malformed
    input never reaches this function — FastAPI returns a 422 automatically),
    and all estimation logic lives in app/models/fare_estimator.py.
    """
    estimated_fare, confidence = estimate_fare(
        from_stage_id=payload.fromStageId,
        to_stage_id=payload.toStageId,
        distance_km=payload.distanceKm,
        hour=payload.hour,
    )
    return FareResponse(estimatedFare=estimated_fare, confidence=confidence)
