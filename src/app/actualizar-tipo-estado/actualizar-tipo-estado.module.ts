import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarTipoEstadoPageRoutingModule } from './actualizar-tipo-estado-routing.module';

import { ActualizarTipoEstadoPage } from './actualizar-tipo-estado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarTipoEstadoPageRoutingModule
  ],
  declarations: [ActualizarTipoEstadoPage]
})
export class ActualizarTipoEstadoPageModule {}
