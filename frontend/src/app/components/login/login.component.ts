import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  test: string = 'just a test';

  constructor(private auth: AuthService) { }

  ngOnInit() {
    console.log(this.auth.test());
  }

}
