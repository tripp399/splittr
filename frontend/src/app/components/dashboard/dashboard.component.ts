import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { User } from 'src/app/models/user';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  userGroups: Group[];

  constructor(private authenticationServce: AuthService) { }

  ngOnInit() {
    this.authenticationServce.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
        console.log(this.currentUser);
        this.userGroups = Array.from(this.currentUser.groups);
        console.log(this.userGroups);
      }
    );
  }

}
