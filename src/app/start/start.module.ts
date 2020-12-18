import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartPageRoutingModule } from './start-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { StartPage } from './start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [StartPage]
})
export class StartPageModule {}
