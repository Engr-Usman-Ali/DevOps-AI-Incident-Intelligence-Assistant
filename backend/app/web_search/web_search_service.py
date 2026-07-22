from ddgs import DDGS


def search_web(
    query: str,
    max_results: int = 5,
):
    """
    Search web using DuckDuckGo.
    """

    results = []

    try:

        with DDGS() as ddgs:

            search_results = ddgs.text(
                query,
                max_results=max_results,
            )

            for item in search_results:

                results.append(
                    {
                        "title": item.get(
                            "title",
                            "",
                        ),

                        "body": item.get(
                            "body",
                            "",
                        ),

                        "url": item.get(
                            "href",
                            "",
                        ),
                    }
                )


    except Exception as e:

        print(
            "DuckDuckGo Search Error:",
            e,
        )

        return []


    return results



def build_web_context(results):
    """
    Convert results into LLM context.
    """

    if not results:
        return ""


    context = ""


    for index, item in enumerate(
        results,
        start=1,
    ):

        context += (
            f"Result {index}\n"
            f"Title: {item['title']}\n"
            f"Summary: {item['body']}\n"
            f"URL: {item['url']}\n\n"
        )


    return context