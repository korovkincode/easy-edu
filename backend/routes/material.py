import sys
sys.path.append("../config")
sys.path.append("../models")
from fastapi import APIRouter
from models.models import MaterialModel, UserCredentialsModel
from config.config import EasyEduDB
import uuid

router = APIRouter()

def validate(materialData, update=0):
    findCourse = EasyEduDB.Courses.find_one({"courseToken": materialData["courseToken"]})
    if findCourse is None:
        return {
            "status": 0,
            "feedback": {
                "response-type": "Error",
                "description": "No such course"
            }
        }
    if findCourse["authorToken"] != materialData["authorToken"]:
        return {
            "status": 0,
            "feedback": {
                "response-type": "Error",
                "description": "User has no rights for this action"
            }
        }
    if EasyEduDB.Users.find_one({"userToken": materialData["authorToken"]})["secretToken"] != materialData["secretToken"]:
        return {
            "status": 0,
            "feedback": {
                "response-type": "Error",
                "description": "Secret token is not matching"
            }
        }
    if update and EasyEduDB.Materials.find_one({"materialToken": materialData["materialToken"]}) is None:
        return {
            "status": 0,
            "feedback": {
                "response-type": "Error",
                "description": "No such material"
            }
        }
    return {"status": 1}

@router.post("/")
async def createMaterial(materialData: MaterialModel):
    materialData = materialData.dict()
    materialData["authorToken"] = materialData["authorCredentials"]["userToken"]
    materialData["secretToken"] = materialData["authorCredentials"]["secretToken"]
    del materialData["authorCredentials"]
    validation = validate(materialData)
    if not validation["status"]:
        return validation["feedback"]
    materialData["materialToken"] = uuid.uuid4().hex
    del materialData["secretToken"]
    try:
        EasyEduDB.Materials.insert_one(materialData)
        return {
            "response-type": "Success",
            "data": materialData["materialToken"],
            "description": "Material has been successfully created"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during material creation"
        }

@router.get("/{materialToken}")
async def readMaterial(materialToken: str):
    materialData = EasyEduDB.Materials.find_one(
        {"materialToken": materialToken},
        {"_id": 0}
    )
    if materialData is None:
        return {
            "response-type": "Error",
            "description": "No such material"
        }
    return {
        "response-type": "Success",
        "data": materialData
    }

@router.put("/{materialToken}")
async def updateMaterial(materialToken: str, materialData: MaterialModel):
    materialData = materialData.dict()
    materialData["materialToken"] = materialToken
    materialData["authorToken"] = materialData["authorCredentials"]["userToken"]
    materialData["secretToken"] = materialData["authorCredentials"]["secretToken"]
    del materialData["authorCredentials"]
    validation = validate(materialData, update=1)
    if not validation["status"]:
        return validation["feedback"]
    del materialData["secretToken"]
    try:
        EasyEduDB.Materials.replace_one(
            {"materialToken": materialToken},
            materialData,
            upsert=True
        )
        return {
            "response-type": "Success",
            "description": "Material has been successfully updated"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during material update"
        }

@router.delete("/{materialToken}")
async def deleteMaterial(materialToken: str, userData: UserCredentialsModel):
    userData = userData.dict()
    findMaterial = EasyEduDB.Materials.find_one({"materialToken": materialToken})
    if findMaterial is None:
        return {
            "response-type": "Error",
            "description": "No such material"
        }
    if findMaterial["authorToken"] != userData["userToken"]:
        return {
            "response-type": "Error",
            "description": "User has no rights for this action"
        }
    if EasyEduDB.Users.find_one({"userToken": userData["userToken"]})["secretToken"] != userData["secretToken"]:
        return {
            "response-type": "Error",
            "description": "Secret token is not matching"
        }
    try:
        EasyEduDB.Materials.delete_one({"materialToken": materialToken})
        return {
            "response-type": "Success",
            "description": "Material has been successfully deleted"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during material deletion"
        }
