import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  register(username: string, name: string, pwHash: string) {
    return this.http.post(this.apiUrl + '/signup', { username, name, pwHash });
  }
}
