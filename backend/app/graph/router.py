def route_after_retrieval(state):
    """
    Decide whether to use RAG or
    perform a web search immediately.
    """

    score = state["rag_score"]

    # Weak retrieval
    if score < 0.50:
        return "web_search"

    return "ask_llm"


def route_after_llm(state):
    """
    Decide whether another web search
    is required after the first LLM call.
    """

    response = state["ai_response"]

    if response.get(
        "web_search_required",
        False,
    ):
        return "web_search"

    return "end"