import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarArtPage } from './actualizar-art.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarArtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarArtPageRoutingModule {}
