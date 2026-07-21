from google import genai

from app.core.config import GEMINI_API_KEY


client = genai.Client(
    api_key=GEMINI_API_KEY,
)


MODEL_NAME = "gemini-embedding-2"


def embed_text(text: str):
    """
    Generate embedding for one text.
    """

    response = client.models.embed_content(
        model=MODEL_NAME,
        contents=text,
    )

    return response.embeddings[0].values