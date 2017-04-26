import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs';

import { Transaction, TransactionInfo, TransactionList } from '../models';
import {TransactionResourceService} from '../resources';

@Injectable()
export class TransactionService{

  constructor(private resource: TransactionResourceService) {

  }
  public transact(model: TransactionInfo): Observable<Transaction> {
    return this.resource.transact(model);
  }

  public getTransactions(count: number, skip?: number): Observable<TransactionList> {
    return this.resource.getTransactions(count, skip);
  }

  public getTransactionsByYearAndMonth(year: number,
                                  month: number,
                                  count?: number,
                                  skip?: number): Observable<TransactionList> {
    return this.resource.getTransactionsByYearAndMonth(year, month, count, skip);
  }
}
