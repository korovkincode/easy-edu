from pydantic import BaseModel
from typing import Optional

class UserCredentials(BaseModel):
    username: str
    password: str

class UserModel(BaseModel):
    userToken: Optional[str] = None
    username: str
    password: str
    name: str
    surname: str
    birthday: str