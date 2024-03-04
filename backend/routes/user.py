import sys
sys.path.append("../config")
sys.path.append("../models")
from fastapi import APIRouter
from config.config import EasyEduDB
from models.models import UserModel, UserCredentials
import uuid

router = APIRouter()

@router.post("/auth")
async def authUser(userData: UserCredentials):
    userData = userData.dict()
    findUser = EasyEduDB.Users.find_one({
        "username": userData["username"],
        "password": userData["password"]
    })
    if findUser is None:
        return {
            "response-type": "Error",
            "description": "No such user"
        }
    return {
        "response-type": "Success",
        "data": findUser["userToken"]
    }

@router.post("/")
async def createUser(userData: UserModel):
    userData = userData.dict()
    userData["userToken"] = uuid.uuid4().hex
    if EasyEduDB.Users.find_one({"username": userData["username"]}) is not None:
        return {
            "response-type": "Error",
            "description": "This username is already taken"
        }
    try:
        EasyEduDB.Users.insert_one(userData)
        return {
            "response-type": "Success",
            "data": userData["userToken"],
            "description": "User has been successfully created"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during user creation"
        }
        
@router.get("/{userToken}")
async def readUser(userToken: str):
    userData = EasyEduDB.Users.find_one(
        {"userToken": userToken},
        {"_id": 0, "password": 0}
    )
    if userData is not None:
        return {
            "response-type": "Success",
            "data": userData
        }
    else:
        return {
            "response-type": "Error",
            "description": "No such user"
        }

@router.put("/")
async def updateUser(userData: UserModel):
    userData = userData.dict()
    if userData.get("userToken", None) is None:
        return {
            "response-type": "Error",
            "description": "UserToken should be passed"
        }
    if EasyEduDB.Users.find_one({"userToken": userData["userToken"]}) is None:
        return {
            "response-type": "Error",
            "description": "User does not exist"
        }
    if EasyEduDB.Users.find_one({"userToken": {"$ne": userData["userToken"]}, "username": userData["username"]}) is not None:
        return {
            "response-type": "Error",
            "description": "New username should be unique"
        }
    try:
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