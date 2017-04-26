import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../../shared/models';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @Input()
  public transactions: Transaction[];

  @Input()
  public showDate: boolean = false;

  @Input()
  public hidePagination: boolean = false;

  @Input()
  public currentPage: Number = 0;

  @Input()
  public totalPages: Number = 0;

  @Output()
  public onPrevPage: EventEmitter<Number> = new EventEmitter();

  @Output()
  public onNextPage: EventEmitter<Number> = new EventEmitter();

  constructor() { }

  ngOnInit() {  }

}
