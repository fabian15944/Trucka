import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoestadoPageRoutingModule } from './tipoestado-routing.module';

import { TipoestadoPage } from './tipoestado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoestadoPageRoutingModule
  ],
  declarations: [TipoestadoPage]
})
export class TipoestadoPageModule {}
