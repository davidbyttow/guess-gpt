from typing import Dict, List, Any, Tuple
from pydantic import BaseModel, Field, parse_obj_as
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage, AIMessage

from app.console import log
from app.context import Context
from app.models import ChatMessage, Chat
from app.prompts import GUESS_SYSTEM_PROMPT


async def chat(ctx: Context, messages: List[ChatMessage]) -> List[ChatMessage]:
    llm = ChatOpenAI(
        model_name=ctx.model,
        openai_api_key=ctx.openai_api_key,
        verbose=ctx.verbose,
        temperature=0.7,
    )

    prompt_messages = [
        SystemMessage(content=GUESS_SYSTEM_PROMPT.format(person="Taylor Swift")),
    ]
    for m in messages:
        if m.role == "user":
            prompt_messages.append(HumanMessage(content=m.content))
        else:
            prompt_messages.append(AIMessage(content=m.content))

    if ctx.verbose:
        log(f"LLM input:\n{prompt_messages}", "yellow")
    result = await llm.agenerate([prompt_messages])
    output = result.generations[0][0].text
    if ctx.verbose:
        log(f"LLM output:\n{output}", "green")
    messages.append(ChatMessage(role="assistant", content=output))
    return messages
