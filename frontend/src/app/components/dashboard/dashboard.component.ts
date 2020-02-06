import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationServce: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    console.log('logging out');
    this.authenticationServce.logout();
    this.router.navigate(['/login']);
  }

}
