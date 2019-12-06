import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    // private userService: UserService
  ) { }

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

  getCurrentUser() {
    return this.AFauth.auth.currentUser;
  }

  createUser(user) {
    return this.AFauth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async googleSigin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.AFauth.auth.signInWithPopup(provider);
    return credential.user;
  }

  async facebookSigin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.AFauth.auth.signInWithPopup(provider);
    return credential.user;
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