import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ModelMapper } from '../_helpers/model-mapper';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  register(username: string, name: string, pwHash: string) {
    return this.http.post(this.apiUrl + '/signup', { username, name, pwHash });
  }

  getUsersByName(filter: { name: string }): Observable<User[]> {
    if (!filter.name) {
      return of([]);
    }
    const options = { params: new HttpParams().set('name', filter.name) };
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

  addExpense(expense: Expense) {
    const data = JSON.stringify(expense.toCustomObj());
    return this.http.put<number>(this.apiUrl + '/users/expenses', data);
    // .pipe(
    //   map(response => new ModelMapper(Expense).map(response))
    // );
  }

  getUserExpenses(userId): Observable<Expense[]> {
    const options = { params: new HttpParams().set('userid', userId) };
    return this.http.get<Expense[]>(this.apiUrl + '/users/expenses', options)
      .pipe(
        map(response => {
          console.log(response)
          response = response.map((item) => {
            return new ModelMapper(Expense).map(item);
          });
          return response;
        })
      );
  }

  getUserCredits(userId) {
    const options = { params: new HttpParams().set('userid', userId) };
    return this.http.get<[]>(this.apiUrl + '/users/expenses/credits', options);
  }


  getUserDebts(userId) {
    const options = { params: new HttpParams().set('userid', userId) };
    return this.http.get<[]>(this.apiUrl + '/users/expenses/debts', options);
  }

  getExpenseShares(id: number) {
    const options = { params: new HttpParams().set('expenseid', id.toString()) };
    return this.http.get<any[]>(this.apiUrl + '/users/expenseshares', options);
  }

  updateExpense(expense: Expense) {
    const data = JSON.stringify(expense.toCustomObj());
    return this.http.put<Expense>(this.apiUrl + '/users/expenseshares', data);
  }

}
