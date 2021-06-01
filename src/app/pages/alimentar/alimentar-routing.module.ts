import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentarPage } from './alimentar.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentarPageRoutingModule {}
