import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BankAccountService, TransactionService} from './services';
import {TransactionResourceService, AccountResourceService} from './resources';
import {MinValidator, MaxValidator, EqualToValidator} from './components';


@NgModule({
  declarations: [
    MinValidator, MaxValidator, EqualToValidator
    // TODO: Add declarations here, if additional components are placed within the shared module
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule, FormsModule, MinValidator, MaxValidator, EqualToValidator
    // TODO: Add declarations here, if additional components are placed within the shared module
  ],
  providers: [
    TransactionService,
    BankAccountService,
    TransactionResourceService,
    AccountResourceService
  ]
})
export class SharedModule {
  // forRoot() isn't needed here...
}
