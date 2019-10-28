import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router) { }

  logIn(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(err => rejected(err))
    });
  }

  logOut() {
    this.AFauth.auth.signOut().then(auth => {
      this.router.navigate(['/login']);
    })
  }

  // isLogged() {
  //   this.AFauth.authState.pipe(map(auth => {
  //     if (isNullOrUndefined(auth)) {
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }));
  // }

}