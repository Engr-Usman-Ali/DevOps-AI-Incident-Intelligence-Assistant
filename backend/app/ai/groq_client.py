from groq import Groq

from app.core.config import GROQ_API_KEY


client = Groq(
    api_key=GROQ_API_KEY,
)

if __name__ == "__main__":

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": "Say Hello",
            }
        ],
    )

    print(
        response.choices[0].message.content
    )