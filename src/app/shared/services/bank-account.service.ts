import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { BankAccount } from '../models';
import { AccountResourceService } from '../resources';

@Injectable()
export class BankAccountService {

  constructor(private resource: AccountResourceService) {
  }

  public getOwnBankAccount(): Observable<BankAccount> {
    return this.resource.getOwnBankAccount();
  }

  public getBankAccountByAccountNr(id: string): Observable<BankAccount> {
    return this.resource.getBankAccountByAccountNr(id);
  }

}
