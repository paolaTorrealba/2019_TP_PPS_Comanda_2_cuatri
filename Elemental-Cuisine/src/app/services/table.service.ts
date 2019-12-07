import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private db: AngularFirestore,
    private dataService: DataService
  ) { }

  saveTable(table){
    return this.dataService.add('mesas', table);
  }

  setDocument(collection: string, id: string, object: object): void {
    this.db.collection(collection).doc(id).set(object);
  }
  
  getAllTables(collection){
    return this.dataService.getAll(collection);
  }
  
  updateTable(collection: string, id: string, object: any) {
    return this.dataService.update(collection, id, object);
  }


  deleteTable(tableId){
    this.dataService.deleteDocument('mesas', tableId);
  }

  getTableById(tableId){
    return this.dataService.getOne('mesas', tableId);
  }
}
