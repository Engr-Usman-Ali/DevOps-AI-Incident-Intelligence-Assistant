from app.rag.loader import load_documents
from app.rag.splitter import split_documents
from app.rag.vectorstore import add_documents


def ingest():

    print("=" * 60)
    print("Loading knowledge base...")
    print("=" * 60)

    documents = load_documents()

    print(f"Loaded {len(documents)} documents")

    print("=" * 60)
    print("Splitting documents...")
    print("=" * 60)

    chunks = split_documents(documents)

    print(f"Created {len(chunks)} chunks")

    print("=" * 60)
    print("Saving embeddings to ChromaDB...")
    print("=" * 60)

    add_documents(chunks)

    print("=" * 60)
    print("Knowledge Base Ready!")
    print("=" * 60)


if __name__ == "__main__":
    ingest()