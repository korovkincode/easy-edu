from pydantic import BaseModel
from typing import Optional

class UserModel(BaseModel):
    userToken: Optional[str] = None
    username: str
    password: str
    name: str
    surname: str
    birthday: str