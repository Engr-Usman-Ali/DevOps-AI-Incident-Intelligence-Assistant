import json

from groq import Groq

from app.ai.groq_client import client
from app.ai.prompts import (
    SYSTEM_PROMPT,
    build_prompt,
)


MODEL_NAME = "llama-3.3-70b-versatile"


def ask_llm(
    user_question: str,
    log_content: str,
    rag_context: str,
):
    prompt = build_prompt(
        user_question=user_question,
        log_content=log_content,
        rag_context=rag_context,
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

    try:
        return json.loads(content)

    except Exception:

        return {
            "severity": "Unknown",
            "confidence": 0,
            "summary": content,
            "root_cause": "",
            "fixes": [],
            "prevention": [],
            "follow_up_questions": [],
            "web_search_required": False,
            "web_search_query": "",
        }