import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
