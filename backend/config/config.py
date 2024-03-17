from pymongo import MongoClient

class EasyEduDB:
    URI = "mongodb+srv://topfloorboss:1234@cluster0.pnamwnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
    @classmethod
    def connectDB(cls):
        cls.client = MongoClient(cls.URI)
        cls.db = cls.client.EasyEdu
        cls.Users = cls.db.Users
        cls.UsersToCourses = cls.db.UsersToCourses
        cls.Courses = cls.db.Courses
        cls.CourseComments = cls.db.CourseComments
        cls.Materials = cls.db.Materials