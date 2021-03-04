import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BuscarService } from '../Services/buscar.service';
import Swal from 'sweetalert2'
import { AlertController, LoadingController } from '@ionic/angular';
import 'sweetalert2/src/sweetalert2.scss'

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  MostrarInfo = false;
  Numeconomico: any;
  numero = "";
  no_serie_uni: any;

  constructor(
private navCtrl: NavController,

    private router: Router,
    public serviciobuscar: BuscarService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController
  ) {
    this.Numeconomico = [];

  }

  ngOnInit() {

  }



  async esperando() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Datos...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }

  buscar() {
    this.serviciobuscar.getTractos(this.numero).then(
      (Ntracto) => {
        this.Numeconomico = this.serviciobuscar.Ntracto;
        if (this.Numeconomico.recordset.length === 0) {
          this.MostrarInfo = false;
          this.alertnoExiste();
        } else {
          this.MostrarInfo = true;
          this.esperando()
          this.no_serie_uni = this.Numeconomico.recordset[0].no_serie_uni;
        }

      },
      (error) => {
        console.error('Entro a error', error);
      }
    )

  }

  // validacion del buscador
  vbuscador() {
    if (this.numero === "") {

      Swal.fire({
        title: 'Error!',
        text: 'Ingresa el codigo de la unidad',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      this.MostrarInfo = false;
    } else {
      this.buscar()
    }

  }


  redirect() {
    let navParams: NavigationExtras = {
      queryParams: {
        trailer: this.numero,
        conductor: this.Numeconomico.recordset[0].nom_tra,
        Marca: this.Numeconomico.recordset[0].marca,
      }
    }

    this.router.navigate( ['nuevo-reporte'], navParams);
    // this.presentLoading();
  }  


 





  doRefresh(event) { 
    setTimeout(() => {
      event.target.complete();

    }, 3000);
  }


  // Alertas de validaciones y mas 
  alertnoExiste() {
    Swal.fire({
      title: 'Error!',
      text: 'Unidad no encontrada',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  async alertNull() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      subHeader: '¿El número de serie es correcto?',
      message: `${this.no_serie_uni}`,

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
       
          }

        },
        {
          text: 'ok',
          handler: (blah) => {
     
            this.redirect();
          }

        }]
    });
    await alert.present();
  }



  BtnCancelar() {
    Swal.fire({
      title: 'Atencion!',
      text: 'Si cancelas se perdera tu busqueda',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
    this.MostrarInfo = false;
  }



}










