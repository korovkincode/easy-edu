import sys
sys.path.append("../config")
sys.path.append("../models")
from fastapi import APIRouter
from models.models import CourseModel
from config.config import EasyEduDB
import uuid

router = APIRouter()

@router.post("/")
async def createCourse(courseData: CourseModel):
    courseData = courseData.dict()
    courseData["courseToken"] = uuid.uuid4().hex
    userCourses = EasyEduDB.UsersToCourses.find_one({"userToken": courseData["authorToken"]})
    if userCourses is None:
        userCourses = {"userToken": courseData["authorToken"]}
        userCoursesList = []
    else:
        userCoursesList = userCourses["courses"]
    userCoursesList.append({
        "courseToken": courseData["courseToken"],
        "role": "admin"
    })
    userCourses["courses"] = userCoursesList
    EasyEduDB.UsersToCourses.replace_one(
        {"userToken": courseData["authorToken"]},
        userCourses,
        upsert=True
    )
    try:
        EasyEduDB.Courses.insert_one(courseData)
        return {
            "response-type": "Success",
            "data": courseData["courseToken"],
            "description": "Course has been successfully created"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during course creation"
        }

@router.get("/{courseToken}")
async def getCourse(courseToken):
    courseData = EasyEduDB.Courses.find_one(
        {"courseToken": courseToken},
        {"_id": 0}
    )
    if courseData is None:
        return {
            "response-type": "Error",
            "description": "No such course"
        }
    userData = EasyEduDB.Users.find_one(
        {"userToken": courseData["authorToken"]},
        {"_id": 0, "password": 0}
    )
    return {
        "response-type": "Success",
        "data": {
            "course": courseData,
            "author": userData
        }
    }