import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankAccount, TransactionInfo, Transaction, TransactionList } from '../../shared/models';
import { AuthService } from '../../auth/services';
import { BankAccountService, TransactionService } from '../../shared/services';

const MAX_TRANSACTIONS_TO_DISPLAY = 3;

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html'
})
export class ControlPanelComponent implements OnInit {
  public ownAccount: BankAccount;
  public transactions: Transaction[];

  constructor(private bankAccountService: BankAccountService, private transactionService: TransactionService) {
    this.ownAccount = new BankAccount(null, null, null, null);
  }

  ngOnInit() {
    this.getOwnAccount();
    this.getLatestTransactions();
  }

  getOwnAccount() {
    this.bankAccountService.getOwnBankAccount().subscribe(
      (data: BankAccount) => {
        this.ownAccount = data;
      });
  }

  getLatestTransactions() {
    this.transactionService.getTransactions(MAX_TRANSACTIONS_TO_DISPLAY).subscribe(
      (data: TransactionList) => {
        this.transactions = data.transactions;
      });
  }

  reloadControlPanel() {
    this.getOwnAccount();
    this.getLatestTransactions();
  }

}
