from langgraph.graph import (
    StateGraph,
    END,
)

from app.graph.state import (
    GraphState,
)

from app.graph.nodes import (
    parse_log_node,
    retrieve_rag_node,
    ask_llm_node,
    web_search_node,
    final_llm_node,
)

from app.graph.router import (
    route_after_retrieval,
    route_after_llm,
)

# ----------------------------------------
# Create Graph
# ----------------------------------------

builder = StateGraph(GraphState)

# ----------------------------------------
# Add Nodes
# ----------------------------------------

builder.add_node(
    "parse_log",
    parse_log_node,
)

builder.add_node(
    "retrieve_rag",
    retrieve_rag_node,
)

builder.add_node(
    "ask_llm",
    ask_llm_node,
)

builder.add_node(
    "web_search",
    web_search_node,
)

builder.add_node(
    "final_llm",
    final_llm_node,
)

# ----------------------------------------
# Entry Point
# ----------------------------------------

builder.set_entry_point(
    "parse_log"
)

# ----------------------------------------
# Normal Flow
# ----------------------------------------

builder.add_edge(
    "parse_log",
    "retrieve_rag",
)

# ----------------------------------------
# Decide After Retrieval
# ----------------------------------------

builder.add_conditional_edges(
    "retrieve_rag",
    route_after_retrieval,
    {
        "ask_llm": "ask_llm",
        "web_search": "web_search",
    },
)

# ----------------------------------------
# Decide After First AI Call
# ----------------------------------------

builder.add_conditional_edges(
    "ask_llm",
    route_after_llm,
    {
        "web_search": "web_search",
        "end": END,
    },
)

# ----------------------------------------
# Web Search Flow
# ----------------------------------------

builder.add_edge(
    "web_search",
    "final_llm",
)

builder.add_edge(
    "final_llm",
    END,
)

# ----------------------------------------
# Compile
# ----------------------------------------

graph = builder.compile()