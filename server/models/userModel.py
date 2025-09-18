from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict

class User(BaseModel):
    email: EmailStr=Field(...)
    password: str=Field(...,min_length=6)
    chat_ids: List[str] = Field(default_factory=list)
    preferred_language: str = "en"
    location: Optional[Dict[str, float]] = None
