import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { BankAccount } from '../models';
import { ResourceBase } from '../../auth/resources';

@Injectable()
export class BankAccountService extends ResourceBase {

  constructor(http: Http) {
    super(http);
  }

  public getOwnBankAccount():Observable<BankAccount> {
    return this.get('/accounts')
      .map((response: Response) => {
        let result = response.json();
        if (result) {
          return BankAccount.fromDto(result);
        }
        return null;
      })
      .catch((error:any) => {
        return Observable.of<BankAccount>(null);
      });
  }

  public getBankAccountByAccountNr(id: string):Observable<BankAccount> {
    return this.get(`/accounts/${id}`)
      .map((response: Response) => {
        let result = response.json();
        if (result) {
          return BankAccount.fromDto(result);
        }
        return null;
      })
      .catch((error:any) => {
        return Observable.of<BankAccount>(null);
      });
  }


}
