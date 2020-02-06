import os
import yaml
import pytest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from api.run import app, db as tdb

test_db_uri = 'postgresql://myuser:mypass@localhost:5432/mydb'

@pytest.fixture
def _test_app():
    test_app = app
    test_app.testing = True
    test_app.config['SQLALCHEMY_DATABASE_URI'] = test_db_uri
    test_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    test_app.config['PROPAGATE_EXCEPTIONS'] = True
    test_app.config['TESTING'] = True
    test_app.app_context().push()
    return test_app

@pytest.fixture
def client(_test_app):
    return _test_app.test_client()

@pytest.fixture(scope="session")
def root_url():
    return "http://localhost:5000/"

@pytest.fixture(scope="session")
def db():
    return tdb

@pytest.fixture(scope="session")
def _test_db(_test_app):
    test_app = _test_app
    # test_app.config['SQLALCHEMY_DATABASE_URI'] = test_db_uri
    # test_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # test_app.config['PROPAGATE_EXCEPTIONS'] = True
    # test_app.config['TESTING'] = True
    # test_app.app_context().push()
    test_db = SQLAlchemy(test_app)
    test_db.create_all()
    yield test_db

    test_db.session.commit()
    test_db.drop_all()



@pytest.fixture
def data():
    configpath = os.path.join(os.path.dirname(__file__), "test_data.yaml")
    with open(configpath, "r") as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
        yield data