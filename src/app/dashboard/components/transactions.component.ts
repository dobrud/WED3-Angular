import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../shared/services';

import { Transaction, TransactionList } from '../../shared/models';

const MAX_YEARS_TO_DISPLAY_IN_FILTER : number = 3;
const MAX_TRANSACTIONS_PER_PAGE : number = 5;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
  public months: Array<Object> = [{
      value: 0,
      name: 'January',
      emoji: '❄️'
    },
    {
      value: 1,
      name: 'February',
      emoji: '❄️'
    },
    {
      value: 2,
      name: 'March',
      emoji: '🌱'
    },
    {
      value: 3,
      name: 'April',
      emoji: '🌱'
    },
    {
      value: 4,
      name: 'May',
      emoji: '🌱'
    },
    {
      value: 5,
      name: 'June',
      emoji: '☀️'
    },
    {
      value: 6,
      name: 'July',
      emoji: '☀️'
    },
    {
      value: 7,
      name: 'August',
      emoji: '☀️'
    },
    {
      value: 8,
      name: 'September',
      emoji: '🍂'
    },
    {
      value: 9,
      name: 'October',
      emoji: '🍂'
    },
    {
      value: 10,
      name: 'November',
      emoji: '🍂'
    },
    {
      value: 11,
      name: 'December',
      emoji: '❄️'
    },
  ];
  public years: Array<number> = new Array<number>();

  public selectedYear: number = new Date().getFullYear();
  public selectedMonth: number = new Date().getMonth();

  public transactions: Transaction[];

  public totalPages: number = 1;
  public currentPage:number = 0;

  constructor(private transactionService: TransactionService) {
    this.currentPage = 0;
    const date: Date = new Date();
    const year: number = date.getFullYear();
    for (let i: number = year; year - MAX_YEARS_TO_DISPLAY_IN_FILTER < i; i--) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.getTransactions();
  }

  handlePagination(evt, delta) {
    this.currentPage += delta;
    this.getTransactions();
  }
  getTransactions() {
    this.transactionService.getTransactionsByYearAndMonth(this.selectedYear, this.selectedMonth, MAX_TRANSACTIONS_PER_PAGE, this.currentPage * MAX_TRANSACTIONS_PER_PAGE).subscribe(
      (data: TransactionList) => {
        this.transactions = data.transactions;
        this.totalPages = Math.ceil(data.total / MAX_TRANSACTIONS_PER_PAGE);
        this.currentPage = Math.floor(data.start / MAX_TRANSACTIONS_PER_PAGE);
      });
  }

  reloadTransactions() {
    this.getTransactions();
  }

}
