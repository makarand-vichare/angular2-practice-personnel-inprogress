import { AuthService } from '../../AdminSection/Services/AuthService';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';
import { AuthenticationVM } from '../../AdminSection/ViewModels/AuthenticationVM';
// import {Location} from '@angular/common';

@Component({
  selector: 'app-login-menu',
  templateUrl: './LoginMenuComponent.html',
  styleUrls: ['./LoginMenuComponent.css'],
  providers: [AuthService, LOG_LOGGER_PROVIDERS]
})

export class LoginMenuComponent implements OnInit {
  constructor(private authService: AuthService , private routerService: Router, private locationService: Location) {
  }

  authenticationVM: AuthenticationVM;

  ngOnInit() {
    const self = this;
    self.authenticationVM =  self.authService.authVM;
  }

  LogOut() {
    const self = this;
    self.authService.LogOut();
    self.routerService.navigateByUrl('/home');
   // self.locationService.go('/home');
  }
}
