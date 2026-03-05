import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  noticias:any[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){

    this.noticiasService.obtenerNoticias().subscribe(data=>{
      this.noticias = data;
      console.log(this.noticias);
    });

  }

}