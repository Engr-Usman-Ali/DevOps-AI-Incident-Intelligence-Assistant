from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_documents(documents):
    """
    Split large documents into
    smaller chunks for embedding.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            "",
        ],
    )

    chunks = splitter.split_documents(documents)

    return chunks