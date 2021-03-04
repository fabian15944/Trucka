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
import { catchError, map, tap } from 'rxjs/operators';


const API_STORAGE_KEY = 'specialkey';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  url: string;
  cuenta: any;
  start: any;
  rep: any;
  urlstart: any;



  constructor(private storage: Storage,
     private networkService: NetworkService,
      private offlineManager: OfflineManagerService,
      private http: HttpClient,
       private router:Router,
       public loadingController: LoadingController) { this.url = environment.urlbackend;
  this.rep = [];
  this.start = [];
  this.urlstart = environment.urlstart;
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  
  postReporte(data):Observable <any>{
    let url = this.url + 'reporte'; 
   
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.offlineManager.storeRequest(url, 'POST', data));
    }else{
     
      return this.http.post(url, data).pipe(
        catchError(err => {
          this.offlineManager.storeRequest(url, 'POST', data);
          throw new Error(err);
        })
      );
      
    }
 
  
  }

  tarjetas(forceRefresh: boolean = false):Promise <void> {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {

      return this.getLocalData('start');

    } else {
  
    return new Promise((resolve, reject) => {
      this.http.get(this.urlstart + 'start').subscribe(res => {
        this.start = res;
        this.setLocalData('start', res );
        resolve();

      }, err => {
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
  try {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`).then((valor) =>{
    this.start = valor;
   
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
    
    return new Promise((resolve, reject) => {
      this.http.get(this.url + `reporte/${id}`).subscribe(Data => {
        this.rep = Data; 
        resolve();
      }, err => {
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
