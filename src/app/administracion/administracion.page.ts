import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ActualizarArtPage } from '../actualizar-art/actualizar-art.page';
import { AgregarArtPage } from '../agregar-art/agregar-art.page';

import { AdministracionService } from '../Services/administracion.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

 Marca:any;
 Articulos:any;
 posicion = 0;
 reporte:any;
 primera = false;

res: any;
 nombre:any;
  constructor( public loadingController: LoadingController, 
    private Servicioadmin: AdministracionService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) 
    {this.Articulos =[], this.reporte =[]
    this.res = [];}

  ngOnInit() {
  }

  buscar() {
    this.Servicioadmin.Getarticulos(this.Marca).then(
     
      (articulos) => {
        this.Articulos = this.Servicioadmin.articulos
        //  this.editarArray();
  
         this.presentLoading();
        // this.primera= true;
      },
      (error) => {
        console.error('Entro a error', error);
      }
    )
  
  }




editar(event){
  console.log(event);
  const Moveritem = this.Articulos.recordset.splice(event.detail.from, 1)[0];
  this.Articulos.recordset.splice(event.detail.to, 0, Moveritem)
  event.detail.complete();
// this.click()


}
async Agregar(i){
console.log(i)
const modal = await this.modalCtrl.create({
  component: AgregarArtPage,
  componentProps: {  
  Marca: this.Articulos.recordset[i].Marca,
  tipo_estado: this.Articulos.recordset[i].tipo_estado,
  estado: this.Articulos.recordset[i].estado,

  }
});
modal.onDidDismiss().then((Data)=>{
console.log(Data)  
this.res = Data;
console.log('res',this.res);
this.Articulos.recordset.splice(i + 1,0,{ 
  id: this.res.data.ID,
  Marca: this.res.data.Marca,
  Tipo_estado: this.res.data.id_estado,
  Ubicacion:  this.res.data.Ubicacion,
  estado: this.res.data.estado,
  nombre: this.res.data.nombre,
  foto: this.res.data.foto,
  posicion: null
  })



 });

return modal.present();
}

async eliminararticulo(pos) {
  console.log(pos)
  const alert = await this.alertCtrl.create({
    header: 'Atención',
    message: '¿Estas seguro que quieres borrar este articulo?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: (blah) => {
         
        }

      }, {
        text: 'Eliminar',
        handler: (blah) => {
        
        var h =  this.Articulos.recordset.splice(pos,1)
       var id = this.Articulos.recordset[pos].id
       var id = this.Articulos.recordset[pos].id
       var estado= 'n';
       console.log(id)
       this.Servicioadmin.Delete_articulo(id,estado)
        }

      }]
  });
  await alert.present();

}


  async actualizararticulo(pos){
   
    const modal = await this.modalCtrl.create({
      component: ActualizarArtPage,
      componentProps: {  
        nombre: this.Articulos.recordset[pos].nombre,
        Marca: this.Articulos.recordset[pos].Marca,
        Ubicacion: this.Articulos.recordset[pos].Ubicacion,
        tipo_estado: this.Articulos.recordset[pos].tipo_estado,
        id: this.Articulos.recordset[pos].id,
        foto: this.Articulos.recordset[pos].foto,
 
      }
      
  });
 modal.onDidDismiss().then((res)=>{
   console.log(res)
this.buscar()
 });

 return modal.present();
  }









enviareditar(){

}



  Guardar(){
    console.log('Guardando articulos',this.Articulos.recordset)
    this.Servicioadmin.Post_modal_articulo(this.Articulos.recordset)
   
  }

// alertas de la pagina
async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Por Favor Espere...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  this.primera= true;
}

























}
