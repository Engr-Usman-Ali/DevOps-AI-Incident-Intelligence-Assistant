from sqlalchemy.orm import Session

from app.models.chat_session import ChatSession
from app.models.chat_message import ChatMessage


# ==========================================
# Create New Chat Session
# ==========================================

def create_chat_session(
    db: Session,
    user_id: int,
    title: str = "New Chat",
):
    session = ChatSession(
        user_id=user_id,
        title=title,
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


# ==========================================
# Get Chat Session
# ==========================================

def get_chat_session(
    db: Session,
    session_id: int,
):
    return (
        db.query(ChatSession)
        .filter(ChatSession.id == session_id)
        .first()
    )


# ==========================================
# Get Sessions (Dashboard + History)
# ==========================================

def get_user_sessions(
    db: Session,
    user_id: int,
):
    sessions = (
        db.query(ChatSession)
        .filter(
            ChatSession.user_id == user_id
        )
        .order_by(
            ChatSession.updated_at.desc()
        )
        .all()
    )

    data = []

    for session in sessions:

        latest_ai = (
            db.query(ChatMessage)
            .filter(
                ChatMessage.session_id == session.id,
                ChatMessage.role == "assistant",
            )
            .order_by(
                ChatMessage.created_at.desc()
            )
            .first()
        )

        analysis = {}

        if latest_ai and latest_ai.analysis_json:
            analysis = latest_ai.analysis_json

        data.append(
            {
                "id": session.id,
                "title": session.title,
                "created_at": session.created_at,
                "updated_at": session.updated_at,

                "summary": analysis.get(
                    "summary",
                    "",
                ),

                "severity": analysis.get(
                    "severity",
                    "Unknown",
                ),

                "confidence": analysis.get(
                    "confidence",
                    0,
                ),

                "incident_type": analysis.get(
                    "incident_type",
                    "",
                ),

                "root_cause": analysis.get(
                    "root_cause",
                    "",
                ),
            }
        )

    return data


# ==========================================
# Save User Message
# ==========================================

def save_user_message(
    db: Session,
    session_id: int,
    message: str,
):
    chat_message = ChatMessage(
        session_id=session_id,
        role="user",
        message=message,
    )

    db.add(chat_message)
    db.commit()

    return chat_message


# ==========================================
# Save AI Message
# ==========================================

def save_ai_message(
    db: Session,
    session_id: int,
    message: str,
    analysis_json: dict | None = None,
):
    chat_message = ChatMessage(
        session_id=session_id,
        role="assistant",
        message=message,
        analysis_json=analysis_json,
    )

    db.add(chat_message)
    db.commit()

    return chat_message


# ==========================================
# Conversation Memory
# ==========================================

def get_conversation_history(
    db: Session,
    session_id: int,
    limit: int = 20,
):
    messages = (
        db.query(ChatMessage)
        .filter(
            ChatMessage.session_id == session_id
        )
        .order_by(
            ChatMessage.created_at.asc()
        )
        .limit(limit)
        .all()
    )

    history = []

    for msg in messages:

        history.append(
            {
                "role": msg.role,
                "content": msg.message,
            }
        )

    return history


# ==========================================
# Get Messages of One Session
# ==========================================

def get_session_messages(
    db: Session,
    session_id: int,
):
    return (
        db.query(ChatMessage)
        .filter(
            ChatMessage.session_id == session_id
        )
        .order_by(
            ChatMessage.created_at.asc()
        )
        .all()
    )


# ==========================================
# Delete Session
# ==========================================

def delete_chat_session(
    db: Session,
    session_id: int,
):
    session = (
        db.query(ChatSession)
        .filter(
            ChatSession.id == session_id
        )
        .first()
    )

    if session:

        db.delete(session)

        db.commit()

    return True