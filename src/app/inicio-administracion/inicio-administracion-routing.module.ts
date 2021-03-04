import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioAdministracionPage } from './inicio-administracion.page';

const routes: Routes = [
  {
    path: '',
    component: InicioAdministracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioAdministracionPageRoutingModule {}
