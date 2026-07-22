from fastapi import (
    UploadFile,
    HTTPException,
)

from app.graph.graph import graph


MAX_FILE_SIZE = 10 * 1024 * 1024

ALLOWED_EXTENSIONS = {
    ".log",
    ".txt",
    ".json",
}


async def analyze_chat(
    message: str,
    file: UploadFile | None,
):

    log_content = ""

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

            log_content = content.decode(
                "utf-8"
            )

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
    # Initial Graph State
    # -----------------------------------------

    state = {

        "user_question": message,

        "log_content": log_content,

        "parsed_log": {},

        "rag_context": "",

        "rag_score": 0.0,

        "web_context": "",

        "web_results": [],

        "ai_response": {},

    }

    # -----------------------------------------
    # Run LangGraph
    # -----------------------------------------

    result = graph.invoke(
        state
    )

    # -----------------------------------------
    # Return Response
    # -----------------------------------------

    return {

        "reply": result["ai_response"],

        "parsed_log": result["parsed_log"],

    }