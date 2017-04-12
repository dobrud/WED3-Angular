import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '../auth/services/auth.service'

@Injectable()
export class DashboardAuthGuard implements CanLoad {

  constructor(private authService: AuthService) {}

  canLoad() {
    return this.authService.hasCredentials;
  }
}
