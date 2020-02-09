import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  modalToggle: boolean = false;
  searchResult: any;

  constructor(private authenticationService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    console.log('logging out');
    this.authenticationService.logout();
    this.router.navigate(['/landing']);
  }

  toggleModal() {
    this.modalToggle = !this.modalToggle;
  }

  receiveValue($event) {
    this.searchResult = $event;
    console.log('search result');
    console.log(this.searchResult);
  }

}
