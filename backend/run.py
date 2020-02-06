from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from api.config import Config
from api.database import db
from api.models import User

app = Flask('splittr')
app.config.from_object(Config)
api = Api(app)
db.init_app(app)

migrate = Migrate(app, db)

CORS(app, origins='*')

from api.register_views import register_views

register_views(app, api)

if __name__ == '__main__':
    app.run(debug=True)