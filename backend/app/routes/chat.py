from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import get_current_user

from app.models.user import User

from app.services.chat_service import (
    analyze_chat,
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("")
async def chat(
    message: str = Form(""),
    session_id: int | None = Form(None),
    file: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:

        return await analyze_chat(
            message=message,
            file=file,
            db=db,
            current_user=current_user,
            session_id=session_id,
        )

    except HTTPException:
        raise

    except Exception as e:

        print(e)

        raise HTTPException(
            status_code=500,
            detail="Internal Server Error",
        )