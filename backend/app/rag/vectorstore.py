import chromadb
import uuid

from app.rag.embeddings import embed_text

CHROMA_PATH = "app/chroma_db"

client = chromadb.PersistentClient(
    path=CHROMA_PATH
)

collection = client.get_or_create_collection(
    name="devops_incidents"
)

def add_documents(chunks):
    """
    Store chunks inside ChromaDB.
    """

    ids = []
    documents = []
    embeddings = []
    metadatas = []

    for i, chunk in enumerate(chunks):

        ids.append(str(uuid.uuid4()))

        documents.append(chunk.page_content)

        embeddings.append(
            embed_text(chunk.page_content)
        )

        metadatas.append(chunk.metadata)

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas,
    )

def search(query, n_results=4):

    query_embedding = embed_text(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
    )

    return results