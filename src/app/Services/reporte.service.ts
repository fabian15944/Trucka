import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  url: string;
  cuenta: any;
  constructor(private http: HttpClient, private router:Router) { this.url = environment.urlApi;}


  
  postReporte(num_unidad,operador,sucursal,encargado,reporte): Promise <any>{
    let date = new Date();
    let dia = date.getUTCDay();
    let mes = date.getUTCMonth();
    let year = date.getUTCFullYear();
    let fecha = `${mes}/${dia}/${year}`
    console.log(fecha);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'reporte',{ 
       num_unidad,
       operador,
       sucursal,
       encargado,
       reporte,
       fecha
      }).subscribe(res => {
        console.log(res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Listo',
          text: 'Guardado con exito',
          showConfirmButton: true 
        });
        //this.router.navigate(['/start']);
        resolve();

      },err => {
        console.log('error', err); 
        reject()
      });
    
    });
  }
 
}
