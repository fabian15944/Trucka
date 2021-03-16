import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CameraResultType, Plugins, CameraOptions, } from '@capacitor/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AdministracionService } from '../Services/administracion.service';
const {Camera} = Plugins;
@Component({
  selector: 'app-agregar-art',
  templateUrl: './agregar-art.page.html',
  styleUrls: ['./agregar-art.page.scss'],
})
export class AgregarArtPage implements OnInit {

  Ubicacion:any;
  nombre:any;
  @Input() tipo_estado;
  @Input() Marca;
  @Input() estado;
  valor1:any
  valor2: any;
  valor3: any;
  valor4: any;
  id_Tipo_estado:any;
  estado_tipos: any;
   foto:any;
 primera = true;
fecha: any;

  constructor(public loadingController: LoadingController,
    private modalController: ModalController,
    private tiposestado: AdministracionService,

    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private router: Router,
    ) {
      this.estado_tipos = [];
      this.foto = '';
     }

  ngOnInit() {
    this.estado_tipo()

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



  Guardar(){
    this.fecha = new Date();
    var dia = this.fecha.getUTCDay();
    var min = this.fecha.getUTCMinutes();
    var seg = this.fecha.getUTCSeconds();
    var id = parseInt(`${dia}${min}${seg}`);
    var array = {
    ID: id,
    Ubicacion: this.Ubicacion,
    nombre: this.nombre,
    id_estado: this.id_Tipo_estado,
    foto: this.foto,
    estado: this.estado,
    Marca: this.Marca,
    posicion: null,
    



    }
    this.modalController.dismiss(array)

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
            this.foto = '';
            (<HTMLInputElement>document.getElementById('img')).src ='assets/addImage.png';
            // this.reporte[this.posicion].imagen.splice(pos, 1);
            // this.longitudImagenes = this.reporte[this.posicion].imagen.length;
          }

        }]
    });
    await alert.present();

  }

  async  hacerFoto() {
    const images = { 
      quality: 90,
       allowEditing: true,
        resultType: CameraResultType.Base64,
    }
    await  Camera.getPhoto(images).then(imgdata => {
      this.foto = 'data:image/jpeg;base64,' + imgdata.base64String;
    (<HTMLInputElement>document.getElementById('img')).src = this.foto;
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
      this.foto = 'data:image/jpeg;base64,' + imgdata.base64String;
  // this.foto = '';
      (<HTMLInputElement>document.getElementById('img')).src = this.foto;
      
  
    }, 
     (err) => {
          console.log(err);
        });
      
  
  }
  
  




  salir() {
    this.modalController.dismiss();
  }

}
