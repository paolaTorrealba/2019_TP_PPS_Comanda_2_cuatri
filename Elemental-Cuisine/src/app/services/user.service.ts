import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ){}

  saveUser(user) {
    return this.authService.createUser(user).then(createdUser => {
      user.id = createdUser.user.uid;
      this.db.collection('usuarios').doc(user.id).set(Object.assign({}, user));
    })
  }

  getUser(userId){
    return this.db.collection('usuarios').doc(userId).get().toPromise();
  }

  getAllUsers(){
    return this.db.collection('usuarios').valueChanges();
  }
   
}
