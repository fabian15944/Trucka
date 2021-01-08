import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ArticulosService} from '../Services/articulos.service'
 import { ModalController, AlertController, Platform } from '@ionic/angular';
import { ReporteService } from '../Services/reporte.service';
import { IonSlides } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';


const API_STORAGE_KEY = 'specialkey';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  trailer: any;
  Marca: any
  conductor: any;
  longitudImagenes= 0;
  date = new Date();
  posicion = 0;
  terminado=false;
  TomarFoto = false;
  HabilitarSiguiente= true;
  articulo: any;
  reporte: any;
  ubicacion:any;
  
  encargado:any;
  sucursal:any;

  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  
  
  constructor(private camera: Camera,private storage: Storage,
     private routerActivated: ActivatedRoute,
     public http:HttpClient,
     public servicioarticulos: ArticulosService,
     public servicioreportes: ReporteService,
     private router:Router,
     private plt: Platform,
 
    private alertCtrl: AlertController, 
    
    ) {  
      
    this.trailer =  this.routerActivated.snapshot.queryParams.trailer;
    this.Marca = this.routerActivated.snapshot.queryParams.Marca;
    this.conductor = this.routerActivated.snapshot.queryParams.conductor;
    this.articulo = [] 
    this.reporte = [];
    
  }

  siguiente(){
     let tope = this.reporte.length - 1;
     console.log(tope);
    
    if(this.posicion === tope){
    this.ReporteTerminado();
    this.terminado = true;

    }else{
      if(this.reporte[this.posicion].estado === 'Dañado'){
      if(this.reporte[this.posicion].valor === ''){
        this.alertNull('Selecciona el daño encontrado')

      }
      else{
      if(this.reporte[this.posicion].imagen.length === 0 ){
        this.alertNull('Falta la imagen')
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
    
  }
  ngOnInit(){
   this.GetArticulos()
   this.getLocalData('usuario');
  }
  

  private getLocalData(key) {
    // console.log('return local data!');
    try {
      return this.storage.get(`${API_STORAGE_KEY}-${key}`).then((valor) =>{
      this.encargado = valor.recordset[0].NOM_USER;
      this.sucursal = valor.recordset[0].SUCURSAL;
    //  console.log('encargado',this.encargado)
  });
    } catch (error) {
      Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: error,
            showConfirmButton: true         
          });
    }
               
  }



  GetArticulos(){
   
    this.servicioarticulos.getArticulos(this.Marca).then(
      (Data)=>{
        this.articulo = this.servicioarticulos.articulo;       
        this.editarArray();
         (error) => {
        console.error('Entro a error', error);
      }
    }
    )
  }

  anterior(){
    this.posicion = this.posicion - 1;
    this.HabilitarSiguiente = false;
  }


  enviar(){
    let EnvReporte = {
      num_unidad: this.trailer,
      Marca: this.Marca,
      operador: this.conductor,
      sucursal: this.sucursal,
      encargado: this.encargado,
      reporte: this.reporte,
      fecha: this.date
    }
    // console.log('enviar__',this.reporte)
    this.servicioreportes.postReporte(EnvReporte).subscribe();
     this.router.navigate(['/start']);
  }
 
   checarEstado(){
    this.HabilitarSiguiente = false;

    
     if(this.reporte[this.posicion].estado === 'Buen Estado' || this.reporte[this.posicion].estado === 'No Existe'){
       this.reporte[this.posicion].valor = '';
       this.reporte[this.posicion].comentario = '';
       this.reporte[this.posicion].imagen = [];  
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
    if(this.reporte[this.posicion].imagen.length === 3){
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
