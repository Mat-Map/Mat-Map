"""
Request/response shapes for POST /predict/fare.

NOTE: this contract was pulled directly from the ToDo doc handed to the
AI/ML role. It has NOT been independently confirmed with the backend team
as of when this was written — treat field names/types here as
provisional until that's confirmed, since this is the one thing that has
to match exactly on both sides.
"""
from pydantic import BaseModel, Field


class FareRequest(BaseModel):
    fromStageId: str = Field(..., min_length=1, description="Origin stage identifier")
    toStageId: str = Field(..., min_length=1, description="Destination stage identifier")
    distanceKm: float = Field(..., gt=0, description="Distance between stages, in kilometers")
    hour: int = Field(..., ge=0, le=23, description="Hour of day the request was made, 0-23")


class FareResponse(BaseModel):
    estimatedFare: float = Field(..., description="Estimated fare in Ksh")
    confidence: float = Field(..., ge=0, le=1, description="Model's own confidence in this estimate, 0-1")
