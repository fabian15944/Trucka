import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { OfflineManagerService } from './offline-manager.service';
import Swal from 'sweetalert2';

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
   
   getArticulos(Marca): Promise <void>{
    return new Promise((resolve, reject) => {
      this.http.get(this.url + `articulos/${Marca}`).subscribe(Data => {
        // console.log(Data)
        this.articulo = Data;
        resolve();

      }, err => {
        console.log('error', err);
        reject()
      });
    
    });
  
  
   }
   private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
   private getLocalData(key) {
     
    try {
      return this.storage.get(`${API_STORAGE_KEY}-${key}`).then((valor) =>{
        this.articulo = valor;
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
  

}
