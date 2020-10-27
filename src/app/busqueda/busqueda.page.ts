import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  MostrarInfo=false;
  Trailer = {
    numero_placa:'FGDB894NS',
    conductor: 'Faian de la Cruz Marcial',
    licencia: 'Federal'
   }
  constructor(private router: Router) {
  
   }

  ngOnInit() {
  }
  buscar(){
  this.MostrarInfo = true;
  }
  redirect() {
    let navParams: NavigationExtras = {
      queryParams: {
        trailer: this.Trailer.numero_placa
      }
  }
    this.router.navigate(['home'], navParams);
  }
}
