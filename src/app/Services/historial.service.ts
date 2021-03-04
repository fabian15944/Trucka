import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  url: string;
  reporte: any;
  historial:any;
  constructor(private http: HttpClient, private router: Router,)
   {this.url = environment.urlbackend, 
      this.reporte = [],
      this.historial = [];
    
    }


  
 historialreporte(FechaIn,FechaFn,Numero): Promise<void> {
  console.log(FechaIn);
  console.log(FechaFn);
    return new Promise((resolve, reject) => {
      this.http.get(this.url + `historial/reporte/${FechaIn}/${FechaFn}/${Numero}`).subscribe(Data => {
        this.reporte = Data; 
        console.log(this.reporte)     
        resolve();
      }, err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'ERROR EN EL SERVIDOR. comunicate con sistemas',
          footer: 'Trucka',
          showConfirmButton: true
        });
        reject()
      });
    });
  }


  
 reportes(idunidad): Promise<void> {
  return new Promise((resolve, reject) => {
    this.http.get(this.url + `/historial/${idunidad}`).subscribe(Data => {
      this.historial = Data;
      console.log('Historial_',this.historial)  
      resolve();
    }, err => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'ERROR EN EL SERVIDOR. comunicate con sistemas',
        footer: 'Trucka',
        showConfirmButton: true
      });
      reject()
    });
  });
}


}
