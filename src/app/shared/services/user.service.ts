// import { Injectable } from '@angular/core';
// import { of } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   currentUser: { email: string; password: string } = null;

//   get isLogged() {
//     return !!this.currentUser;
//   }

//   constructor() {
//     const currentUser = localStorage.getItem('current-user');
//     this.currentUser = currentUser ? JSON.parse(currentUser) : null;
//   }

//   login(email: string, password: string) {
//     localStorage.setItem('current-user', JSON.stringify({ email, password }));
//     this.currentUser = { email, password };
//   }

//   logout() {
//     this.currentUser = null;
//     localStorage.removeItem('current-user');
//   }
// }
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
 ) {
 }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line: no-shadowed-variable
      const user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);

        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
}
