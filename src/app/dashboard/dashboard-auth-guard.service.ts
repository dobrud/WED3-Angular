import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '../auth/services';
import { NavigationService } from '../core';

@Injectable()
export class DashboardAuthGuard implements CanLoad {

  constructor(private authService: AuthService, private navigationService: NavigationService) {}

  canLoad() {
    if(this.authService.hasCredentials) {
      return true;
    } else {
      this.navigationService.goToUrl('/welcome');
      return false;
    }
  }
}
