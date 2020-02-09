import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { User } from 'src/app/models/user';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationServce: AuthService) {
    this.currentUser = this.authenticationServce.currentUserValue;
  }

  ngOnInit() {
    this.authenticationServce.currentUser.subscribe(
      currentUser => this.currentUser = currentUser
    );
  }

}
