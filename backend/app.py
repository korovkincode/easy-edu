from fastapi import FastAPI
from routes.user import router as UserRouter
from config.config import EasyEduDB

app = FastAPI()

@app.on_event("startup")
async def startDB():
    EasyEduDB.connectDB()

@app.get("/", tags=["Root"])
async def root():
    return {"message": "API for EasyEdu using FastAPI + MongoDB"}


app.include_router(UserRouter, tags=["Users"], prefix="/user")