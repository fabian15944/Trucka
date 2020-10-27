import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  reportes=[{
    codigo: '46F78U393',
    total_reportes: 3,
    fallas: 2,
    reportes:[{
      operador: 'Jesus Emmanuel Ortiz de Luna',
      fecha: '12/13/2020',
      estado: 'fallo',
      cant_fallos:1

    },
    {
      operador: 'Jesus Emmanuel Ortiz de Luna',
      fecha: '12/13/2020',
      estado: 'bueno'
    },
    {
      operador: 'Jesus Emmanuel Ortiz de Luna',
      fecha: '12/13/2020',
      estado: 'fallo',
      cant_fallos:1
    }],
    mostrar:false
  },
  {
    codigo: '46A78V393',
    total_reportes: 2,
    fallas: 2
  },
  {
    codigo: '46M78Z393',
    total_reportes: 5,
    fallas: 4
  }]
  constructor() { }

  ngOnInit() {
  }
  MostrarCont(posicion){
    this.reportes[posicion].mostrar = ! this.reportes[posicion].mostrar;

  }

}
