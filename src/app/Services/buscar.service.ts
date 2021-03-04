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
    this.url = environment.urlbackend;
  }
  getTractos(numero): Promise<void> {

    return new Promise((resolve, reject) => {
      this.http.get(this.url + `buscar/${numero}`).subscribe(Data => {
        this.Ntracto = Data;
        resolve();
      }, err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'ERROR EN EL SERVIDOR. comunicate con sistemas',
          showConfirmButton: true
        });
        reject()
      });
    });
  }


  alertnoExiste() {
    Swal.fire({
      title: 'Error!',
      text: 'Unidad no encontrada',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

}