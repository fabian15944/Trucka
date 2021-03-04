import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AdministracionService } from '../Services/administracion.service';
import { Plugins, CameraResultType, CameraOptions, CameraSource } from '@capacitor/core';


const {Camera} = Plugins;
@Component({
  selector: 'app-nuevainspeccion',
  templateUrl: './nuevainspeccion.page.html',
  styleUrls: ['./nuevainspeccion.page.scss'],
})

export class NuevainspeccionPage implements OnInit {
  nombre:any;
  Marca:any;
  Ubicacion:any;
  tipo_estado
  foto = 'scania';
  estado_tipos: any;
  primera= false;
  img: any;
  validar_valores = true;
  valor1: any;
  valor2: any;
  valor3: any;
  valor4: any;
  validar_foto = true;
  mostrar = false;
  id_Tipo_estado:any;

  posicion = '1';
  estado ='s';
  constructor(public loadingController: LoadingController,
    private modalController: ModalController,
    private tiposestado: AdministracionService,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,

  )
   { 
    this.estado_tipos = [];
    this.img = [];

   }

  ngOnInit() {
    this.estado_tipo();
  
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Completar con',
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
             this.img = '';
            // (<HTMLInputElement>document.getElementById('img')).src =`assets/${this.foto}.png`;
            // this.reporte[this.posicion].imagen.splice(pos, 1);
            // this.longitudImagenes = this.reporte[this.posicion].imagen.length;
          }

        }]
    });
    await alert.present();

  }

  
  async quitarImagen(){
    this.img = '';
    (<HTMLInputElement>document.getElementById('img')).src = 'assets/Depocito.png'; 
  
  }

// hacer foto con capacitor funciona solo para generar una version web o una pwa
async  hacerFoto() {

  this.validar_foto = false;
  this.mostrar= true;
  const images = {
    quality: 90,
     allowEditing: true,
      resultType: CameraResultType.Base64,
  }
  await  Camera.getPhoto(images).then(imgdata => {
    this.img = 'data:image/jpeg;base64,' + imgdata.base64String;

  (<HTMLInputElement>document.getElementById('img')).src = this.img;

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
    (<HTMLInputElement>document.getElementById('img')).src = this.img;
    

  }, 
   (err) => {
        console.log(err);
      });
    

}





 


  Guardar() {
  console.log(this.Marca,this.Ubicacion,this.nombre,this.posicion,this.estado,this.foto,this.id_Tipo_estado)
  this.tiposestado.post_articulo(this.Marca,this.Ubicacion,this.nombre,this.posicion,this.estado,this.img,this.id_Tipo_estado)
  
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
          (<HTMLInputElement>document.getElementById('img')).src ='No se han agregado fotografias';
        }
      }

      console.log('tipo', this.estado_tipos)
    })
    this.presentLoading();

  }
  CambioTipo() {
    this.validar_valores = false;
    console.log(this.tipo_estado);
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


  
}
