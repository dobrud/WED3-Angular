import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavigationService} from '../../core/services/navigation.service';

import {AuthService} from '../services';
import {RegistrationInfo} from '../models';

@Component({
  selector: 'app-wed-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  public registrationInfo: RegistrationInfo;
  public confirmPassword: string;

  public isProcessing: boolean = false;

  constructor(private authService: AuthService, private navigationService: NavigationService) {
    // This part is for DX only, so you don't have to fill in the form every time
    this.registrationInfo = new RegistrationInfo('hmayer', 'abc', 'Hans', 'Mayer');
    this.confirmPassword = 'abc';
  }

  ngOnInit() {
    this.authService.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          this.navigationService.goToDashboard();
        }
      });
  }

  public doRegister(f: NgForm): boolean {
    if (f.valid && this.registrationInfo.password === this.confirmPassword) {
      this.isProcessing = true;
      this.authService.register(this.registrationInfo);
    }
    return false;
  }
}
