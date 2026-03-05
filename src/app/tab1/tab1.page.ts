import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NoticiasService } from '../services/noticias';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit, OnDestroy {

  noticias:any[] = [];
  private subscription: Subscription | undefined;

  constructor(
    private noticiasService: NoticiasService,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  ionViewWillEnter(){
    this.cargarNoticias();
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  cargarNoticias(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }

    this.subscription = this.noticiasService.obtenerNoticias().subscribe(data=>{
      this.noticias = data;
      this.cdr.detectChanges();
      console.log(this.noticias);
    });
  }

  async eliminarNoticia(index: number) {
    const noticia = this.noticias[index];
    console.log('Eliminando noticia con id:', noticia.id);

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta noticia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              await this.noticiasService.eliminarNoticia(noticia.id);
              console.log('Noticia eliminada correctamente de Firebase');
            } catch (error) {
              console.error('Error al eliminar noticia:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}