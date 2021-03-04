import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarArtPageRoutingModule } from './agregar-art-routing.module';

import { AgregarArtPage } from './agregar-art.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarArtPageRoutingModule
  ],
  declarations: [AgregarArtPage]
})
export class AgregarArtPageModule {}
