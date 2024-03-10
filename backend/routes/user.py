import sys
sys.path.append("../config")
sys.path.append("../models")
from fastapi import APIRouter
from config.config import EasyEduDB
from models.models import UserModel, UserCredentialsModel, UserCourseModel
import uuid

router = APIRouter()

@router.post("/auth")
async def authUser(userData: UserCredentialsModel):
    userData = userData.dict()
    userData = EasyEduDB.Users.find_one({
        "username": userData["username"],
        "password": userData["password"]
    })
    if userData is None:
        return {
            "response-type": "Error",
            "description": "No such user"
        }
    return {
        "response-type": "Success",
        "data": {
            "userToken": userData["userToken"],
            "secretToken": userData["secretToken"]
        }
    }

@router.post("/")
async def createUser(userData: UserModel):
    userData = userData.dict()
    userData["userToken"] = uuid.uuid4().hex
    userData["secretToken"] = uuid.uuid4().hex
    if EasyEduDB.Users.find_one({"username": userData["username"]}) is not None:
        return {
            "response-type": "Error",
            "description": "This username is already taken"
        }
    del userData["previousPassword"]
    try:
        EasyEduDB.Users.insert_one(userData)
        return {
            "response-type": "Success",
            "data": {
                "userToken": userData["userToken"],
                "secretToken": userData["secretToken"]
            },
            "description": "User has been successfully created"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during user creation"
        }
        
@router.get("/{userID}")
async def readUser(userID: str, idType: str):
    if idType not in ["token", "username"]:
        return {
            "response-type": "Error",
            "description": "Please pass correct idType parameter (token or username)"
        }
    if idType == "token":
        return await readUserByToken(userID)
    return await readUserByUsername(userID)


async def readUserByToken(userToken: str):
    userData = EasyEduDB.Users.find_one(
        {"userToken": userToken},
        {"_id": 0, "secretToken": 0, "password": 0}
    )
    if userData is None:
        return {
            "response-type": "Error",
            "description": "No such user"
        }
    return {
        "response-type": "Success",
        "data": userData
    }

async def readUserByUsername(username: str):
    userData = EasyEduDB.Users.find_one(
        {"username": username},
        {"_id": 0, "secretToken": 0, "password": 0}
    )
    if userData is None:
        return {
            "response-type": "Error",
            "description": "No such user"
        }
    return {
        "response-type": "Success",
        "data": userData
    }

@router.put("/")
async def updateUser(userData: UserModel):
    userData = userData.dict()
    if userData.get("userToken", None) is None:
        return {
            "response-type": "Error",
            "description": "User token should be passed"
        }
    if userData.get("secretToken", None) is None:
        return {
            "response-type": "Error",
            "description": "Secret token should be passed"
        }
    if userData.get("previousPassword", None) is None:
        return {
            "response-type": "Error",
            "description": "Previous password should be passed"
        }
    findUser = EasyEduDB.Users.find_one({"userToken": userData["userToken"]})
    if findUser is None:
        return {
            "response-type": "Error",
            "description": "User does not exist"
        }
    if findUser["secretToken"] != userData["secretToken"]:
        return {
            "response-type": "Error",
            "description": "Secret token is not matching"
        }
    if findUser["password"] != userData["previousPassword"]:
        return {
            "response-type": "Error",
            "description": "Previous password is not matching"
        }
    if EasyEduDB.Users.find_one({"userToken": {"$ne": userData["userToken"]}, "username": userData["username"]}) is not None:
        return {
            "response-type": "Error",
            "description": "New username should be unique"
        }
    try:
        del userData["previousPassword"]
        userData["signedUp"] = findUser["signedUp"]
        EasyEduDB.Users.replace_one({"userToken": userData["userToken"]}, userData)
        return {
            "response-type": "Success",
            "description": "User has been successfully updated"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during user update"
        }

@router.delete("/{userToken}")
async def deleteUser(userToken: str):
    if EasyEduDB.Users.find_one({"userToken": userToken}) is None:
        return {
            "response-type": "Error",
            "description": "User does not exist"
        }
    try:
        EasyEduDB.Users.delete_one({"userToken": userToken})
        return {
            "response-type": "Success",
            "description": "User has been successfully deleted"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during user deletion"
        }

@router.post("/join")
async def joinCourse(joinData: UserCourseModel):
    joinData = joinData.dict()
    if EasyEduDB.Courses.find_one({"courseToken": joinData["courseToken"]}) is None:
        return {
            "response-type": "Error",
            "description": "No such course"
        }
    userCourses = EasyEduDB.UsersToCourses.find_one({"userToken": joinData["userToken"]})
    if userCourses is None:
        userCourses = {"userToken": joinData["userToken"]}
        userCoursesList = []
    else:
        userCoursesList = userCourses["courses"]
    if len([course for course in userCoursesList if course["courseToken"] == joinData["courseToken"]]):
        return {
            "response-type": "Error",
            "description": "User has already joined the course before"
        }
    userCoursesList.append({
        "courseToken": joinData["courseToken"],
        "role": "student"
    })
    userCourses["courses"] = userCoursesList
    try:
        EasyEduDB.UsersToCourses.replace_one(
            {"userToken": joinData["userToken"]},
            userCourses,
            upsert=True
        )
        return {
            "response-type": "Success",
            "description": "Successfully joined the course"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Unexpected error"
        }

@router.get("/{userToken}/courses")
async def getCourses(userToken: str):
    if EasyEduDB.Users.find_one({"userToken": userToken}) is None:
        return {
            "response-type": "Error",
            "description": "No such user"
        }
    userCourses = EasyEduDB.UsersToCourses.find_one({"userToken": userToken})
    if userCourses is None:
        userCoursesList = []
    else:
        userCoursesList = userCourses["courses"]
    return {
        "response-type": "Success",
        "data": userCoursesList
    }