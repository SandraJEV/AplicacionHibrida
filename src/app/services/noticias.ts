import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private noticiasCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.noticiasCollection = this.firestore.collection('noticias');
  }

  obtenerNoticias(){
    return this.noticiasCollection.valueChanges({ idField: 'id' });
  }

  agregarNoticia(data:any){
    return this.noticiasCollection.add(data);
  }

  eliminarNoticia(id: string) {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'noticias', id);
      return deleteDoc(docRef);
    } catch (error) {
      console.error('Error en eliminarNoticia:', error);
      throw error;
    }
  }

}