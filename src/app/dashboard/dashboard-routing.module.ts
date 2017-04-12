import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ControlPanelComponent, TransactionListComponent } from './components';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent, // TODO: Add initial router outlet dashboard component...
    children: [
      { path: '', component: ControlPanelComponent },
      { path: 'transactions', component: TransactionListComponent }    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
