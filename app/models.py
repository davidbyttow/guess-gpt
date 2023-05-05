import uuid
from typing import List, Optional

from pydantic import BaseModel, Field


NAMESPACE_UUID = uuid.UUID(int=42)


class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: str
    content: str


class Chat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    messages: List[ChatMessage]
