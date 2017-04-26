import {Account} from '../../auth/models';

// TODO: If this was a real app; we need to devide how to handle money amounts. floats/numbers should not be used because of 
// reounding issues; therefore we use strings to represent amounts. Needs to be checked on the serverside as well becuase that is 
// where the actual transactions/amounts are modified.
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
        amount: Number.parseFloat(this.amount)//TODO: DANGER: see comment on top of this file for money as floats...
      };
    }

  }
