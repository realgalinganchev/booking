import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../error-styles.scss']
})
export class LoginComponent {

  emailRegex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}');
  loginForm: FormGroup;
  errorMessage: '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService,
  ) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/user']);
      });
  }
  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/user']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

}
