import { Component } from '@angular/core';
import { NoticiasService } from '../services/noticias';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  titulo = "";
  fecha = "";
  descripcion = "";

  constructor(private noticiasService: NoticiasService) {}

  guardarNoticia(){

    const nuevaNoticia = {
      titulo: this.titulo,
      fecha: this.fecha,
      descripcion: this.descripcion
    };

    this.noticiasService.agregarNoticia(nuevaNoticia);

    this.titulo = "";
    this.fecha = "";
    this.descripcion = "";

  }

}