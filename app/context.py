import os

from pydantic import BaseModel

DEFAULT_MODEL = "gpt-4"
DEFAULT_OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")


class Context(BaseModel):
    model: str = DEFAULT_MODEL
    openai_api_key: str = DEFAULT_OPENAI_API_KEY
    verbose: bool = True
