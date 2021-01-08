import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../Services/reporte.service';
import { IonSlides } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historial-reportes',
  templateUrl: './historial-reportes.page.html',
  styleUrls: ['./historial-reportes.page.scss'],
})
export class HistorialReportesPage implements OnInit {
  url= environment.urlApi;
  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  busqueda;
  // @Input() id;
   id: any;
   numUnidad: any;
    rep:any;
    sucursal: any;
    fecha: any;
    encargado_reporte:any;
    operador: any;

  constructor(private reporteService: ReporteService, private routerActivated: ActivatedRoute,)
   { this.rep =[];

      this.id = this.routerActivated.snapshot.queryParams.id;
  
     }

  ngOnInit() {
    this.getReporte(); 
    // console.log(this.id)
  }
  getReporte(){
    this.reporteService.reporte(this.id).then(res=>{
      this.rep = this.reporteService.rep;
      console.log('ddsnd',this.rep)
      this.numUnidad = this.rep.recordset[0].num_unidad;
      this.sucursal = this.rep.recordset[0].sucursal;
      this.fecha = this.rep.recordset[0].fecha;
      this.encargado_reporte = this.rep.recordset[0].encargado_reporte;
      this.operador = this.rep.recordset[0].operador;
    });
   
  }

}
