import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../shared/services';

import { Transaction } from '../../shared/models';

const MAX_YEARS_TO_DISPLAY_IN_FILTER = 3;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
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

  constructor(private transactionService: TransactionService) {
    const date: Date = new Date();
    const year: number = date.getFullYear();
    for (let i: number = year; year - MAX_YEARS_TO_DISPLAY_IN_FILTER < i; i--) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactionsByYearAndMonth(this.selectedYear, this.selectedMonth).subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
      });
  }

  reloadTransactions() {
    this.getTransactions();
  }

}
