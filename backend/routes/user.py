import sys
sys.path.append("../config")
sys.path.append("../models")
from fastapi import APIRouter
from config.config import EasyEduDB
from models.models import UserModel

router = APIRouter()

@router.get("/{username}")
async def getUser(username: str):
    userData = EasyEduDB.Users.find_one({"username": username}, {"_id": 0, "password": 0})
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

@router.post("/")
async def createUser(userData: UserModel):
    try:
        EasyEduDB.Users.insert_one(userData.dict())
        return {
            "response-type": "Success",
            "description": "User has been successfully created"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during user creation"
        }