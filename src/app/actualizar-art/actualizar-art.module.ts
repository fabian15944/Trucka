import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarArtPageRoutingModule } from './actualizar-art-routing.module';

import { ActualizarArtPage } from './actualizar-art.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarArtPageRoutingModule
  ],
  declarations: [ActualizarArtPage]
})
export class ActualizarArtPageModule {}
