from datetime import datetime

from pydantic import BaseModel


# ==========================================
# Chat Session
# ==========================================

class ChatSessionResponse(BaseModel):

    id: int

    title: str

    created_at: datetime

    updated_at: datetime

    summary: str

    severity: str

    confidence: int

    incident_type: str

    root_cause: str

    class Config:
        from_attributes = True


# ==========================================
# Chat Message
# ==========================================

class ChatMessageResponse(BaseModel):

    id: int

    role: str

    message: str

    analysis_json: dict | None = None

    created_at: datetime

    class Config:
        from_attributes = True