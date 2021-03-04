import { Component, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../Services/reporte.service';
import { IonSlides, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { FotosPage } from '../fotos/fotos.page';

@Component({
  selector: 'app-historial-reportes',
  templateUrl: './historial-reportes.page.html',
  styleUrls: ['./historial-reportes.page.scss'],
})
export class HistorialReportesPage implements OnInit {
  url = environment.urlbackend; // url que traigo desde environment
  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay:true,   
  };
  busqueda;
  id: any;
  numUnidad: any;
  rep: any;
  sucursal: any;
  fecha: any;
  encargado_reporte: any;
  operador: any;

  constructor(private reporteService: ReporteService,  private modalCtrl: ModalController,private routerActivated: ActivatedRoute,) {
    this.rep = [];

    this.id = this.routerActivated.snapshot.queryParams.id;

  }
// funcion que se ejecuta al inicar la pagina
  ngOnInit() {
    this.getReporte();
    
  }
  // primero consulto el reporte despues me manda los datos del reporte y los voy guardando en las variables
  getReporte() {
    this.reporteService.reporte(this.id).then(res => {
      this.rep = this.reporteService.rep;
      this.numUnidad = this.rep.recordset[0].num_unidad;
      this.sucursal = this.rep.recordset[0].sucursal;
      this.fecha = this.rep.recordset[0].fecha;
      this.encargado_reporte = this.rep.recordset[0].encargado_reporte;
      this.operador = this.rep.recordset[0].operador;
    });

  }

  async Historial(posicion){
     const modal = await this.modalCtrl.create({
          component: FotosPage,
          componentProps: {
            foto: this.rep.recordset[posicion].fotografia1,
            foto2: this.rep.recordset[posicion].fotografia2,
            foto3: this.rep.recordset[posicion].fotografia3
          
          }
          
      });
     modal.onDidDismiss().then((res)=>{
      


     });

     return modal.present();

}

}
