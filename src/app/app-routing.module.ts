import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAuthGuard } from './dashboard/services';

const appRoutes: Routes = [

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [DashboardAuthGuard] },
  { path: '**', redirectTo: '/welcome' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
