from enum import Enum
from mailbox import Message
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone

class SeverityLevel(Enum):
    LOW = "1-3"
    MODERATE = "4-6" 
    HIGH = "7-8"
    CRITICAL = "9-10"

class LanguageCode(Enum):
    ENGLISH = "en"
    HINDI = "hi"
    KANNADA = "ka"



class Chat(BaseModel):
    user_id: str = Field(..., description="Associated user ID")
    messages: List[Message] = Field(default_factory=list)
    medical_assessment: Optional[Dict[str, Any]] = None
    severity_rating: Optional[int] = None
    recommendations: Optional[List[str]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))



