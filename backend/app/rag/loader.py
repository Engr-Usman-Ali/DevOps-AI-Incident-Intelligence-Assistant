from pathlib import Path

from langchain_community.document_loaders import TextLoader


KNOWLEDGE_BASE = (
    Path(__file__)
    .parent.parent
    / "knowledge_base"
)


def load_documents():
    """
    Load every Markdown file
    from knowledge_base.
    """

    documents = []

    markdown_files = KNOWLEDGE_BASE.rglob("*.md")

    for file_path in markdown_files:

        loader = TextLoader(
            str(file_path),
            encoding="utf-8",
        )

        docs = loader.load()

        documents.extend(docs)

    return documents