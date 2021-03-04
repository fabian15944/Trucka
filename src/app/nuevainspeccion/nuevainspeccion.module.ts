import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevainspeccionPageRoutingModule } from './nuevainspeccion-routing.module';

import { NuevainspeccionPage } from './nuevainspeccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevainspeccionPageRoutingModule
  ],
  declarations: [NuevainspeccionPage]
})
export class NuevainspeccionPageModule {}
