import { AuthService } from '../../AdminSection/Services/AuthService';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationVM } from '../../AdminSection/ViewModels/AuthenticationVM';

@Component({
  selector: 'app-login-menu',
  templateUrl: './../Views/LoginMenuComponent.html',
  styleUrls: ['./../Views/LoginMenuComponent.less']
})

export class LoginMenuComponent implements OnInit {
  constructor(private authService: AuthService , private routerService: Router) {
  }

  authenticationVM: AuthenticationVM;

  ngOnInit() {
    const self = this;
    self.authenticationVM = self.authService.GetAuthData();
   }

  LogOut() {
    const self = this;
    self.authService.LogOut();
    self.routerService.navigateByUrl('/home');
   // self.locationService.go('/home');
  }
}
