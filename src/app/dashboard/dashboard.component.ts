import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import { NavigationService } from '../core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private navigationService: NavigationService) { }

  ngOnInit() {
  }

}
