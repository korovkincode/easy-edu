import sys
sys.path.append("../config")
sys.path.append("../models")
from fastapi import APIRouter
from models.models import CourseModel, CourseCommentModel, AnnouncementModel
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
    try:
        EasyEduDB.UsersToCourses.replace_one(
            {"userToken": courseData["authorToken"]},
            userCourses,
            upsert=True
        )
    except:
        return {
            "response-type": "Error",
            "description": "Unexpected error"
        }
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
async def readCourse(courseToken):
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

@router.post("/{courseToken}/comment")
async def createComment(courseToken: str, commentData: CourseCommentModel):
    commentData = commentData.dict()
    if EasyEduDB.Courses.find_one({"courseToken": courseToken}) is None:
        return {
            "response-type": "Error",
            "description": "No such course"
        }
    commentData["authorToken"] = commentData["authorCredentials"]["userToken"]
    commentData["secretToken"] = commentData["authorCredentials"]["secretToken"]
    del commentData["authorCredentials"]
    if EasyEduDB.Users.find_one({"userToken": commentData["authorToken"], "secretToken": commentData["secretToken"]}) is None:
        return {
            "response-type": "Error",
            "description": "No such user"
        }
    courseComments = EasyEduDB.CourseComments.find_one({"courseToken": courseToken})
    if courseComments is None:
        courseComments = {"courseToken": courseToken}
        courseCommentsList = []
    else:
        courseCommentsList = courseComments["comments"]
    courseCommentsList.append({
        "authorToken": commentData["authorToken"],
        "comment": commentData["comment"],
        "creationDate": commentData["creationDate"]
    })
    courseComments["comments"] = courseCommentsList
    try:
        EasyEduDB.CourseComments.replace_one(
            {"courseToken": courseToken},
            courseComments,
            upsert=True
        )
        return {
            "response-type": "Success",
            "description": "Comment has been successfully created"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during comment creation"
        }

@router.get("/{courseToken}/comments")
async def readComments(courseToken: str):
    if EasyEduDB.Courses.find_one({"courseToken": courseToken}) is None:
        return {
            "response-type": "Error",
            "description": "No such course"
        }
    courseComments = EasyEduDB.CourseComments.find_one({"courseToken": courseToken}, {"_id": 0})
    if courseComments is None:
        courseComments = {
            "courseToken": courseToken,
            "comments": []
        }
    return {
        "response-type": "Success",
        "data": courseComments
    }

@router.put("/{courseToken}/announcement")
async def updateAnnouncement(courseToken: str, announcementData: AnnouncementModel):
    announcementData = announcementData.dict()
    announcementData["authorToken"] = announcementData["authorCredentials"]["userToken"]
    announcementData["secretToken"] = announcementData["authorCredentials"]["secretToken"]
    del announcementData["authorCredentials"]
    courseData = EasyEduDB.Courses.find_one({"courseToken": courseToken})
    if courseData is None:
        return {
            "response-type": "Error",
            "description": "No such course"
        }
    if courseData["authorToken"] != announcementData["authorToken"]:
        return {
            "response-type": "Error",
            "description": "User has no rights for this action"
        }
    if EasyEduDB.Users.find_one({"userToken": announcementData["authorToken"]})["secretToken"] != announcementData["secretToken"]:
        return {
            "response-type": "Error",
            "description": "Secret token is not matching"
        }
    courseData["announcement"] = announcementData["announcement"]
    try:
        EasyEduDB.Courses.replace_one(
            {"courseToken": courseToken},
            courseData,
            upsert=True
        )
        return {
            "response-type": "Success",
            "description": "Announcement has been successfully updated"
        }
    except:
        return {
            "response-type": "Error",
            "description": "Error occured during annoucement update"
        }