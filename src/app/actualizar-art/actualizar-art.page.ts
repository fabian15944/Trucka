import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AdministracionService } from '../Services/administracion.service';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Plugins, CameraResultType, CameraOptions, CameraSource } from '@capacitor/core';


const {Camera} = Plugins;

@Component({
  selector: 'app-actualizar-art',
  templateUrl: './actualizar-art.page.html',
  styleUrls: ['./actualizar-art.page.scss'],
})
export class ActualizarArtPage implements OnInit {
  @Input() nombre;
  @Input() Marca;
  @Input() Ubicacion;
  @Input() tipo_estado;
  @Input() id;
  @Input() foto;

  valor1: any;
  valor2: any;
  valor3: any;
  valor4: any;

  estado_tipos: any;
  tipo: any;
  tipo1: any;
  tipo2: any;
id_Tipo_estado:any;
 
  arraytipos: any;
  Tipo: any;
  primera = false;
  base64Image: any;
  
  img: any;
  constructor(public loadingController: LoadingController,
    private modalController: ModalController,
    private tiposestado: AdministracionService,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    // private camera: Camera
  ) {
this.img = '';
    this.estado_tipos = [];
    this.arraytipos = [];
   
  // this.imagen = [];
  // this.img ='';
    // tipoEstado=
  }

  ngOnInit() {
    this.estado_tipo();

    console.log(this.nombre)
    // this.tipos()
    console.log(this.Marca)
    console.log(this.Ubicacion)
    // console.log(this.tipo_estado)
    console.log(this.id);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Completar accion con',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          console.log('Share clicked');
           this.hacerFoto();
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          console.log('Favorite clicked');
          this.fotoGaleria();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async eliminarImagen() {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: '¿Seguro que quieres borrar esta imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
           
          }

        }, {
          text: 'Eliminar',
          handler: (blah) => {
            this.img = '';
            (<HTMLInputElement>document.getElementById('img')).src =`assets/${this.foto}.png`;
            // this.reporte[this.posicion].imagen.splice(pos, 1);
            // this.longitudImagenes = this.reporte[this.posicion].imagen.length;
          }

        }]
    });
    await alert.present();

  }

  
  async quitarImagen(){
    this.img = '';
    (<HTMLInputElement>document.getElementById('img')).src = 'assets/images/mp-image.png';
  
  }

// hacer foto con capacitor funciona solo para generar una version web o una pwa
async  hacerFoto() {
  const images = { 
    quality: 90,
     allowEditing: true,
      resultType: CameraResultType.Base64,
  }
  await  Camera.getPhoto(images).then(imgdata => {
    this.img = 'data:image/jpeg;base64,' + imgdata.base64String;
  (<HTMLInputElement>document.getElementById('img')).src = this.img;
  // this.foto1 = false;
  // this.imagen = img
  // this.imagen.push(img);
  }, 
   (err) => {
        console.log(err); 
      });
    

}
async  fotoGaleria() {
  const images: CameraOptions = {
    quality: 90,
    allowEditing: true,
     resultType: CameraResultType.Base64, 
      
  }
  await  Camera.getPhoto(images).then(imgdata => {
    this.img = 'data:image/jpeg;base64,' + imgdata.base64String;
// this.foto = '';
    (<HTMLInputElement>document.getElementById('img')).src = this.img;
    

  }, 
   (err) => {
        console.log(err);
      });
    

}





 


  Guardar() {
    if(this.img === ''){
      // console.log(this.nombre, this.Marca, this.Ubicacion, this.id, this.foto,this.img,this.id_Tipo_estado)
        this.tiposestado.put_articulo(this.nombre, this.Marca, this.Ubicacion, this.id, this.img,this.id_Tipo_estado,this.foto)

    this.salir()
    }else{
      // this.foto = '';
    //  console.log(this.nombre, this.Marca, this.Ubicacion, this.id,this.foto, this.img,this.id_Tipo_estado)
     this.tiposestado.put_articulo(this.nombre, this.Marca, this.Ubicacion, this.id, this.img,this.id_Tipo_estado,this.foto)
    this.salir()
    }
 
    
 
  }

  estado_tipo() {
   
    this.tiposestado.Get_tipos_estado().then(res => {
      this.estado_tipos = this.tiposestado.tipo_de_estado
     
      for (let tipo of this.estado_tipos.recordset) {
        console.log(tipo);
        if (tipo.Tipo_estado === this.tipo_estado) {
          console.log('esta ' + tipo);
          this.id_Tipo_estado = tipo.id
          this.valor1 = tipo.valor1;
          this.valor2 = tipo.valor2;
          this.valor3 = tipo.valor3;
          this.valor4 = tipo.valor4;
        }
      }

      console.log('tipo', this.estado_tipos)
    })
    this.presentLoading();

  }
  CambioTipo() {

    for (let tipo of this.estado_tipos.recordset) {
      console.log(tipo);
      if (tipo.Tipo_estado === this.tipo_estado) {
        console.log('esta ' + tipo);
        this.id_Tipo_estado = tipo.id
        this.valor1 = tipo.valor1;
        this.valor2 = tipo.valor2;
        this.valor3 = tipo.valor3;
        this.valor4 = tipo.valor4;
      }
    }
  }




  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.primera = true;
  }


  salir() {
    this.modalController.dismiss();
  }
}
