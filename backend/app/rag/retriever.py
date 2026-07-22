from app.rag.vectorstore import search


def retrieve_context(
    query: str,
    parsed_log: dict | None = None,
    n_results: int = 4,
):
    """
    Retrieve relevant context from ChromaDB.

    Returns:
    {
        "context": "...",
        "score": similarity (0.0 - 1.0)
    }
    """

    # -----------------------------------------
    # Build Search Query
    # -----------------------------------------

    search_query = query.strip()

    if parsed_log:

        errors = parsed_log.get("errors", [])

        if errors:
            search_query += "\n\nDetected Errors:\n"
            search_query += "\n".join(errors)

        services = parsed_log.get("services", [])

        if services:
            search_query += "\n\nServices:\n"
            search_query += "\n".join(services)

        keywords = parsed_log.get("keywords", [])

        if keywords:
            search_query += "\n\nKeywords:\n"
            search_query += "\n".join(keywords)

    print("=" * 60)
    print("SEARCH QUERY")
    print(search_query)
    print("=" * 60)

    # -----------------------------------------
    # Search ChromaDB
    # -----------------------------------------

    results = search(
        query=search_query,
        n_results=n_results,
    )

    documents = results.get(
        "documents",
        [],
    )

    distances = results.get(
        "distances",
        [],
    )

    # -----------------------------------------
    # No documents found
    # -----------------------------------------

    if not documents or not documents[0]:

        print("No RAG documents found.")

        return {
            "context": "",
            "score": 0.0,
        }

    # -----------------------------------------
    # Merge documents
    # -----------------------------------------

    context = "\n\n".join(
        documents[0]
    )

    # -----------------------------------------
    # Convert distance → similarity
    # -----------------------------------------

    similarity = 0.0

    if distances and distances[0]:

        distance = distances[0][0]

        similarity = max(
            0.0,
            1.0 - distance,
        )

    print("=" * 60)
    print("RAG Similarity:", similarity)
    print("=" * 60)

    return {
        "context": context,
        "score": similarity,
    }