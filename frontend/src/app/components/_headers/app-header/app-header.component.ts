import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  currentUser: User;
  modalToggle = false;
  searchResult: User;
  groupName: FormControl;
  groupUsers = new Set<User>();

  constructor(
    private router: Router, private authenticationService: AuthService,
    private groupService: GroupService
  ) {
    this.groupName = new FormControl();
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      currentUser => this.currentUser = currentUser
    );
  }

  logout() {
    console.log('logging out');
    this.authenticationService.logout();
    this.router.navigate(['/landing']);
  }

  toggleModal() {
    this.modalToggle = !this.modalToggle;
    this.groupUsers.clear();
  }

  receiveValue($event) {
    this.searchResult = $event;
  }

  addUserToCreateGroup() {
    this.groupUsers.add(this.searchResult);
  }

  createGroup() {
    // this.groupUsers.add(this.currentUser);
    this.groupService.createGroup(this.groupName.value, Array.from(this.groupUsers))
      .subscribe(
        res => {
          // this.authenticationService.addGroupToCurrentUser(res);
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    this.modalToggle = false;
  }


}
