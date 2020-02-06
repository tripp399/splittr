class TestAuthentication:

    base_url = 'http://localhost:5000'

    def test_incorrect_login(self, client, data):
        user = data['users']['incorrect_user']
        post_data = {'username': user['username'], 'pwHash': user['pw_hash']}
        response = client.post(self.base_url + '/login', json=post_data)
        print(response)
        assert response.status_code == 401

    def test_correct_login(self, client, data):
        user = data['users']['user1']
        post_data = {'username': user['username'], 'pwHash': user['pw_hash']}
        response = client.post(self.base_url + '/login', json=post_data)
        assert response.status_code == 200