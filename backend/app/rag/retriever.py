from app.rag.vectorstore import search


def retrieve_context(
    query: str,
    log_content: str = "",
    parsed_log: dict | None = None,
    n_results: int = 4,
):
    """
    Retrieve relevant context from ChromaDB using:
    - User question
    - Parsed errors
    - Services
    - Keywords
    - Beginning of uploaded log
    """

    search_parts = []

    # -------------------------
    # User Question
    # -------------------------

    if query.strip():
        search_parts.append(
            f"User Question:\n{query.strip()}"
        )

    # -------------------------
    # Parsed Log
    # -------------------------

    if parsed_log:

        errors = parsed_log.get("errors", [])

        if errors:
            search_parts.append(
                "Detected Errors:\n" +
                "\n".join(errors)
            )

        services = parsed_log.get("services", [])

        if services:
            search_parts.append(
                "Services:\n" +
                "\n".join(services)
            )

        keywords = parsed_log.get("keywords", [])

        if keywords:
            search_parts.append(
                "Keywords:\n" +
                "\n".join(keywords)
            )

    # -------------------------
    # Raw Log
    # -------------------------

    if log_content:

        # Don't send an entire 5 MB log.
        # 1500-2000 characters is enough.

        snippet = log_content[:2000]

        search_parts.append(
            "Uploaded Log:\n" + snippet
        )

    search_query = "\n\n".join(search_parts)

    print("=" * 60)
    print("SEARCH QUERY")
    print(search_query)
    print("=" * 60)

    results = search(
        query=search_query,
        n_results=n_results,
    )

    documents = results.get("documents", [])
    distances = results.get("distances", [])

    if not documents or not documents[0]:
        return {
            "context": "",
            "score": 0.0,
        }

    context = "\n\n".join(documents[0])

    similarity = 0.0

    if distances and distances[0]:
        similarity = max(
            0.0,
            1.0 - distances[0][0],
        )

    print("Similarity:", similarity)

    return {
        "context": context,
        "score": similarity,
    }