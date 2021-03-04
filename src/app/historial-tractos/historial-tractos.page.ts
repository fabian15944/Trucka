import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonSlides, LoadingController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FotosPage } from '../fotos/fotos.page';
import { HistorialService } from '../Services/historial.service';


@Component({
  selector: 'app-historial-tractos',
  templateUrl: './historial-tractos.page.html',
  styleUrls: ['./historial-tractos.page.scss'],
})
export class HistorialTractosPage implements OnInit {
campaignOne: FormGroup;
campaignTwo: FormGroup;
 
  valor1: any;
  Valor2: any;
  url = environment.urlbackend;
  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay:true,   
  };

  reporte:any;
  Numero:any;
  respuesta:any;
  numUnidad:any;
  sucursal:any;
  fecha:any;
  posicionCard: any;
  
 nuevoarray: any;


   MostrarInfo = false;
   


   articulos:any;

 
   
  constructor(public historial:HistorialService,  public loadingController: LoadingController, private modalCtrl: ModalController ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear(); 
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 1)),
      end: new FormControl(new Date(year, month, 2))
    });
    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month,1)),
      end: new FormControl(new Date(year, month, 2))
    });

    this.Numero='',
    this.articulos =[];
    this.nuevoarray =[];

   }

  ngOnInit() {

  }
  async esperando() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Datos...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }

  buscar(){
   if(this.Numero ===''){   
    this.verificacion()
   }else{  
     var FechaIn = moment(this.valor1).format('DD-MM-YYYY')
     var FechaFn = moment(this.Valor2).format('DD-MM-YYYY') 
      this.historial.historialreporte(FechaIn,FechaFn,this.Numero).then(
        (reporte) => {
          this.respuesta = this.historial.reporte
          if(this.respuesta.recordset.length === 0){ 
            this.validacionNoexiste()
            this.MostrarInfo = false;
         }else{
          this.editarArray();
        this.MostrarInfo = true;
      }
        },
        (error) => {
          console.error('Entro a error', error);
        }
      )
   }
  }

  card(posicion){ 
    // this.posicionCard = posicion;
    let index = 0;
    for(let a of this.nuevoarray){
      this.nuevoarray[index].Mostrar = false;
      index++;
    }
   this.nuevoarray[posicion].Mostrar = !this.nuevoarray[posicion].Mostrar;
   var idunidad = this.nuevoarray[posicion].id  
   this.historial.reportes(idunidad).then((result) => {  
    this.esperando()
  this.reporte = this.historial.historial
  console.log(this.reporte);
  
   }).catch((err) => {
     console.log(err)
   });
  
  
  }

  editarArray() {
    for (let art of this.historial.reporte.recordset) {
      let articulo = {
       Marca: art.Marca,
       encargado_reporte: art.encargado_reporte,
       fecha: art.fecha,
       id: art.id,
       num_unidad: art.num_unidad,
       operador: art.operador,
       sucursal: art.sucursal,
       Mostrar: false
      }
      this.nuevoarray.push(articulo);
    }
    console.log(this.nuevoarray);

  }
  
  async Historial(posicion){
    const modal = await this.modalCtrl.create({
         component: FotosPage,
         componentProps: {
           foto: this.reporte.recordset[posicion].fotografia1,
           foto2: this.reporte.recordset[posicion].fotografia2,
           foto3: this.reporte.recordset[posicion].fotografia3      
         }     
     });
    modal.onDidDismiss().then((res)=>{
    });
    return modal.present();

}






  verificacion() {
    Swal.fire({
      title: 'Atencion!',
      text: 'Aun faltan datos por rellenar',
      icon: 'warning',
      
      background: '#FFF5F5  ' ,
      confirmButtonText: 'Aceptar',
      footer: 'TRUCKA',
      
    });
   
 
  }

  validacionNoexiste() {
    Swal.fire({
      title: 'No se encontraron reportes de:',
      text: `Unidad ${this.Numero} `,
      footer: 'Verifica bien los datos',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  
  }
  unreporte() {
    Swal.fire({
      title: 'Atencion!',
      text: `La unidad ${this.Numero} solo cuenta con un reporte generado`,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
    
  }







}
