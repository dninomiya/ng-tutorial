import { NgModule } from '@angular/core';

import { TopRoutingModule } from './top-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopComponent } from './top/top.component';


@NgModule({
  declarations: [TopComponent],
  imports: [
    TopRoutingModule,
    SharedModule
  ]
})
export class TopModule { }
