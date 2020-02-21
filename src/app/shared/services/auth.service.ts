import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

    constructor(
        public afAuth: AngularFireAuth,

    ) { }

    doFacebookLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.FacebookAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }


    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.passwords.password)
                .then(res => {
                 resolve(res);
                }, err => reject(err));
        });
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err));
        });
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut();
                resolve();
            } else {
                reject();
            }
        });
    }


}
