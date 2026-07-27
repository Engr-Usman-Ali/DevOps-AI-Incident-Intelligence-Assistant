from fastapi import (
    UploadFile,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.models.user import User

from app.graph.graph import graph

from app.services.memory_service import (
    create_chat_session,
    get_chat_session,
    save_user_message,
    save_ai_message,
    get_conversation_history,
)

from app.services.n8n_service import (
    send_incident_email,
)

MAX_FILE_SIZE = 10 * 1024 * 1024

ALLOWED_EXTENSIONS = {
    ".log",
    ".txt",
    ".json",
}


async def analyze_chat(
    message: str,
    file: UploadFile | None,
    db: Session,
    current_user: User,
    session_id: int | None,
):

    log_content = ""
    is_new_log = False

    # -----------------------------------------
    # Validate Uploaded File
    # -----------------------------------------

    if file:

        filename = file.filename.lower()

        if not filename.endswith(tuple(ALLOWED_EXTENSIONS)):
            raise HTTPException(
                status_code=400,
                detail="Only .log, .txt and .json files are allowed.",
            )

        content = await file.read()

        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="Maximum file size is 10 MB.",
            )

        try:

            log_content = content.decode("utf-8")

            is_new_log = True

        except UnicodeDecodeError:

            raise HTTPException(
                status_code=400,
                detail="File must be UTF-8 encoded.",
            )

    # -----------------------------------------
    # Require Input
    # -----------------------------------------

    if not message.strip() and not log_content:

        raise HTTPException(
            status_code=400,
            detail="Please provide a message or upload a log file.",
        )

    # -----------------------------------------
    # Create / Get Chat Session
    # -----------------------------------------

    if session_id is None:

        session = create_chat_session(
            db=db,
            user_id=current_user.id,
            title=message[:40] if message else "New Chat",
        )

        session_id = session.id

    else:

        session = get_chat_session(
            db=db,
            session_id=session_id,
        )

        if session is None:

            raise HTTPException(
                status_code=404,
                detail="Chat session not found.",
            )

    # -----------------------------------------
    # User Message
    # -----------------------------------------

    display_message = message

    if file:
        if message.strip():
            display_message += f"\n📎 {file.filename}"
        else:
            display_message = f"📎 {file.filename}"

    save_user_message(
        db=db,
        session_id=session_id,
        message=display_message,
    )

    # -----------------------------------------
    # Load Conversation History
    # -----------------------------------------

    history = get_conversation_history(
        db=db,
        session_id=session_id,
    )

    # -----------------------------------------
    # LangGraph State
    # -----------------------------------------

    state = {
        "user_question": message,
        "log_content": log_content,
        "parsed_log": {},
        "rag_context": "",
        "rag_score": 0.0,
        "web_context": "",
        "web_results": [],
        "history": history,
        "ai_response": {},
    }

    # -----------------------------------------
    # Run LangGraph
    # -----------------------------------------

    result = graph.invoke(state)

    ai_response = result["ai_response"]

    # -----------------------------------------
    # Save AI Response
    # -----------------------------------------

    save_ai_message(
        db=db,
        session_id=session_id,
        message=ai_response["summary"],
        analysis_json=ai_response,
    )

    # -----------------------------------------
    # Send Email ONLY when a new log is uploaded
    # -----------------------------------------

    if is_new_log:

        try:

            send_incident_email(
                email=current_user.email,
                session_id=session_id,
                analysis=ai_response,
            )

        except Exception as e:

            print(f"n8n Email Error: {e}")

    # -----------------------------------------
    # Return Response
    # -----------------------------------------

    return {
        "session_id": session_id,
        "reply": ai_response,
        "parsed_log": result["parsed_log"],
    }
