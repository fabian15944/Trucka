import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoestadoPage } from './tipoestado.page';

const routes: Routes = [
  {
    path: '',
    component: TipoestadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoestadoPageRoutingModule {}
