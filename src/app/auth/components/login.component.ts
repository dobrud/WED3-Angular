import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavigationService} from '../../core/services/navigation.service';

import {AuthService} from '../services';
import {LoginInfo} from '../models';

@Component({
  selector: 'app-wed-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  private backUrl;

  public loginInfo: LoginInfo;

  public isProcessing: boolean = false;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService, route: ActivatedRoute) {
    route.params.subscribe((p: Params) => this.backUrl = p['backUrl']);

    // This part is for DX only, so you don't have to fill in the form every time
    this.loginInfo = new LoginInfo('hmayer', 'abc');
  }

  ngOnInit() {
    this.backUrl = '';
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          if (this.backUrl) {
            this.navigationSvc.goToUrl(this.backUrl);
          } else {
            this.navigationSvc.goToDashboard();
          }
        }
      });
  }

  public doLogin(f: NgForm): boolean {
    if (f.valid) {
      this.isProcessing = true;
      this.autSvc.login(this.loginInfo);
    }
    return false;
  }
}
