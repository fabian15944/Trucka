import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BuscarService } from '../Services/buscar.service';
import Swal from 'sweetalert2'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  MostrarInfo = false;
  Numeconomico: any;
  numero = "";

  constructor(
    private router: Router,
    public serviciobuscar: BuscarService,
    private alertCtrl: AlertController,

  ) {
    this.Numeconomico = [];

  }

  ngOnInit() {
   
  }

  buscar() {
    this.serviciobuscar.getTractos(this.numero).then(
      (Ntracto) => {
        this.Numeconomico = this.serviciobuscar.Ntracto;
        if(this.Numeconomico.recordset.length === 0){
          console.log('no existe')
              this.MostrarInfo = false;
              this.alertnoExiste();
        }else{
              this.MostrarInfo = true;
        }     
      },
      (error) => {     
        console.error('Entro a error', error);     
      }
    )
    //this.MostrarInfo = true;
  }

  // validacion del buscador
  vbuscador() {
    if (this.numero === "") {
      console.log("no puedes dejar campo vacio")
      Swal.fire({
        title: 'Error!',
        text: 'Ingresa el codigo de la unidad',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      this.MostrarInfo = false;
    }else {
      this.buscar()
    }
  
}


  redirect() {
    let navParams: NavigationExtras = {
      queryParams: {
        trailer: this.numero,
        conductor: this.Numeconomico.recordset[0].nom_tra
        
      }
    }
    this.router.navigate(['home'], navParams);   
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      
    }, 2000);
  }


// Alertas de validaciones y mas 
  alertnoExiste() {
    Swal.fire({
      title: 'Error!',
      text:'Unidad no encontrada',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
}

  async alertNull(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '!Atencion¡',
      message: '¿Los datos son correctos?',   
      buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: (blah) =>{
              console.log('Seguir editando');
            }

          },
          {
            text: 'ok',
            handler: (blah) =>{
              console.log('Seguir editando');
              this.redirect();
            }

          }]
    });
    await alert.present();
    }
  


    BtnCancelar(){
      Swal.fire({
        title: 'Atencion!',
        text:'Si cancelas se perdera tu busqueda',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      this.MostrarInfo = false;
    }

}




  






// else{
//   if(this.numero.length === 6){
//     Swal.fire({
//       title: 'Error!',
//       text: 'Ingresa el codigo de la unidad',
//       icon: 'error',
//       confirmButtonText: 'Aceptar',
//     })
//   } else {
//   this.buscar()
// }
// }