import {Account} from '../../auth/models';

export class TransactionInfo {
  private _target: string;
  private _amount: string;

  public static fromDto(data: any): TransactionInfo {
    return new TransactionInfo(data.target, data.amount);
  }

  constructor(target: string, amount: string) {
    this.target = target;
    this.amount = amount;
  }

  get target(): string {
    return this._target;
  }

  set target(value: string) {
    if (value) {
      this._target = value.toString();
    }
  }

  get amount(): string {
    return this._amount;
  }

  set amount(value: string) {
    if (value) {
      this._amount = value.toString();
    }
  }

  toDto(): any {
      return {
        target: this.target,
        amount: this.amount
      };
    }

  }
