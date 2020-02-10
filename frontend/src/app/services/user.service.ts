import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ModelMapper } from '../_helpers/model-mapper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  register(username: string, name: string, pwHash: string) {
    return this.http.post(this.apiUrl + '/signup', { username, name, pwHash });
  }

  getUsersByName(filter: {name: string}): Observable<User[]> {
    if (!filter.name) {
      return of([]);
    }
    const options = { params: new HttpParams().set('name', filter.name)};
    return this.http.get<User[]>(this.apiUrl + '/users', options)
      .pipe(
        map(response => {
          response = response.map((item) => {
            return new ModelMapper(User).map(item);
          });
          response = response.filter(user => {
            return user.id !== this.authService.currentUserValue.id;
           });
          return response;
        })
      );
  }

  getUserExpenses() {}
}
