from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user,
)

from app.models.user import User

from app.schemas.memory import (
    ChatSessionResponse,
    ChatMessageResponse,
)

from app.services.memory_service import (
    get_user_sessions,
    get_session_messages,
)

router = APIRouter(
    prefix="/memory",
    tags=["Memory"],
)


@router.get(
    "/sessions",
    response_model=list[ChatSessionResponse],
)
def sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    return get_user_sessions(
        db,
        current_user.id,
    )


@router.get(
    "/messages/{session_id}",
    response_model=list[ChatMessageResponse],
)
def messages(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    return get_session_messages(
        db,
        session_id,
    )