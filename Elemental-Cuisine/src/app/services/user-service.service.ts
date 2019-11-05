import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";


export class user {
  id: string;
  email: string;
  perfil: string;   
  estado:boolean;
  nombre:string;
  dni: string;
  apellido:string;
  foto:string;
}

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
