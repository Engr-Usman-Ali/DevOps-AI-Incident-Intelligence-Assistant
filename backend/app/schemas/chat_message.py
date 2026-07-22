from datetime import datetime
from typing import Any

from pydantic import BaseModel


class ChatMessageBase(BaseModel):
    role: str
    message: str


class ChatMessageCreate(ChatMessageBase):
    analysis_json: dict[str, Any] | None = None


class ChatMessageResponse(ChatMessageBase):
    id: int
    session_id: int
    analysis_json: dict[str, Any] | None = None
    created_at: datetime

    class Config:
        from_attributes = True