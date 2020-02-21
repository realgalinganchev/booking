import { FirebaseService } from './../shared/services/firebase.service';
import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../error-styles.scss'],
})
export class RegisterComponent {

  registerForm: FormGroup;
   errorMessage: '';
  successMessage: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public firebaseService: FirebaseService,
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/user']);
        this.firebaseService.createFavouritesProperty(res.user.uid);
      }, err => console.log(err)
      );
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.router.navigate(['/user']);
        this.firebaseService.createFavouritesProperty(res.user.uid);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

}
