import { Injectable } from '@angular/core';


import{
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,

}from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item{
  id?: string;
  name: string;
  description: string;
  createdAt: number; 
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {

   }

  getItems(): Observable<Item[]>{
    const itemsCollectionRef = collection(this.firestore, 'items');
    const q = query(itemsCollectionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, {idField: 'id'}) as Observable<Item[]>;
  }

  getItem(id: string): Observable<Item | undefined>{
    const itemDocRef = doc(this.firestore, `items/${id}`);
    return docData(itemDocRef, {idField: 'id'}) as Observable<Item | undefined>;
  }
  addItem(item: Item){
    const itemsCollectionRef = collection(this.firestore, 'items');
    return addDoc(itemsCollectionRef, {...item, creatdAt: Date.now()});
  }
  updateItem(item: Item){
    const itemDocRef = doc(this.firestore, `items/${item.id}`);
    return updateDoc(itemDocRef, {name: item.name, description: item.description});
  }
  deleteItem(id: string){
    const itemDocRef = doc(this.firestore, `items/${id}`);
    return deleteDoc(itemDocRef);
  }

}

