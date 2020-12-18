import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { NetworkService,ConnectionStatus } from './network.service';
import { OfflineManagerService } from './offline-manager.service';
import { map, tap } from 'rxjs/operators';


const API_STORAGE_KEY = 'specialkey';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  url: string;
  cuenta: any;
  start: any;
  rep: any;
  constructor(private storage: Storage,
     private networkService: NetworkService,
      private offlineManager: OfflineManagerService,
      private http: HttpClient,
       private router:Router,
       public loadingController: LoadingController) { this.url = environment.urlApi;
  this.rep = [];
  this.start = [];
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Cargando...!');
    this.tarjetas();
  }
  
  postReporte(num_unidad,Marca,operador,sucursal,encargado,reporte, fecha): Promise <void>{

 
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'reporte',{ 
       num_unidad,
       Marca,
       operador,
       sucursal,
       encargado,
       reporte,
       fecha
      }).subscribe(res => {
        console.log(res)
        this.presentLoading();
        resolve();

      },err => {
        console.log('error', err); 
        reject()
      });
    
    });
  }

  tarjetas(forceRefresh: boolean = false):Promise <void> {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      // this.getLocalData('start');
      return this.getLocalData('start');

    } else {
  
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'start').subscribe(res => {
        console.log('Data_', res);
        this.start = res;
        console.log(this.start);
        this.setLocalData('start', res );
        resolve();

      }, err => {
        console.log('error', err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: err.error.message,
          showConfirmButton: true         
        });
        reject()
      });
    });
  }
  }
 // Save result of API requests
 private setLocalData(key, data) {
  this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
}

// Get cached API result
private getLocalData(key) {
  console.log('return local data!');
  try {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`).then((valor) =>{
    this.start = valor;
    console.log("Hola getlocal date", valor)
});
  } catch (error) {
    Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: error,
          showConfirmButton: true         
        });
  }
  
}

  reporte(id):  Promise<void> {
    console.log(id)
    return new Promise((resolve, reject) => {
      this.http.get(this.url + `reporte/${id}`).subscribe(Data => {
        // console.log(Data)

        this.rep = Data;
        console.log(this.rep)
        resolve();

      }, err => {
        console.log('error', err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: err.error.message,
          showConfirmButton: true         
        });
        reject()
      });
    });
  }
 
}
