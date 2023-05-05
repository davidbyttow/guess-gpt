from pathlib import Path

from pydantic import BaseModel
from langchain import PromptTemplate


PROMPTS_DIR = Path(__file__).parent / "prompts"

GUESS_SYSTEM_PROMPT = PromptTemplate.from_file(
    PROMPTS_DIR / "guess_system.j2",
    ["person"],
    template_format="jinja2",
)
