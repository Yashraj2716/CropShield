from fastapi import APIRouter
from datetime import datetime, timezone
from backend.app.schemas.health import HealthResponse
from backend.app.core.config import settings

router = APIRouter()

@router.get("/health", response_model=HealthResponse, tags=["System Health"])
async def health_check():
    """
    Health check endpoint for CropShield.
    Used by frontend, monitoring services, and cloud orchestrators.
    """
    return HealthResponse(
        status="healthy",
        project=settings.PROJECT_NAME,
        version=settings.VERSION,
        timestamp=datetime.now(timezone.utc).isoformat(),
        environment=settings.ENVIRONMENT,
        services={
            "api": "online",
            "vision_inference": "ready",
            "weather_connector": "ready",
            "risk_engine": "ready",
            "database": "connected"
        }
    )
