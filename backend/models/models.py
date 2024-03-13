from pydantic import BaseModel
from typing import Optional

class UserCredentialsModel(BaseModel):
    username: str
    password: str

class UserModel(BaseModel):
    userToken: Optional[str] = None
    secretToken: Optional[str] = None
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
    userToken: str
    secretToken: str
    comment: str
    creationDate: str

class CourseAnnouncementModel(BaseModel):
    authorToken: str
    secretToken: str
    announcement: str