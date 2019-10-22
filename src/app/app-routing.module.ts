import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./top/top.module').then(mod => mod.TopModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
