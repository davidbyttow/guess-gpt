import os
import json
import logging

from pydantic import BaseModel
from typing import Dict, List, Optional
from quart import Quart, abort
from quart_cors import cors
from quart_schema import QuartSchema, validate_request, validate_response

from app.chat import chat
from app.models import ChatMessage, Chat
from app.context import Context

app = Quart(__name__)
QuartSchema(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = cors(
    app, allow_origin="http://localhost:3000"
)  # for development, remove/adjust in production


@app.after_request
def add_header(r):
    # for development
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


class ChatResponse(BaseModel):
    messages: List[ChatMessage]


@app.route("/v1/chat", methods=["POST"])
@validate_request(ChatRequest)
@validate_response(ChatResponse)
async def chat_route(data: ChatRequest):
    ctx = Context(model="gpt-4")
    messages = await chat(ctx=ctx, messages=data.messages)
    return ChatResponse(messages=messages)
