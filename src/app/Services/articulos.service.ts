import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { OfflineManagerService } from './offline-manager.service';

const API_STORAGE_KEY = 'specialkey';

@Injectable({
  providedIn: 'root'
  
})
export class ArticulosService {
  url: string;
  articulo: any;

  constructor(private http: HttpClient,
    private networkService: NetworkService,
    private storage: Storage,
     private offlineManager: OfflineManagerService
    ) {
    this.url = environment.urlApi;
   }
   
   getArticulos(forceRefresh: boolean = false): Promise <any>{
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
       this.getLocalData('specialkey-articulo');
    } else {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'articulos').subscribe(Data => {
        // console.log(Data)
        this.articulo = Data;
        console.log(this.articulo)
        this.setLocalData('articulo', Data);
        resolve();

      }, err => {
        console.log('error', err);
        reject()
      });
    
    });
  }
  
   }

   private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`).then((Data) =>{
        this.articulo = Data;
    });
  }
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
// postArticulos(): Promise<any>{
//   return new Promise((resolve, reject) =>{
//    this.http.post()
//   });
// }



}
