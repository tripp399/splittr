import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';
import { ModelMapper } from '../_helpers/model-mapper';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGroup(id: any): Observable<Group> {
    // const options = { params: new HttpParams().set('id', id.toString()) };
    return this.http.get<Group>(this.apiUrl + '/group/' + id)
      .pipe(
        map(response => new ModelMapper(Group).map(response))
      );
  }

  createGroup(name: string, members: User[]): Observable<string> {
    // TODO: FIX TO ADD CURRENT USER TO MEMBERS BEFORE CALLING METHOD
    members.push(this.authService.currentUserValue);

    return this.http.put<string>(this.apiUrl + '/groups', { name, members });
  }

  // createGroup(name: string, members: User[]): Observable<Group> {
  //   // TODO: FIX TO ADD CURRENT USER TO MEMBERS BEFORE CALLING METHOD
  //   members.push(this.authService.currentUserValue);

  //   return this.http.put<Group>(this.apiUrl + '/groups', { name, members })
  //     .pipe(
  //       map(response => {
  //         const group = new ModelMapper(Group).map(response);
  //         console.log(group);
  //         this.authService.addGroupToCurrentUser(group);
  //         return group;
  //       })
  //     );
  // }

  getUserGroups(userid: number): Observable<Group[]> {
    const options = { params: new HttpParams().set('userid', userid.toString()) };
    return this.http.get<Group[]>(this.apiUrl + '/groups', options)
      .pipe(
        map(response =>
          response.map((item) =>
            new ModelMapper(Group).map(item))
        )
      );
  }

  getGroupMembers(id): Observable<User[]> {
    const options = { params: new HttpParams().set('groupid', id.toString()) };
    return this.http.get<User[]>(this.apiUrl + '/group/members', options)
      .pipe(
        map(response =>
          response.map((item) => {
            return new ModelMapper(User).map(item);
          })
        )
      );
  }

  getGroupExpenses(id): Observable<Expense[]> {
    const options = { params: new HttpParams().set('groupid', id.toString()) };
    return this.http.get<Expense[]>(this.apiUrl + '/group/expenses', options)
      .pipe(
        map(response =>
          response.map((item) => {
            return new ModelMapper(Expense).map(item);
          })
        )
      );
  }

  createGroupExpense(expense: Expense): Observable<Expense> {
    const data = JSON.stringify(expense.toCustomObj());
    return this.http.put<Expense>(this.apiUrl + '/group/expenses', data)
      .pipe(
        map(response => new ModelMapper(Expense).map(response))
      );
  }

}
