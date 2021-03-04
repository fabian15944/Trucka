import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ActualizarTipoEstadoPage } from '../actualizar-tipo-estado/actualizar-tipo-estado.page';
import { AdministracionService } from '../Services/administracion.service';

@Component({
  selector: 'app-tipoestado',
  templateUrl: './tipoestado.page.html',
  styleUrls: ['./tipoestado.page.scss'],
})
export class TipoestadoPage implements OnInit {
  primera = false;
  estado_tipos: any;
  
  valor1: any;
  valor2: any;
  valor3: any;
  valor4: any;
  id_Tipo_estado:any;
  nombre:any;
  constructor( public loadingController: LoadingController,
    private modalController: ModalController,
    private tiposestado: AdministracionService,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
  
    private modalCtrl: ModalController)

     { 
      this.estado_tipos = [];
      this.valor1= '';
      this.valor2= '';
      this.valor3= '';
      this.valor4= '';
     }

  ngOnInit() {
    this.estado_tipo();
  }
  estado_tipo() {
   
    this.tiposestado.Get_tipos_estado().then(res => {
      this.estado_tipos = this.tiposestado.tipo_de_estado
     
    })
    this.presentLoading();

  }
 
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.primera = true;
  }
  Guardar(){
console.log(this.valor1)
this.tiposestado.post_estado(this.nombre,this.valor1,this.valor2,this.valor3,this.valor4)
this.estado_tipo()
  }

  async actualizar_estado(pos){
  const modal = await this.modalCtrl.create({
    component: ActualizarTipoEstadoPage,
    componentProps: {  
      Tipo_estado: this.estado_tipos.recordset[pos].Tipo_estado,
      id: this.estado_tipos.recordset[pos].id,
      valor1: this.estado_tipos.recordset[pos].valor1,
      valor2: this.estado_tipos.recordset[pos].valor2,
      valor3: this.estado_tipos.recordset[pos].valor3,
      valor4: this.estado_tipos.recordset[pos].valor4
    }
    
});
modal.onDidDismiss().then((res)=>{
 console.log(res)
 this.estado_tipo()
});

return modal.present();
}

}
