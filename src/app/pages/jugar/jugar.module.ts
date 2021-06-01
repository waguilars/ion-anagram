import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { JugarPageRoutingModule } from './jugar-routing.module';

import { JugarPage } from './jugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    JugarPageRoutingModule,
    FormsModule
  ],
  declarations: [JugarPage]
})
export class JugarPageModule {}
