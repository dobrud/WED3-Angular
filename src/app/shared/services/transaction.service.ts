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

  public transact(model: TransactionInfo): Observable<Transaction> {
    return this.post('/accounts/transactions', model.toDto())
      .map((response: Response) => {
        const result = response.json();
        if (result) {
          return Transaction.fromDto(result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Transaction>(null);
      });
  }

  public getTransactions(count: number, skip?: number): Observable<Transaction[]> {
    const queryString = `?count=${count}&skip=${skip}`;
    return this.get('/accounts/transactions' + queryString)
      .map((response: Response) => {
        const responseJson = response.json();
        if (responseJson) {
          return Transaction.fromDtoArray(responseJson.result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Transaction[]>(null);
      });
  }

  public getTransactionsByYearAndMonth(year: number,
                                  month: number,
                                  count?: number,
                                  skip?: number): Observable<Transaction[]> {
    const fromDate: Date = new Date(year, month, 1, 0, 0, 0, 0);

    const toDate: Date = new Date(fromDate);
    toDate.setMonth(month + 1);

    const queryString = `?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}&skip=${skip}`;

    return this.get('/accounts/transactions' + queryString)
      .map((response: Response) => {
        const responseJson = response.json();
        if (responseJson) {
          return Transaction.fromDtoArray(responseJson.result);
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<Transaction[]>(null);
      });
  }
}
