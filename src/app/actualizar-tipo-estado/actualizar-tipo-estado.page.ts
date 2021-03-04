import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdministracionService } from '../Services/administracion.service';

@Component({
  selector: 'app-actualizar-tipo-estado',
  templateUrl: './actualizar-tipo-estado.page.html',
  styleUrls: ['./actualizar-tipo-estado.page.scss'],
})
export class ActualizarTipoEstadoPage implements OnInit {
  
  @Input() Tipo_estado;
  @Input() id;
  @Input() valor1;
  @Input() valor2;
  @Input() valor3;
  @Input() valor4;
  constructor(private actualizarestado: AdministracionService,
    private modalController: ModalController,) { }

  ngOnInit() {
    console.log(this.id)
  }
  Guardar(){
this.actualizarestado.put_estado(this.id,this.Tipo_estado,this.valor1,this.valor2,this.valor3,this.valor4)
this. salir()
  }

  salir() {
    this.modalController.dismiss();
  }
}
