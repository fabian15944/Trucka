import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarArtPage } from './agregar-art.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarArtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarArtPageRoutingModule {}
