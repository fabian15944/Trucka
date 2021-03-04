import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevainspeccionPage } from './nuevainspeccion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevainspeccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevainspeccionPageRoutingModule {}
