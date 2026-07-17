from fastapi import (
    UploadFile,
    HTTPException,
)

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

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

    # -------------------------
    # If user uploaded a file
    # -------------------------

    if file:

        filename = file.filename.lower()

        # Validate extension

        if not filename.endswith(tuple(ALLOWED_EXTENSIONS)):
            raise HTTPException(
                status_code=400,
                detail="Only .log, .txt and .json files are allowed.",
            )

        # Read file

        content = await file.read()

        # Validate size

        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="Maximum file size is 10 MB.",
            )

        try:
            log_content = content.decode("utf-8")
        except UnicodeDecodeError:
            raise HTTPException(
                status_code=400,
                detail="File must be UTF-8 encoded.",
            )

    # -------------------------
    # Require at least one input
    # -------------------------

    if not message.strip() and not log_content:
        raise HTTPException(
            status_code=400,
            detail="Please provide a message or upload a log file.",
        )

    # -------------------------
    # Build AI Prompt
    # -------------------------

    prompt = f"""
You are an expert DevOps Incident Engineer.

User Question:
{message}

Log File:
{log_content}
"""

    # Temporary response
    # Later this prompt goes to HuggingFace

    return {
        "reply": prompt,
    }