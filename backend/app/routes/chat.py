from fastapi import APIRouter, UploadFile, File, Form

from app.services.chat_service import analyze_chat

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("")
async def chat(
    message: str = Form(""),
    file: UploadFile | None = File(None),
):
    return await analyze_chat(
        message=message,
        file=file,
    )