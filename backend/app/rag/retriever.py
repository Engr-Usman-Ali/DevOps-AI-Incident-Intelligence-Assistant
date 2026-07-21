from app.rag.vectorstore import search


def retrieve_context(
    query: str,
    n_results: int = 4,
):
    """
    Retrieve relevant documents from ChromaDB.
    """

    results = search(
        query=query,
        n_results=n_results,
    )

    documents = results.get("documents", [])

    if not documents:
        return ""

    context = "\n\n".join(documents[0])

    return context