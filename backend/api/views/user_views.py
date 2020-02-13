from flask_restful import Resource
from api.view_methods.user_views_methods import UserViewsMethods


def add_resource(api):
    api.add_resource(UserExpense, '/users/expense/<expense_id>')
    api.add_resource(UserExpenseList, '/users/expenses')
    api.add_resource(UserCredits, '/users/expenses/credits')
    api.add_resource(UserDebts, '/users/expenses/debts')
    api.add_resource(ExpenseShares, '/users/expenseshares')


class ExpenseShares(UserViewsMethods, Resource):
    def get(self):
        return self.get_expense_shares()

    def put(self):
        return self.update_expense_shares()


class UserExpense(UserViewsMethods, Resource):
    def get(self, expense_id):
        pass


class UserExpenseList(UserViewsMethods, Resource):
    def get(self):
        return self.get_user_expenses()

    def put(self):
        return self.add_expense()


class UserCredits(UserViewsMethods, Resource):
    def get(self):
        return self.get_user_credits()


class UserDebts(UserViewsMethods, Resource):
    def get(self):
        return self.get_user_debts()
