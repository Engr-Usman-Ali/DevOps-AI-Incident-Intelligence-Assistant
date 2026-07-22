from app.services.parser_service import (
    extract_log_information,
)

from app.rag.retriever import (
    retrieve_context,
)

from app.ai.parser import (
    ask_llm,
)

from app.web_search.web_search_service import (
    search_web,
    build_web_context,
)


# ==========================================
# Parse Uploaded Log
# ==========================================

def parse_log_node(state):

    print("\n" + "=" * 70)
    print("NODE: PARSE LOG")
    print("=" * 70)

    parsed_log = extract_log_information(
        state["log_content"]
    )

    state["parsed_log"] = parsed_log

    print("Parsed Log:")
    print(parsed_log)

    return state


# ==========================================
# Retrieve Context From ChromaDB
# ==========================================

def retrieve_rag_node(state):

    print("\n" + "=" * 70)
    print("NODE: RETRIEVE RAG")
    print("=" * 70)

    retrieval = retrieve_context(
        query=state["user_question"],
        parsed_log=state["parsed_log"],
    )

    state["rag_context"] = retrieval["context"]
    state["rag_score"] = retrieval["score"]

    print(f"Similarity Score : {state['rag_score']:.3f}")

    if state["rag_context"]:
        print("RAG Context Found")
    else:
        print("No RAG Context Found")

    return state


# ==========================================
# First AI Call
# ==========================================

def ask_llm_node(state):

    print("\n" + "=" * 70)
    print("NODE: FIRST LLM")
    print("=" * 70)

    response = ask_llm(
        user_question=state["user_question"],
        log_content=state["log_content"],
        rag_context=state["rag_context"],
        web_context="",
    )

    # Backend knows RAG was used
    response["used_rag"] = bool(
        state["rag_context"]
    )

    response["used_web_search"] = False

    state["ai_response"] = response

    print("LLM Response:")
    print(response)

    return state


# ==========================================
# DuckDuckGo Search
# ==========================================

def web_search_node(state):

    print("\n" + "=" * 70)
    print("NODE: WEB SEARCH")
    print("=" * 70)

    query = (
        state["ai_response"].get(
            "web_search_query"
        )
        or state["user_question"]
    )

    print("Search Query:")
    print(query)

    results = search_web(
        query=query,
        max_results=5,
    )

    print(f"Results Found: {len(results)}")

    state["web_results"] = results

    state["web_context"] = build_web_context(
        results
    )

    return state


# ==========================================
# Second AI Call
# ==========================================

def final_llm_node(state):

    print("\n" + "=" * 70)
    print("NODE: FINAL LLM")
    print("=" * 70)

    response = ask_llm(
        user_question=state["user_question"],
        log_content=state["log_content"],
        rag_context=state["rag_context"],
        web_context=state["web_context"],
    )

    # Backend knows exactly what happened
    response["used_rag"] = bool(
        state["rag_context"]
    )

    response["used_web_search"] = bool(
        state["web_results"]
    )

    response["web_results"] = state[
        "web_results"
    ]

    state["ai_response"] = response

    print("Final AI Response:")
    print(response)

    return state