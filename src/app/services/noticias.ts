import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private noticiasCollection;

  constructor(private firestore: AngularFirestore) {
    // create the collection reference during construction (an injection context)
    this.noticiasCollection = this.firestore.collection('noticias');
  }

  obtenerNoticias(){
    return this.noticiasCollection.valueChanges({ idField: 'id' });
  }

  agregarNoticia(data:any){
    return this.noticiasCollection.add(data);
  }

  eliminarNoticia(id:string){
    return this.noticiasCollection.doc(id).delete();
  }

}