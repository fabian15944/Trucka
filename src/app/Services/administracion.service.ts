import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  url: string;
  articulos: any;
  Tipos: any;
  tipo_de_estado:any;
  constructor(private http: HttpClient, private router: Router,)
   {
     this.url = environment.urlbackend, 
      this.articulos = [],
      this.Tipos = [] 
    }

    Get_tipos_estado():Promise<void>{
      return new Promise((resolve, reject) => {
        this.http.get(this.url +  'admin/tipos_estados').subscribe(Data => {
          this.tipo_de_estado = Data; 
          console.log(this.tipo_de_estado)     
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
    // GetTipos():Promise<void>{
    //   return new Promise((resolve, reject) => {
    //     this.http.get(this.url + 'admin/tipos').subscribe(Data => {
    //       this.Tipos = Data; 
    //       console.log(this.Tipos)     
    //       resolve();
    //     }, err => {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'ERROR EN EL SERVIDOR. comunicate con sistemas',
    //         footer: 'Trucka',
    //         showConfirmButton: true
    //       });
    //       reject()
    //     });
    //   });
    // }

Getarticulos(Marca):Promise<void>{
  return new Promise((resolve, reject) => {
    this.http.get(this.url + `admin-tractos/${Marca}`).subscribe(Data => { 
      this.articulos = Data; 
      console.log(this.articulos)
      if(this.articulos.recordset.length === 0){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: `No se encontraron Datos de la Marca ${Marca}`,
          footer: 'Trucka',
          showConfirmButton: true
        });

      }
         
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

put_articulo(  nombre, Marca, ubicacion, id,foto,Tipo_estado,nombrefoto){
  // console.log( nombre, Marca, ubicacion, id,foto,act_foto,Tipo_estado)
  return this.http.put(this.url + `admin/articulo`,{
    nombre,
    Marca,
    ubicacion,
    id,
    foto,
    nombrefoto,
    Tipo_estado


  }).subscribe(
    data => {
    console.log(data);
    }, error =>{
    console.log(error);
    }
  )
}
Delete_articulo(id,estado){
  this.http.delete(this.url + `admin/${id}/${estado}`).subscribe(Data => {    
    console.log(Data)     
    }, error =>{
    console.log(error);
    }
  )
}

Post_modal_articulo(nuevoreporte){
  return this.http.post(this.url + `administracion/post/articulo`,{
    nuevoreporte

  }).subscribe(
    data => {
    console.log(data);
    }, error =>{
    console.log(error);
    }
  )
}


post_articulo(Marca,Ubicacion,nombre,posicion,estado,foto,Tipo_estado){
  // console.log( nombre, Marca, ubicacion, id,foto,act_foto,Tipo_estado)
  return this.http.post(this.url + 'nuevo_reporte',{
    Marca,
    Ubicacion,
    nombre,
    posicion,
    estado,
    foto,
    Tipo_estado

  }).subscribe(
    data => {
    console.log(data);
    }, error =>{
    console.log(error);
    }
  )
}




//Apartados de estados

post_estado(Tipo_estado,valor1,valor2,valor3,valor4){
  // console.log( nombre, Marca, ubicacion, id,foto,act_foto,Tipo_estado)
  return this.http.post(this.url + `nuevo/Tipo_estado`,{
    Tipo_estado,valor1,valor2,valor3,valor4

  }).subscribe(
    data => {
    console.log(data);
    }, error =>{
    console.log(error);
    }
  )
}


put_estado(id,Tipo_estado,valor1,valor2,valor3,valor4){
  // console.log( nombre, Marca, ubicacion, id,foto,act_foto,Tipo_estado)
  return this.http.put(this.url + 'actualizar/Tipo_estado',{
    id,Tipo_estado,valor1,valor2,valor3,valor4
  }).subscribe(
    data => {
    console.log(data);
    }, error =>{
    console.log(error);
    
    }
  )
}


}
