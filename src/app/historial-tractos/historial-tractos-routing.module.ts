import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialTractosPage } from './historial-tractos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialTractosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialTractosPageRoutingModule {}
