import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'https://localhost';

  constructor(private http: HttpClient) { }

  register(username: string, pwHash: string) {
    return this.http.post(this.apiUrl + '/users/register', { username, pwHash });
  }
}
