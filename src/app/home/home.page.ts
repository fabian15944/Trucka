import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  preguntas: any;
  posicion = 0;
  terminado=false;
  TomarFoto = false;
  HabilitarSiguiente= true;
  constructor(private camera: Camera) {   

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
  anterior(){
    this.posicion = this.posicion - 1;
    console.log(this.posicion)
  }
  enviar(){
    console.log(this.preguntas);
  }
  checarOpcion(){
    console.log('hola');
    this.HabilitarSiguiente = false;
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
