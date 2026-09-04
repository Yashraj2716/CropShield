from pydantic import BaseModel, Field
from typing import Dict, Any

class HealthResponse(BaseModel):
    status: str = Field(..., example="healthy")
    project: str = Field(..., example="CropShield AI")
    version: str = Field(..., example="0.1.0")
    timestamp: str
    environment: str = Field(..., example="development")
    services: Dict[str, Any] = Field(default_factory=dict)
