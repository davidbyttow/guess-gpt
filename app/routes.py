import os
import json
import logging
from pathlib import Path

from pydantic import BaseModel
from typing import Dict, List, Optional
from quart import Quart, send_from_directory
from quart_cors import cors
from quart_schema import QuartSchema, validate_request, validate_response

from app.chat import chat
from app.models import ChatMessage, Chat
from app.context import Context

WEB_DIR = str(Path(__file__).parent / "web-dist")

app = Quart(__name__, static_folder=WEB_DIR)
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
    # messages = data.messages
    # for i in range(10):
    #     messages.append(ChatMessage(role="assistant", content="Hello"))
    messages = await chat(ctx=ctx, messages=data.messages)
    return ChatResponse(messages=messages)


@app.route("/<path:path>")
async def serve_nextjs_app(path):
    if os.path.isfile(f"{WEB_DIR}/{path}"):
        return await send_from_directory(WEB_DIR, path)
    else:
        return await send_from_directory(WEB_DIR, "index.html")


@app.route("/")
async def root_route():
    return await send_from_directory(WEB_DIR, "index.html")
