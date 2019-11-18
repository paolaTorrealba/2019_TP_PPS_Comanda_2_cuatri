import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private dataService: DataService
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

  getAllUsers(collection){
    return this.dataService.getAll(collection);
  }

  update(collection: string, id:string, object:any) {
    return this.dataService.update(collection, id, object);
  }

  deleteDocument(collection: string, id: string) {
    return this.dataService.deleteDocument(collection, id);
  }
}
