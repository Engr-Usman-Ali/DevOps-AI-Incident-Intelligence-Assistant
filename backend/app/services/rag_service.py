import chromadb

from app.core.embedding import embedding_model


class RagService:

    def __init__(self):

        self.client = chromadb.PersistentClient(
            path="chroma_db"
        )

        self.collection = self.client.get_or_create_collection(
            name="devops_docs"
        )

    def search(
        self,
        query,
        top_k=5,
    ):

        embedding = embedding_model.encode(
            query
        ).tolist()

        results = self.collection.query(
            query_embeddings=[embedding],
            n_results=top_k,
        )

        return results