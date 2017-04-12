import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {NavigationService} from "../../core/services/navigation.service";

import {AuthService} from "../services";
import {RegistrationInfo} from "../models";

@Component({
  selector: 'wed-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationInfo:RegistrationInfo;
  public confirmPassword:string;

  public isProcessing:boolean = false;

  constructor(private autSvc:AuthService, private navigationSvc: NavigationService) {
    // This part is for DX only, so you don't have to fill in the form every time
    this.registrationInfo = new RegistrationInfo('hmayer', 'abc', 'Hans', 'Mayer');
    this.confirmPassword = 'abc';
  }

  ngOnInit() {
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          this.navigationSvc.goToDashboard();
        }
      });
  }

  public doRegister(f: NgForm):boolean {
    if (f.valid && this.registrationInfo.password === this.confirmPassword) {
      this.isProcessing = true;
      this.autSvc.register(this.registrationInfo);
    }
    return false;
  }
}
