import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs';

import { ResourceBase } from '../../auth/resources';
import { Transaction, TransactionInfo } from '../models';

@Injectable()
export class TransactionService extends ResourceBase {

  constructor(http: Http) {
    super(http);
  }

  public transact(model:TransactionInfo):Observable<Transaction> {

    return this.post('/accounts/transactions', model.toDto())
      .map((response: Response) => {
        let result = response.json();
        if (result) {
          return Transaction.fromDto(result);
        }
        return null;
      })
      .catch((error:any) => {
        return Observable.of<Transaction>(null);
      });
  }
}
