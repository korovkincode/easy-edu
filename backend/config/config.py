from pymongo import MongoClient

class EasyEduDB:
    URI = "mongodb+srv://topfloorboss:1234@cluster0.pnamwnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
    @classmethod
    def connectDB(cls):
        cls.client = MongoClient(cls.URI)
        cls.db = cls.client.EasyEdu
        cls.Users = cls.db.Users