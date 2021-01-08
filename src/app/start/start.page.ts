import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HistorialReportesPage } from '../historial-reportes/historial-reportes.page';
import { ReporteService } from '../Services/reporte.service';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ConnectionStatus, NetworkService } from '../Services/network.service';
import { OfflineManagerService } from '../Services/offline-manager.service';
import { Storage } from '@ionic/storage';



const STORAGE_REQ_KEY = 'storedreq';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  start: any;
  busqueda;
  
  constructor(public servicioreportes: ReporteService,
              private router: Router, 
              private modalCtrl: ModalController,
              public loadingController: LoadingController,
              private plt: Platform,
              private storage: Storage,
              private networkService: NetworkService,
              private offlineManager: OfflineManagerService,
              
              ) {this.start = []; }

  ngOnInit() {
    this.presentLoading();
      this.plt.ready().then(() => {
      this.loadData(true);
    });
   
   
  }

  loadData(refresh = false, refresher?) {
    this.servicioreportes.tarjetas(refresh).then(res => {
      this.start = this.servicioreportes.start;
      if (refresher) {
        refresher.target.complete();
        
        
      }
    })
  }

  Historial(posicion){
    let navParams: NavigationExtras = {
      queryParams: {
        id: this.start.recordset[posicion].id   
      }
    }
    
    this.router.navigate(['historial-reportes'], navParams); 
    
    this.presentLoading();
   
  }


//   async Historial(posicion){
//      this.presentLoading();
//       const modal = await this.modalCtrl.create({
//            component: HistorialReportesPage,
//            componentProps: {
//              id: this.start.recordset[posicion].id
//            }
//        });
//       modal.onDidDismiss().then((res)=>{
//         //this.presentLoadingCorrectivos();
          
        
//       });
  
//       return modal.present();
     
// }


  //    cerrar() {
  //   this.modalCtrl.dismiss()
  // }

  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Cargando...!');
  }
   doRefresh(event) {
    this.start = [];
    
    console.log('Begin async operation');
   
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadData(true);

      event.target.complete();
    }, 2000);
  }
}
