// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { UserService } from './user/user.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//     constructor(private userService: UserService) { }
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         return this.userService.isLogged === route.data.isLogged;
//     }
// // tslint:disable-next-line: eofline
// }
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './shared/services/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public afAuth: AngularFireAuth,
        public userService: UserService,
        private router: Router
    ) { }

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser()
                .then(user => {
                    this.router.navigate(['/user']);
                    return resolve(false);
                }, err => {
                    return resolve(true);
                });
        });
    }
}
