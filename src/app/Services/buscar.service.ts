import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  url: string;    // URL del backend
  Ntracto: any;  // variable con Numero del tracto


  constructor(private http: HttpClient) {
    this.url = environment.urlApi;
  }
  getTractos(numero): Promise<any> {
  
    return new Promise((resolve, reject) => {
      this.http.get(this.url + `buscar/${numero}`).subscribe(Data => {
        // console.log(Data)

        this.Ntracto = Data;
        console.log(this.Ntracto)
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