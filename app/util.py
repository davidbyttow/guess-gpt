from typing import Dict, Any

import re
import json


def fix_json(s: str) -> str:
    s = s.strip().replace("\n", "")
    return re.sub(r",(?=\s*[\]}])", "", s)


def load_malformed_json(s: str) -> Dict[str, Any]:
    try:
        return json.loads(fix_json(s))
    except ValueError:
        return None
