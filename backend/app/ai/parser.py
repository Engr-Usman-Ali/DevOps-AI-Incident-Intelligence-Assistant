import json
import re

from app.ai.groq_client import client
from app.ai.prompts import (
    SYSTEM_PROMPT,
    build_prompt,
)

MODEL_NAME = "llama-3.3-70b-versatile"


def extract_json(text: str):
    """
    Extract JSON object from an LLM response.
    """

    text = text.strip()

    # Remove markdown code fences

    text = re.sub(
        r"^```json",
        "",
        text,
        flags=re.IGNORECASE,
    )

    text = re.sub(
        r"^```",
        "",
        text,
        flags=re.IGNORECASE,
    )

    text = text.replace(
        "```",
        "",
    ).strip()

    # Find first JSON object

    match = re.search(
        r"\{.*\}",
        text,
        re.DOTALL,
    )

    if match:
        return match.group()

    return text


def ask_llm(
    user_question,
    log_content,
    rag_context,
    web_context="",
):
    """
    Ask Groq LLM and return structured JSON.
    """

    prompt = build_prompt(
        user_question=user_question,
        log_content=log_content,
        rag_context=rag_context,
        web_context=web_context,
    )

    response = client.chat.completions.create(
        model=MODEL_NAME,
        temperature=0.2,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )

    content = response.choices[0].message.content

    json_text = extract_json(content)

    try:

        data = json.loads(json_text)

    except Exception:

        data = {
            "summary": content,
            "severity": "Unknown",
            "confidence": 0,
            "incident_type": "Unknown",
            "root_cause": "Unable to determine because the AI returned an invalid response.",
            "evidence": [],
            "fixes": [],
            "commands": [],
            "prevention": [],
            "sources": [],
            "used_rag": False,
            "used_web_search": False,
            "web_search_required": False,
            "web_search_query": "",
        }

    # ------------------------------------------------
    # Ensure all keys always exist
    # ------------------------------------------------

    data.setdefault(
        "summary",
        "",
    )

    data.setdefault(
        "severity",
        "Unknown",
    )

    data.setdefault(
        "confidence",
        0,
    )

    data.setdefault(
        "incident_type",
        "Unknown",
    )

    data.setdefault(
        "root_cause",
        "",
    )

    data.setdefault(
        "evidence",
        [],
    )

    data.setdefault(
        "fixes",
        [],
    )

    data.setdefault(
        "commands",
        [],
    )

    data.setdefault(
        "prevention",
        [],
    )

    data.setdefault(
        "sources",
        [],
    )

    data.setdefault(
        "used_rag",
        False,
    )

    data.setdefault(
        "used_web_search",
        False,
    )

    data.setdefault(
        "web_search_required",
        False,
    )

    data.setdefault(
        "web_search_query",
        "",
    )

    return data