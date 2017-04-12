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

  public password:string;
  public passwordConfirm:string;
  public firstName:string;
  public lastName:string;
  public username:string;

  public isProcessing:boolean = false;

  constructor(private autSvc:AuthService, private navigationSvc: NavigationService) {
    // This part is for DX only, so you don't have to fill in the form every time
    this.firstName = "Hans";
    this.lastName = "Mayer"
    this.username = "hmayer";
    this.password = "abc";
    this.passwordConfirm = "abc";
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
    if (f.valid && this.password === this.passwordConfirm) {
      this.isProcessing = true;
      this.autSvc.register(new RegistrationInfo(
        this.username,
        this.password,
        this.firstName,
        this.lastName));
    }
    return false;
  }
}
