import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event, NavigationStart, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { Expense } from 'src/app/models/expense';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  userGroups: Group[];
  userDebts: [];
  userCredits: [];
  userExpenses: Expense[];
  modalExpense: Expense;
  expenseModalToggle = false;

  constructor(
    private authenticationServce: AuthService,
    private groupService: GroupService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authenticationServce.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
        console.log(this.currentUser);
        if (this.currentUser) {
          this.userGroups = Array.from(this.currentUser.groups);
          console.log(this.userGroups);
        }
      }
    );
    this.getUserGroups();
    this.getUserDebts();
    this.getUserCredits();
    this.getUserExpenses();
    this.modalExpense = new Expense();
  }

  toggleExpenseModal() {
    this.expenseModalToggle = !this.expenseModalToggle;
  }

  openExpenseModal(expense) {
    this.modalExpense = expense;
    this.getExpenseShares();

    this.toggleExpenseModal();
  }

  getUserGroups() {
    this.groupService.getUserGroups(this.currentUser.id)
      .subscribe(
        res => {
          console.log(res);
          this.userGroups = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  getUserCredits() {
    this.userService.getUserCredits(this.currentUser.id)
      .subscribe(
        res => {
          console.log(res);
          this.userCredits = res;
        },
        err => console.log(err)
      );
  }

  getUserDebts() {
    this.userService.getUserDebts(this.currentUser.id)
      .subscribe(
        res => {
          console.log(res);
          this.userDebts = res;
        },
        err => console.log(err)
      );
  }

  getUserExpenses() {
    this.userService.getUserExpenses(this.currentUser.id)
      .subscribe(
        res => {
          console.log(res);
          this.userExpenses = res;
        },
        err => console.log(err)
      );
  }

  getExpenseShares() {
    console.log(2222);
    this.userService.getExpenseShares(this.modalExpense.id)
      .subscribe(
        res => {
          console.log(res);
          if (!this.modalExpense.shareMap) {
            this.modalExpense.shareMap = new Map();
          }
          res.forEach((item) => {
            this.modalExpense.shareMap
              .set(item.ExpenseShare.user_id, { share: item.ExpenseShare.share, name: item.name, freeze: false });
          });
          console.log(this.modalExpense.shareMap);
        },
        err => console.log(err)
      );
  }

  calculateUpdatedShares(): boolean {
    let newTotal = 0;
    let unfrozenValues = 0;
    for (const value of this.modalExpense.shareMap.values()) {
      value.share = +value.share;
      newTotal += value.share;
      if (!value.freeze) {
        unfrozenValues += 1;
      }
    }
    if (newTotal === this.modalExpense.total || unfrozenValues === 0) {
      return false;
    }
    let balance = this.modalExpense.total - newTotal;
    let delta = balance / unfrozenValues;

    while (balance !== 0) {
      balance = 0;
      let count = 0;
      for (const value of this.modalExpense.shareMap.values()) {
        if (!value.freeze) {
          if (value.share < -delta) {
            balance += delta + value.share;
            value.share = 0;
            value.freeze = true;
            continue;
          }
          value.share = value.share + delta;
          count++;
        }
      }
      delta = balance / count;
    }

    for (const value of this.modalExpense.shareMap.values()) {
      value.freeze = false;
    }

  }

  updateExpense() {
    this.calculateUpdatedShares();
    this.toggleExpenseModal();

    this.modalExpense.shareMap.forEach((value, key) => {
      this.modalExpense.shareMap.set(key, value.share);
    });

    this.userService.updateExpense(this.modalExpense)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  deleteExpense(expense: Expense) {

    if (expense.payer !== this.currentUser.id) {
      console.log('Cannot delete as current User is not the creator of this expense');
      return;
    }

    this.userService.deleteExpense(expense.id)
      .subscribe(
        res => {
          console.log(res);
          const index = this.userExpenses.indexOf(expense);
          if (index !== -1) {
            this.userExpenses.splice(index, 1);
          }
        },
        err => console.log(err)
      );
  }

}
