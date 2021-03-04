import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAdministracionPageRoutingModule } from './inicio-administracion-routing.module';

import { InicioAdministracionPage } from './inicio-administracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioAdministracionPageRoutingModule
  ],
  declarations: [InicioAdministracionPage]
})
export class InicioAdministracionPageModule {}
