from pydantic import BaseModel
from typing import Optional

class UserAuthModel(BaseModel):
    username: str
    password: str

class UserCredentialsModel(BaseModel):
    userToken: str
    secretToken: str

class UserModel(BaseModel):
    userCredentials: Optional[UserCredentialsModel] = None
    username: str
    password: str
    previousPassword: Optional[str] = None
    name: str
    surname: str
    birthday: str
    signedUp: Optional[str] = None

class UserCourseModel(BaseModel):
    userToken: str
    courseToken: str

class CourseModel(BaseModel):
    authorToken: str
    name: str
    description: str

class CourseCommentModel(BaseModel):
    authorCredentials: UserCredentialsModel
    comment: str
    creationDate: str

class AnnouncementModel(BaseModel):
    authorCredentials: UserCredentialsModel
    announcement: str

class MaterialModel(BaseModel):
    authorCredentials: UserCredentialsModel
    courseToken: str
    description: str
    creationDate: str