from fastapi import APIRouter, HTTPException, Depends
from app.schemas.auth import LoginRequest, AuthResponse, UserProfile

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    if not req.email:
        raise HTTPException(status_code=400, detail="Email is required")
        
    user = UserProfile(
        id="usr-officer-01",
        name="Rajesh Sharma",
        email=req.email,
        role=req.role or "Procurement Officer",
        organization="Central Procurement Cell, Govt of India",
        department="Industrial Safety & Equipment Division",
        preferred_language="English",
        notifications_enabled=True
    )
    
    return AuthResponse(
        access_token="sih26108_jwt_access_token_demo",
        token_type="bearer",
        user=user
    )

@router.get("/me", response_model=UserProfile)
def get_current_user():
    return UserProfile(
        id="usr-officer-01",
        name="Rajesh Sharma",
        email="procurement.officer@gov.in",
        role="Procurement Officer",
        organization="Central Procurement Cell, Govt of India",
        department="Industrial Safety & Equipment Division",
        preferred_language="English",
        notifications_enabled=True
    )
