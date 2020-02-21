import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from './user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  currentUserEmail: string;
  customersUid: string;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.customersUid = firebase.auth().currentUser.uid;
    this.currentUserEmail = firebase.auth().currentUser.email;
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
