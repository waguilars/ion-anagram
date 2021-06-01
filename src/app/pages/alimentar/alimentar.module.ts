import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentarPageRoutingModule } from './alimentar-routing.module';

import { AlimentarPage } from './alimentar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentarPageRoutingModule
  ],
  declarations: [AlimentarPage]
})
export class AlimentarPageModule {}
