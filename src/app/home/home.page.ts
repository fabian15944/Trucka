import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  trailer: any;
  preguntas: any;
  posicion = 0;
  terminado=false;
  TomarFoto = false;
  HabilitarSiguiente= true;
  constructor(private camera: Camera, private routerActivated: ActivatedRoute) {  
    this.trailer =  this.routerActivated.snapshot.queryParams.trailer;


    this.preguntas = [{
      articulo: 'Parabrisas',
      tiene: '',
      respuesta: '',
      comentario: '',
      estado: '',
      imagen: ''
      
    },
    {
      articulo: 'Faro izquierdo',
      tiene: '',
      respuesta: '',
      comentario: '',
      estado: '',
      imagen: ''
    },
    {
      articulo: 'Antena',
      tiene: '',
      respuesta: '',
      comentario: '',
      estado: '',
      imagen: ''
    },
    {
      articulo: 'Retrovisor',
      tiene: '',
      respuesta: '',
      comentario: '',
      estado: '',
      imagen: ''
    }]
  }

  siguiente( ){
    let tope = this.preguntas.length - 1;
    console.log(tope);

    if(this.posicion === tope){
    console.log('1')
    this.terminado = true;
    }else{
      console.log('2')



      this.posicion = this.posicion + 1;
      this.HabilitarSiguiente = true;

    }
  }
  ngOnInit(){
    console.log(this.trailer)
  }
  anterior(){
    this.posicion = this.posicion - 1;
    console.log(this.posicion)
  }
  enviar(){
    console.log(this.preguntas);
  }
  checarOpcion(){
    console.log('hola');
    if(this.preguntas[this.posicion].tiene === 'false'){
      this.HabilitarSiguiente = false;
    }
  }
  checarRespuesta(){
    console.log('hola');
    if(this.preguntas[this.posicion].respuesta === '1'){
      this.HabilitarSiguiente = false;
    }
  }
  checarEstado(){
    console.log('hola');
    if(this.preguntas[this.posicion].estado){
      this.HabilitarSiguiente = false;
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
      this.preguntas[this.posicion].imagen = 'data:image/jpeg;base64,' + imageData;
      //this.imagenes.push(this.base64Image);
    }, (err) => {
      console.log(err);
    });
    //this.longitudImagenes = this.imagenes.length;
  
  }


}
