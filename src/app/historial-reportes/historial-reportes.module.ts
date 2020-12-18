import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialReportesPageRoutingModule } from './historial-reportes-routing.module';

import { HistorialReportesPage } from './historial-reportes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialReportesPageRoutingModule,
  ],
  declarations: [HistorialReportesPage]
})
export class HistorialReportesPageModule {}
