import { Component, OnInit } from '@angular/core';
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
  constructor( public loadingController: LoadingController, 
    private Servicioadmin: AdministracionService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) 
    {this.Articulos =[], this.reporte =[] }

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
this.click()


}
async Agregar(i){
console.log(i)
const modal = await this.modalCtrl.create({
  component: AgregarArtPage,
  componentProps: {  
  tipo_estado: this.Articulos.recordset[i].tipo_estado,
  }
});
modal.onDidDismiss().then((res)=>{
console.log(res)

});

return modal.present();
// this.Articulos.recordset.splice(i + 1,0,{ 
// Marca: "S",
// Tipo_estado: 2,
// Ubicacion: "FRENTE",
// id: 248,
// nombre: "ejemplo jesus",
// posicion: null
// })
console.log('acomodo',this.Articulos.recordset)
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
       console.log(id)
       this.Servicioadmin.Delete_articulo(id)
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
        // valor1: this.Articulos.recordset[pos].valor1,
        // valor2: this.Articulos.recordset[pos].valor2,
        // valor3: this.Articulos.recordset[pos].valor3,
        // valor4: this.Articulos.recordset[pos].valor4
      }
      
  });
 modal.onDidDismiss().then((res)=>{
   console.log(res)
this.buscar()
 });

 return modal.present();
  }













  click(){
    console.log('Guardando articulos',this.Articulos.recordset)
    // let index = 0;
    // for (let art of this.Articulos.recordset) {
         
    //       let articulo = {
    //         id: art.id,
    //         nombre: art.nombre,
    //         ubicacion: art.ubicacion,
    //         posicion:  index,
    //       }
    //       index ++
         
    //       this.reporte.push(articulo);
         
      
    //     }
      
    //     console.log('reporte',this.reporte)
   
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
