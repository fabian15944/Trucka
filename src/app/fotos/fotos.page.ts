import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {
  url = environment.urlbackend;
  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay:true,
    
  };
  busqueda;
  @Input() foto;
  @Input() foto2;
  @Input() foto3;
  imagenes: any;


 
   constructor( private modalController: ModalController, public loadingController: LoadingController) {  this.imagenes = [];}



   async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor Espere...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
    this.imagenes = [this.foto,this.foto2,this.foto3]; 
    console.log(this.imagenes)
    
  }

  ngOnInit() {
    this.presentLoading()
  }

  salir(){
this.modalController.dismiss();
  }

}
