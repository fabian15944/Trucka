import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ArticulosService} from '../Services/articulos.service'
 import { ModalController, AlertController, Platform } from '@ionic/angular';
import { ReporteService } from '../Services/reporte.service';

//storage

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  trailer: any;
  @Input() conductor;
  posicion = 0;
  terminado=false;
  TomarFoto = false;
  HabilitarSiguiente= true;

  articulo: any;
  reporte: any;
  
  
  constructor(private camera: Camera,
     private routerActivated: ActivatedRoute,
     public http:HttpClient,
     public servicioarticulos: ArticulosService,
     public servicioreportes: ReporteService,

 
    private alertCtrl: AlertController, 
    // private plt: Platform
    ) {  
      
    this.trailer =  this.routerActivated.snapshot.queryParams.trailer;
    this.articulo = [] 
    this.reporte = [];
  }

  siguiente(){
     let tope = this.reporte.length - 1;
     console.log(tope);
    if(this.posicion === tope){
    console.log('1')
    this.terminado = true;
    }else{
      console.log('2')

      if(this.reporte[this.posicion].estado === 'Dañado'){
      if(this.reporte[this.posicion].valor === ''){
        this.alertNull('Falta el valor del daño')

      }
      else{
      if(this.reporte[this.posicion].imagen === ''){
        this.alertNull('Falta la imegen')
      }
      else{
        if(this.reporte[this.posicion].comentario === ''){
          this.alertNull('Falta el comentario')

        }
        else{
          this.posicion = this.posicion + 1;
          this.HabilitarSiguiente = true;
        }
      }
     }

      }else{
      this.posicion = this.posicion + 1;
      this.HabilitarSiguiente = true;
      }
    }
  }

  editarArray(){
     for(let art of this.articulo.recordset){
        let articulo = {
          id: art.id,
           nombre: art.nombre,
           num_piezas: art.num_piezas,
           ubicacion: art.ubicacion,
           valor: '',
           comentario: '',
           imagen: '',
           estado: ''
        }
        this.reporte.push(articulo);
     }
     console.log(this.reporte);
  }
  ngOnInit(){
    // this.plt.ready().then(() => {
    //   this.loadData(true);
    // });
    console.log(this.trailer);
    this.GetArticulos(true);
    
  }
  GetArticulos(refresh = false, refresher?){
    this.servicioarticulos.getArticulos(refresh).then(
      (Data)=>{
        this.articulo = this.servicioarticulos.articulo;
      //  console.log('Imprimeinrdo Data',Data)
        this.editarArray();
        // this.terminado = false;
        if (refresher) {
               refresher.target.complete();
            }
      }, (error) => {
        console.error('Entro a error', error);
      }
    )
  }
  // loadData(refresh = false, refresher?) {
  //   this.servicioarticulos.getArticulos(refresh).subscribe(Data => {
  //     this.articulo = Data;
  //     if (refresher) {
  //       refresher.target.complete();
  //     }
  //   });
  // }
 
  anterior(){
    this.posicion = this.posicion - 1;
    console.log(this.posicion)
  }
  enviar(){
    console.log(this.reporte);
    this.servicioreportes.postReporte(this.trailer,'fabian','ags','encargado',this.reporte);
  }
 

   checarEstado(){
     
     console.log(this.reporte[this.posicion].estado);
     if(this.reporte[this.posicion].estado === 'Buen Estado' || this.reporte[this.posicion].estado === 'No Existe'){
       this.reporte[this.posicion].valor = '';
       this.reporte[this.posicion].comentario = '';
       this.reporte[this.posicion].imagen = '';


       console.log('buen estados')
      this.HabilitarSiguiente = false;
    }else {
     
    }
   }




  async hacerFoto() {
    
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    const result = await this.camera.getPicture(options).then((imageData) => {
      /*this.preguntas[this.posicion].push({
      imagen: 'data:image/jpeg;base64,' + imageData
      });  */
      this.reporte[this.posicion].imagen = 'data:image/jpeg;base64,' + imageData;
      //this.imagenes.push(this.base64Image);
    }, (err) => {
      console.log(err);
    });
    //this.longitudImagenes = this.imagenes.length;
  
  }

  
  async alertNull(mensaje){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '!Atencion¡',
      message: mensaje,
      buttons: [
          {
            text: 'ok',
            role: 'cancel',
            handler: (blah) =>{
              console.log('seguir editando');
            }

          }]
    });
    await alert.present();
    }


}
