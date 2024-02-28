from pydantic import BaseModel

class UserModel(BaseModel):
    username: str
    password: str
    name: str
    surname: str
    birthday: str