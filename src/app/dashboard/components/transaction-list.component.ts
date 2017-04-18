import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../shared/models';
import { TransactionService } from '../../shared/services';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  @Input()
  public transactions: Transaction[];

  @Input()
  public showDate: boolean = false;

  constructor() { }

  ngOnInit() {  }

}
