from flask_restful import Resource
from api.view_methods.group_views_methods import GroupViewsMethods

def add_resource(api):
    api.add_resource(CreateGroup, '/newgroup')

class CreateGroup(GroupViewsMethods, Resource):
    def put(self):
        return self.create_group()