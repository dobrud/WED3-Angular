import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs';

import { ResourceBase } from './resource-base';
import { Transaction, TransactionList, TransactionInfo } from '../models';

@Injectable()
export class TransactionResourceService extends ResourceBase {

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

  private getTransactionsWithQuery(queryString:string): Observable<TransactionList> {
    
    return this.get('/accounts/transactions' + queryString)
      .map((response: Response) => {
        const responseJson = response.json();
        if (responseJson) {
          return new TransactionList(responseJson.query.resultcount, responseJson.query.skip, Transaction.fromDtoArray(responseJson.result));
        }
        return null;
      })
      .catch((error: any) => {
        return Observable.of<TransactionList>(null);
      });
  }

  public getTransactions(count: number, skip?: number): Observable<TransactionList> {
    return this.getTransactionsWithQuery(`?count=${count}&skip=${skip}`);
  }

  public getTransactionsByYearAndMonth(year: number,
                                  month: number,
                                  count?: number,
                                  skip?: number): Observable<TransactionList> {
    const fromDate: Date = new Date(year, month, 1, 0, 0, 0, 0);
    const toDate: Date = new Date(fromDate);
    toDate.setMonth(month + 1);

    return this.getTransactionsWithQuery(`?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}&skip=${skip}&count=${count}`);
  }
}
