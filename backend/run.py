from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask('splittr')
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)