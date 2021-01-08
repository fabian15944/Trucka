import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


const API_STORAGE_KEY = 'specialkey';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string;
  user: any;
  sucursal:any;

  constructor( private http: HttpClient, private router: Router, private storage: Storage,
   ) 
{ this.url = 'http://192.168.10.224:3002/api/'
   this.user = []
}




Logear(email,password): Promise <void>{
  return new Promise((resolve, reject) => {
    this.http.post(this.url + 'login',{ 
      email,
      password
    }).subscribe(res => {

      
      this.user = res;
      console.log(this.user)
      if(this.user.recordset.length === 0){
        this.alertnoExiste();
      }else{
      this.setLocalData('usuario', res );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['start' ]);
      resolve();
    }
     
    },err => {
      console.log('error', err); 
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al conectarse con el servidor',
        text: 'Verifica tu conexion a internet',
        showConfirmButton: true
      });
      reject()
    });
  
  });
}


// guardando en storage
private setLocalData(key, data) {
  this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
}





alertnoExiste() {
  Swal.fire({
    title: 'Error!',
    text:'Usuario Y/O Contraseña Incorrecto',
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
}










  
}


