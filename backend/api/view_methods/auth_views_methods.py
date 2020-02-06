from api.base_view import EndpointDataHandler

class AuthViewsMethods(EndpointDataHandler):
    
    def login(self):
        username = self.data['username']
        pwHash = self.data['pwHash']
        pass

    def signup(self):
        # todo
        pass