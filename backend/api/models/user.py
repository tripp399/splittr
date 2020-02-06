from api.database import db
from sqlalchemy import Column, Integer, String

class User(db.Model):
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(20), unique=True, nullable=False)
    pw_hash = Column(String(64), nullable=False)
    name = Column(String(50), nullable=False)