import {Injectable} from '@angular/core';

@Injectable()
export class SecurityTokenStore {
  private token:SecurityToken;

  constructor() {
    let user: SecurityToken = JSON.parse(localStorage.getItem('user'));

    if(user) {
      this.token = user;
    }
  }

  public get storedValue():SecurityToken {
    return this.token;
  }

  public set storedValue(value:SecurityToken) {
    this.token = value;
  }
}

export interface SecurityToken {
  token: string,
  owner: any
}
