from urllib.parse import quote, unquote

from os import name
from typing import Dict, List, Any, Tuple, Optional
from pydantic import BaseModel, Field, parse_obj_as
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage, AIMessage, BaseMessage

from app.console import log
from app.context import Context
from app.models import ChatMessage, Chat
from app.prompts import GUESS_SYSTEM_PROMPT, CREATE_PROMPT
from app.util import encrypt_string, decrypt_string


async def chat(ctx: Context, messages: List[ChatMessage]) -> List[ChatMessage]:
    llm = ChatOpenAI(
        model_name=ctx.model,
        openai_api_key=ctx.openai_api_key,
        verbose=ctx.verbose,
        temperature=0.7,
    )

    encrypted = messages[-1].data["encryptedPerson"]
    person = decrypt_string(unquote(encrypted))

    prompt_messages = [
        SystemMessage(content=GUESS_SYSTEM_PROMPT.format(person=person)),
    ]
    for m in messages:
        if m.role == "user":
            prompt_messages.append(HumanMessage(content=m.content))
        else:
            prompt_messages.append(AIMessage(content=m.content))

    output = await complete(ctx, llm, prompt_messages)
    messages.append(ChatMessage(role="assistant", content=output))
    return messages


async def create(ctx: Context, messages: List[ChatMessage]) -> Optional[str]:
    llm = ChatOpenAI(
        model_name=ctx.model,
        openai_api_key=ctx.openai_api_key,
        verbose=ctx.verbose,
        temperature=0,
    )

    name = messages[-1].content
    prompt_messages = [HumanMessage(content=CREATE_PROMPT.format(person=name))]
    output = await complete(ctx, llm, prompt_messages)
    parts = output.split(":")
    if len(parts) == 2:
        if parts[0].strip().upper() == "YES":
            person = parts[1].strip()
            encrypted = encrypt_string(person)
            messages.append(
                ChatMessage(
                    role="assistant",
                    content="Thanks! Click the button below and share the link with your friends",
                    link="/guess/" + quote(encrypted, safe=""),
                    data={"linkText": person},
                )
            )
            return messages
    messages.append(ChatMessage(role="assistant", content=output))
    return messages


async def complete(ctx: Context, llm: ChatOpenAI, messages: List[BaseMessage]) -> str:
    if ctx.verbose:
        log(f"LLM input:\n{messages}", "yellow")
    result = await llm.agenerate([messages])
    output = result.generations[0][0].text
    if ctx.verbose:
        log(f"LLM output:\n{output}", "green")
    return output
