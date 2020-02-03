import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
// import * as crypto from 'crypto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    console.log(this.authenticationService.test());
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/';
  }

  login() {
    // const hash = crypto.createHash('sha256');
    // const pwHash: string = hash.update(this.loginForm.controls.password.value)
    //                         .digest('hex');

    this.authenticationService
      .login( this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            console.log(error);
      });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.login();
  }

}
