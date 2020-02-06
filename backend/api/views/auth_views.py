from flask_restful import Resource
from api.view_methods.auth_views_methods import AuthViewsMethods

def add_resource(api):
    # todo
    api.add_resource(Login, '/login')
    api.add_resource(Signup, '/signup')

class Login(AuthViewsMethods, Resource):
    def post(self):
        return self.login()

class Signup(AuthViewsMethods, Resource):
    def post(self):
        return self.signup()