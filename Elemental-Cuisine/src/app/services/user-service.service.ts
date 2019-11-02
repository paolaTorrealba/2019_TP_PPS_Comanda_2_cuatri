import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(
    private db: AngularFirestore,
    private afsAuth: AngularFireAuth){}

  guardarUsuario(data) {
    return this.db.collection('usuarios').add(data);
  }
   
}
