from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.core.database import get_db

from app.schemas.auth import (
    UserSignup,
    UserLogin,
    Token,
)

from app.schemas.user import UserResponse

from app.services.auth_service import (
    register_user,
    login_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=201,
)
def signup(
    user: UserSignup,
    db: Session = Depends(get_db),
):
    return register_user(user, db)


@router.post(
    "/login",
    response_model=Token,
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    return login_user(user, db)


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user