from flask import Flask

from api.views import (
    auth_views
)
from flask import (
    jsonify, request, Response
)
from api.errors.api_exceptions import APIException

def add_resource(api):
    auth_views.add_resource(api)

def register_views(app: Flask, api):
    add_resource(api)

    # @app.errorhandler(Exception)
    def error_handler(error: Exception):
        return Response("Backend Error", 500)

    # @app.errorhandler(APIException)
    # @app.errorhandler(401)
    def handle_api_exception(error: APIException):
        print('**********************************')
        response = jsonify(error.to_dict)
        response.status_code = error.status_code
        print('@@@@', response)
        return response

    app.register_error_handler(Exception, error_handler)
    app.register_error_handler(401, handle_api_exception)