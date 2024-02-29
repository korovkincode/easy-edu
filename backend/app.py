from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as UserRouter
from config.config import EasyEduDB

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startDB():
    EasyEduDB.connectDB()

@app.get("/", tags=["Root"])
async def root():
    return {"message": "API for EasyEdu using FastAPI + MongoDB"}


app.include_router(UserRouter, tags=["Users"], prefix="/user")