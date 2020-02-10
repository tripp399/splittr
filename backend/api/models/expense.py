from api.database import db
from sqlalchemy import (
    Column, Integer, String, REAL, Enum, TIMESTAMP, 
    ForeignKeyConstraint, PrimaryKeyConstraint 
)
import enum
from datetime import datetime

class SplitType(enum.Enum):
    EQUAL = "equal"
    EXACT = "exact"
    PERCENTAGE = "percentage"

class Expense(db.Model):
    __tablename__ = 'expense'
    
    expense_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(50))
    total = Column(REAL, nullable=False)
    payer = Column(Integer, nullable=False)
    group_id = Column(Integer, nullable=False)
    split = Column(Enum(SplitType), nullable=False)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow)

    __table_args__ = (
        ForeignKeyConstraint(['group_id'], ['group.group_id']),
        ForeignKeyConstraint(['payer'], ['user.user_id'])
    )

class ExpenseShare(db.Model):
    __tablename__ = 'expense_share'

    expense_id = Column(Integer)
    user_id = Column(Integer)
    credit = Column(REAL, nullable=False)
    debit = Column(REAL, nullable=False)
    share = Column(REAL)

    __table_args__ = (
        PrimaryKeyConstraint('expense_id', 'user_id'),
        ForeignKeyConstraint(['user_id'], ['user.user_id'])
    )