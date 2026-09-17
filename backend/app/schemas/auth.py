from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = "Procurement Officer"

class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    role: str
    organization: str
    department: Optional[str] = "Central Procurement Division"
    preferred_language: Optional[str] = "English"
    notifications_enabled: bool = True

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfile
