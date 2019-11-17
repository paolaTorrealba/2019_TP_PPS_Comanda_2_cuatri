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

  setDocument(collection:string, id:string, object:object): void {
    this.db.collection(collection).doc(id).set(object);
  }

  getUser(userId){
    return this.db.collection('usuarios').doc(userId).get().toPromise();
  }

  getAll(collection){
    return this.db.collection(collection).valueChanges();
  }

  getAllDocuments(collection){
    return this.db.collection(collection).get();
  }

  update(collection: string, id:string, objeto:any) {
    return this.db.doc<any>(`${collection}/${id}`).update(objeto);
  }


  deleteDocument(collection: string, id: string) {
    return this.db.doc<any>(`${collection}/${id}`).delete();
}
}
