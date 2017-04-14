import {Account} from '../../auth/models';

export class Transaction {
  constructor(public from: Account,
              public target: Account,
              public amount: number,
              public total: number,
              public date: Date) {
  }

  public static fromDto(data: any): Transaction {
    return new Transaction(data.from, data.target, data.amount, data.total, data.date);
  }

  toDto(): any {
    if(this.from instanceof Account && this.target instanceof Account) {
      return {
        from: this.from.accountNr,
        target: this.target.accountNr,
        amount: this.amount,
        total: this.total,
        date: this.date
      };
    }

  }
}
