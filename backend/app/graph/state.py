from typing import TypedDict


class GraphState(TypedDict):

    user_question: str

    log_content: str

    parsed_log: dict

    rag_context: str

    rag_score: float

    web_context: str

    web_results: list

    ai_response: dict