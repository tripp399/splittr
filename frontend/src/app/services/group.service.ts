import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';
import { ModelMapper } from '../_helpers/model-mapper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createGroup(name: string, members: User[]): Observable<Group> {
    return this.http.put<Group>(this.apiUrl + '/newgroup', { name, members })
      .pipe(
        map(response => {
          const group = new ModelMapper(Group).map(response);
          console.log(group);
          this.authService.addGroupToCurrentUser(group);
          return group;
        })
      );
  }
}
