import {Account} from '../../auth/models';

export class TransactionInfo {
  constructor(public target: string,
              public amount: string) {
  }

  public static fromDto(data: any): TransactionInfo {
    return new TransactionInfo(data.target, data.amount);
  }

  toDto(): any {
      return {
        target: this.target.toString(), // Todo: why is here toString needed?..
        amount: this.amount.toString()
      };
    }

  }
