import json
from api.base_view import EndpointDataHandler
from api.models import User, Expense, ExpenseShare, SplitType
from api.database import db
from api.utils.response_util import *
from sqlalchemy import func


class UserViewsMethods(EndpointDataHandler):

    def add_expense(self):
        print(self.data)
        split = SplitType.from_str(self.data['split'])
        share_map = self.data['shareMap']

        with db.session.no_autoflush:
            try:
                payer = User.query.filter_by(user_id=self.data['payer']).first()
                expense = Expense(title=self.data['title'], total=self.data['total'], payer=payer.user_id, split=split)
                expense_shares = []

                for key, value in share_map.items():
                    user = User.query.filter_by(username=key).first()
                    share = ExpenseShare(share=value)
                    share.expense = expense
                    share.user = user
                    expense_shares.append(share)

                db.session.add(expense)
                for share in expense_shares:
                    db.session.add(share)
            except Exception as err:
                print(err)
                raise err

            db.session.commit()
        return expense.id, 200

    def get_user_credits(self):
        user_id = self.data['userid']

        try:
            res = Expense.query.join(ExpenseShare).join(User) \
                    .with_entities(func.sum(ExpenseShare.share).label('amount'), ExpenseShare.user_id, User.name) \
                    .filter(ExpenseShare.user_id != user_id).filter(Expense.payer == user_id) \
                    .group_by(ExpenseShare.user_id, User.name) \
                    .all()
        except Exception as err:
            print(err)
            raise err

        return map_result_to_dict(res), 200

    def get_user_debts(self):
        user_id = self.data['userid']

        try:
            res = Expense.query.join(ExpenseShare).join(User, Expense.payer == User.user_id) \
                    .with_entities(func.sum(ExpenseShare.share).label('amount'), Expense.payer, User.name) \
                    .filter(ExpenseShare.user_id == user_id).filter(Expense.payer != user_id) \
                    .group_by(Expense.payer, User.name) \
                    .all()
        except Exception as err:
            print(err)
            raise err

        return map_result_to_dict(res), 200
