import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankAccount, TransactionInfo, Transaction } from '../../shared/models';
import { BankAccountService, TransactionService } from '../../shared/services';

@Component({
  selector: 'app-new-transaction-form',
  templateUrl: './new-transaction-form.component.html',
  styleUrls: ['./new-transaction-form.component.scss']
})
export class NewTransactionFormComponent implements OnInit {
  public transactionInfo: TransactionInfo;
  public targetAccount: BankAccount;
  public validBankAccount: boolean;
  public validAmount: boolean;
  public transferSuccessful: boolean = false;
  public transferFailed: boolean = false;
  public latestTransactionAmount: string;
  public latestTransactionTarget: string;
  public isProcessing: boolean = false;

  @Input()
  public ownAccount: BankAccount;

  @Output()
  public transactionDone: EventEmitter<string> = new EventEmitter();

  constructor(private bankAccountService: BankAccountService, private transactionService: TransactionService) {
    this.transactionInfo = new TransactionInfo(null, null);
  }

  ngOnInit() {
  }

  hasMinimumLength(): boolean {
    return String(this.transactionInfo.target).length >= 7;
  }
  isOtherAccount() {
    return this.transactionInfo.target !== this.ownAccount.accountNr;
  }

  isValidAccountNumber(): void {
    if (!this.hasMinimumLength() || !this.isOtherAccount()) {
      this.validBankAccount = null;
      this.targetAccount = null;
      return;
    }

    this.bankAccountService.getBankAccountByAccountNr(this.transactionInfo.target).subscribe(
      (data: BankAccount) => {
        if (data) {
          this.validBankAccount = true;
          this.targetAccount = data;
        } else {
          this.validBankAccount = false;
          this.targetAccount = null;
        }
      }
    );
  }

  isValidAmount(): void {
    this.validAmount = Number.parseFloat(this.transactionInfo.amount) <= Number.parseFloat(this.ownAccount.amount);
  }

  doTransaction(form: NgForm) {
    if (form.valid) {
      this.isProcessing = true;
      this.transactionService.transact(this.transactionInfo).subscribe(
        (data: Transaction) => {
          if (data) {
            this.transferSuccessful = true;
            this.latestTransactionAmount = this.transactionInfo.amount;
            this.latestTransactionTarget = this.transactionInfo.target;
            this.transactionDone.emit('reload account');
            form.resetForm();
          } else {
            this.transferFailed = true;
          }
          this.isProcessing = false;
        }
      );
    }

    return false;
  }

  newTransaction() {
    this.transferSuccessful = false;
    this.transferFailed = false;
    this.validBankAccount = false;
    this.targetAccount = null;
    this.transactionInfo = new TransactionInfo(null, null);
    this.latestTransactionAmount = null;
    this.latestTransactionTarget = null;
  }
}
