import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ArticulosService} from '../Services/articulos.service'
 import { ModalController, AlertController, Platform } from '@ionic/angular';
import { ReporteService } from '../Services/reporte.service';
import { IonSlides } from '@ionic/angular';
import Swal from 'sweetalert2';

//storage

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  trailer: any;
  Marca: any
  @Input() conductor;
  longitudImagenes= 0;
  date = new Date();
  posicion = 0;
  terminado=false;
  TomarFoto = false;
  HabilitarSiguiente= true;
  articulo: any;
  reporte: any;
  ubicacion:any;
  


  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  
  
  constructor(private camera: Camera,
     private routerActivated: ActivatedRoute,
     public http:HttpClient,
     public servicioarticulos: ArticulosService,
     public servicioreportes: ReporteService,
     private router:Router,
     private plt: Platform,
 
    private alertCtrl: AlertController, 
    // private plt: Platform
    ) {  
      
    this.trailer =  this.routerActivated.snapshot.queryParams.trailer;
    this.Marca = this.routerActivated.snapshot.queryParams.Marca
    this.articulo = [] 
    this.reporte = [];
    
  }

  siguiente(){
     let tope = this.reporte.length - 1;
     console.log(tope);
    if(this.posicion === tope){
    console.log('1')
    this.ReporteTerminado()
    this.terminado = true;

    }else{
      console.log('2')

      if(this.reporte[this.posicion].estado === 'Dañado'){
      if(this.reporte[this.posicion].valor === ''){
        this.alertNull('Falta el valor del daño')

      }
      else{
      if(this.reporte[this.posicion].imagen === []){
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
           imagen: [],
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
    
    console.log(this.Marca)
    console.log(this.trailer);
   
    this.plt.ready().then(() => {
      this.GetArticulos(true);
    });

    
  }
  
  GetArticulos(refresh = false, refresher?){
    this.servicioarticulos.getArticulos(refresh,this.Marca).then(
      (Data)=>{
        this.articulo = this.servicioarticulos.articulo;
        this.ubicacion = this.articulo.recordset[0].ubicacion
        
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
  
 
  anterior(){
    this.posicion = this.posicion - 1;
    console.log(this.posicion)
  }
  enviar(){
    console.log(this.reporte);
    this.servicioreportes.postReporte(this.trailer,this.Marca,'fabian','ags','encargado',this.reporte, this.date);
     this.router.navigate(['/start']);
  }
 

   checarEstado(){
    this.HabilitarSiguiente = false;

     console.log(this.reporte[this.posicion].estado);
     if(this.reporte[this.posicion].estado === 'Buen Estado' || this.reporte[this.posicion].estado === 'No Existe'){
       this.reporte[this.posicion].valor = '';
       this.reporte[this.posicion].comentario = '';
       this.reporte[this.posicion].imagen = [];


       console.log('buen estados')
    }
   }



   async eliminarImagen(pos){
    const alert = await this.alertCtrl.create({
      header: 'Atencion',
      message: '¿Estas seguro que quieres borrar esta imagen?',
      buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: (blah) =>{
              console.log('Seguir editando');
            }
  
          },{
            text: 'Eliminar',
            handler: (blah) =>{
              console.log('Seguir editando');
              console.log(pos);
              this.reporte[this.posicion].imagen.splice(pos, 1);
              this.longitudImagenes = this.reporte[this.posicion].imagen.length;
            }
  
          }]
    });
    await alert.present();
    
  }
  async alertaImg(){
    const alert = await this.alertCtrl.create({
      header: 'Atencion',
      message: 'El numero limite de imagenes es de 3',
      buttons: [
          ,{
            text: 'Aceptar',
            handler: (blah) =>{
              console.log('Seguir editando');
                  }
  
          }]
    });
    await alert.present();
  }
  async hacerFoto() {
    if(this.reporte[this.posicion].imagen.length === 2){
    this.alertaImg();
    }else{
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
     let img = 'data:image/jpeg;base64,' + imageData;
     this.reporte[this.posicion].imagen.push(img);
     this.longitudImagenes = this.reporte[this.posicion].imagen.length;

      //this.imagenes.push(this.base64Image);
    }, (err) => {
      console.log(err);
    });
    //this.longitudImagenes = this.imagenes.length;
    }
  }

  ReporteTerminado(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Reporte Finalizado',
      text: 'Guardando...',
      showConfirmButton: true 
    });
    this.enviar()
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
