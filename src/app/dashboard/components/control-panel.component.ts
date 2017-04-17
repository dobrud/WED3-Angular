import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankAccount, TransactionInfo, Transaction } from '../../shared/models';
import { AuthService } from '../../auth/services';
import { BankAccountService } from '../../shared/services';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  public ownAccount: BankAccount;

  constructor(private bankAccountService: BankAccountService) {
    this.ownAccount = new BankAccount(null, null, null, null);
  }

  ngOnInit() {
    this.getOwnAccount();
  }

  getOwnAccount() {
    this.bankAccountService.getOwnBankAccount().subscribe(
      (data: BankAccount) => {
        this.ownAccount = data;
    } );
  }


}
