import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AdministracionService } from '../Services/administracion.service';

@Component({
  selector: 'app-agregar-art',
  templateUrl: './agregar-art.page.html',
  styleUrls: ['./agregar-art.page.scss'],
})
export class AgregarArtPage implements OnInit {

  Ubicacion:any;
  nombre:any;
  @Input() tipo_estado;
  valor1:any
  valor2: any;
  valor3: any;
  valor4: any;
  id_Tipo_estado:any;
  estado_tipos: any;
  foto:any;
 primera = true;
  constructor(public loadingController: LoadingController,
    private modalController: ModalController,
    private tiposestado: AdministracionService,
    ) {
      this.estado_tipos = [];
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
    console.log(this.Ubicacion,this.nombre, this.id_Tipo_estado,this.foto)
  }








  salir() {
    this.modalController.dismiss();
  }

}
