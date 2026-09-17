import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "StandardsAI Backend - SIH26108"
    api_prefix: str = "/api/v1"
    environment: str = os.getenv("ENVIRONMENT", "development")
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ]
    secret_key: str = os.getenv("SECRET_KEY", "sih26108_secret_key_standards_ai_procurement")

settings = Settings()
