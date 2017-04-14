import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from "../shared/shared.module";

import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from './dashboard.component';
import {DashboardAuthGuard} from './services';
import { AuthModule } from '../auth/auth.module';
import { ControlPanelComponent, TransactionListComponent, NewTransactionFormComponent } from './components';
import { RequestOptions } from '@angular/http';
import { AuthRequestOptions } from '../auth/resources'
import { SecurityTokenStore } from '../auth/services/credential-management'

@NgModule({
  declarations: [
    // Declarations (Components / Directives) used from/within the Module
    DashboardComponent,
    ControlPanelComponent,
    TransactionListComponent,
    NewTransactionFormComponent
  ],
  imports: [
    // Other Modules to import (imports the exported Components/Directives from the other module)
    SharedModule, DashboardRoutingModule, AuthModule
  ],
  exports: [
    // Components/Directives (or even Modules) to export (available for other modules; and forRoot() )
    DashboardComponent
  ],
  providers: [
    // DI Providers (Services, Tokens, Factories...), may be instantiated multiple times
    DashboardAuthGuard
  ]
})
export class DashboardModule {
  static forRoot(config?:{}) : ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [ {
          provide: RequestOptions,
          useFactory: (tS) => new AuthRequestOptions(tS),
          deps: [SecurityTokenStore]
      }]
    };
  }

}
