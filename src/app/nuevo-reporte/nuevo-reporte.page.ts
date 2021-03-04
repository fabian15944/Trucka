import { Component, Input, OnInit, ViewChild } from '@angular/core';
 import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ArticulosService } from '../Services/articulos.service'
import { ModalController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { ReporteService } from '../Services/reporte.service';
import { IonSlides } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
// import { Plugins, CameraResultType } from '@capacitor/core';

import * as moment from 'moment';


const API_STORAGE_KEY = 'specialkey';
// const {Camera} = Plugins;

@Component({
  selector: 'app-nuevo-reporte',
  templateUrl: './nuevo-reporte.page.html',
  styleUrls: ['./nuevo-reporte.page.scss'],
})
export class NuevoReportePage implements OnInit {
  trailer: any;
  Marca: any
  conductor: any;
  longitudImagenes = 0;
  posicion = 0;
  terminado = false;
  TomarFoto = false;
  articulo: any;
  reporte: any;
  ubicacion: any;
  encargado: any;
  sucursal: any;

  primera = false;

  fechaM = moment().format('DD/MM/YYYY HH:mm')

  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 600,
    slidesPerView: 1,
    autoplay:true
  };


  constructor(
     private camera: Camera,
    private storage: Storage,
    private routerActivated: ActivatedRoute,
    public http: HttpClient,
    public servicioarticulos: ArticulosService,
    public servicioreportes: ReporteService,
    private router: Router,
    private plt: Platform,
    private alertCtrl: AlertController,
    public loadingController: LoadingController
  ) {

    this.trailer = this.routerActivated.snapshot.queryParams.trailer;
    this.Marca = this.routerActivated.snapshot.queryParams.Marca;
    this.conductor = this.routerActivated.snapshot.queryParams.conductor;
    this.articulo = []
    this.reporte = [];

  }
// se manda llamar al momento de avanzar al nuevo articulo antes de moverte hace algunas validaciones
  siguiente() {  
  
    let tope = this.reporte.length - 1;
    if (this.posicion === tope) {
      this.ReporteTerminado();
      this.terminado = true;

    } if (this.reporte[this.posicion].estado === ''){
      this.alertNull('Aun no has seleccionado el estado');
    }
    else {
      
      if (this.reporte[this.posicion].estado === 'Dañado') {
        if (this.reporte[this.posicion].valor === '') {
          this.alertNull('Selecciona el daño encontrado')

        }
        else {
          if (this.reporte[this.posicion].imagen.length === 0) {
            this.alertNull('Falta la imagen')
          }
          else {
            if (this.reporte[this.posicion].comentario === '') {
              this.alertNull('Falta el comentario')

            }
            else {
              this.posicion = this.posicion + 1;
            
            }
          }
        }

      } else {
        this.posicion = this.posicion + 1;
      }
    }
  }

  //Una funcion la cual va generando un nuevo array el cual se va a mandar en el reporte
  editarArray() {
    for (let art of this.articulo.recordset) {
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
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.primera= true;
  }
  //NgOnInit todo lo que metas dentro de esta funcion se ejecutara primero
  ngOnInit() {
    this.GetArticulos() 
    this.getLocalData('usuario');
    this.presentLoading()
    console.log(this.fechaM )
    console.log(this.trailer);

  }

// con esta funcion obtengo los datos almacenados en el storage  y le paso la key
  private getLocalData(key) {
    
    try {
      return this.storage.get(`${API_STORAGE_KEY}-${key}`).then((valor) => {
        this.encargado = valor.recordset[0].NOM_USER;
        this.sucursal = valor.recordset[0].SUCURSAL;
       
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


// mando llamar un componente de los servicios y despues me trae todos los articulos que hay en la base de datos
  GetArticulos() {
    this.servicioarticulos.getArticulos(this.Marca).then(
      (Data) => {
        this.articulo = this.servicioarticulos.articulo;
        this.editarArray(); 
        (error) => {
          console.error('Entro a error', error);
        }
      }
    )
    
  }
// funcion para retroceder entre los articulos
  anterior() {
    this.posicion = this.posicion - 1;
   
  }

// manda la variable EnvReporte al backend que contiene todos los datos del reporte
  enviar() {
    console.log('conosle_reporte',this.reporte)
    let EnvReporte = {
      num_unidad: this.trailer,
      Marca: this.Marca,
      operador: this.conductor,
      sucursal: this.sucursal,
      encargado: this.encargado,
      reporte: this.reporte,
      fecha: this.fechaM 
    } 
   
    this.servicioreportes.postReporte(EnvReporte).subscribe();
    this.router.navigate(['/busqueda']);
  }
// se ejecuta cuando es buen estado o no existe es la primer funcion que entra y verifica los estados
  checarEstado() {
 
    if (this.reporte[this.posicion].estado === 'Buen Estado' || this.reporte[this.posicion].estado === 'No Existe') {
      this.reporte[this.posicion].valor = '';
      this.reporte[this.posicion].comentario = '';
      this.reporte[this.posicion].imagen = [];
    }
  }


// funcion para eliminar la imagen le paso la posicion de la imagen en la variable pos
  async eliminarImagen(pos) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: '¿Estas seguro que quieres borrar esta imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
           
          }

        }, {
          text: 'Eliminar',
          handler: (blah) => {
          
            this.reporte[this.posicion].imagen.splice(pos, 1);
            this.longitudImagenes = this.reporte[this.posicion].imagen.length;
          }

        }]
    });
    await alert.present();

  }

  // alerta que se dispara cuando se quiere tomar mas de 3 imagenes
  async alertaImg() {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: 'El numero limite de imagenes es de 3',
      buttons: [
        , {
          text: 'Aceptar',
          handler: (blah) => {
          
          }

        }]
    });
    await alert.present();
  }


// hacer foto con cordova funciona solo para general el apk
  async hacerFoto() {
    if (this.reporte[this.posicion].imagen.length === 3) {
      this.alertaImg();
    } else {
      const options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      const result = await this.camera.getPicture(options).then((imageData) => {
        let img = 'data:image/jpeg;base64,' + imageData;
        this.reporte[this.posicion].imagen.push(img);
        this.longitudImagenes = this.reporte[this.posicion].imagen.length;
      }, (err) => {
        console.log(err);
      });
    }
  }


// hacer foto con capacitor funciona solo para generar una version web o una pwa
//    async  hacerFoto() {
//     if(this.reporte[this.posicion].imagen.length === 3){
//         this.alertaImg();
//         }else{
//     const images = {
//       quality: 90,
//        allowEditing: true,
//         resultType: CameraResultType.Base64,
//     }
//     await  Camera.getPhoto(images).then(imgdata => {
//       let img = 'data:image/jpeg;base64,' + imgdata.base64String

//       this.reporte[this.posicion].imagen.push(img);
      
//       this.longitudImagenes = this.reporte[this.posicion].imagen.length;

//     }, (err) => {
//           console.log(err);
//         });
//   }
//  }

// alerta que se disparan cuando finaliza el reporte 
  ReporteTerminado() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Reporte Finalizado',
      text: 'Guardando...',
      showConfirmButton: true
    });
    this.enviar()
  }


  async alertNull(mensaje) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '!Atención',
      message: mensaje,
      buttons: [
        {
          text: 'ok',
          role: 'cancel',
          handler: (blah) => {
           
          }

        }]
    });
    await alert.present();
  }


}


