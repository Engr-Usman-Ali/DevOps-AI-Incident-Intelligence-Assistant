from app.rag.loader import load_documents
from app.rag.splitter import split_documents

documents = load_documents()

chunks = split_documents(documents)

print("Documents:", len(documents))
print("Chunks:", len(chunks))

print("=" * 80)

print(chunks[0].page_content)

print("=" * 80)

print(chunks[0].metadata)