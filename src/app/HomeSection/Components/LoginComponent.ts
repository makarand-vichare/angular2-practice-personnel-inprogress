import { AuthService } from './../../AdminSection/Services/AuthService';
import { AppConstants } from './../../Common/AppConstants';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../Common/Components/BaseComponent';
import { Router } from '@angular/router';
import { LOG_LOGGER_PROVIDERS, Logger } from 'angular2-logger/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationVM } from '../../AdminSection/ViewModels/AuthenticationVM';
import { LoginVM } from '../../AdminSection/ViewModels/LoginVM';

@Component({
    selector: 'app-login',
    templateUrl: './../Views/LoginComponent.html',
    styleUrls: ['./../Views/LoginComponent.less']
})

export class LoginComponent extends BaseComponent implements OnInit {
    constructor(_routerService: Router, _logService: Logger, private authService: AuthService,
        _toastr: ToastsManager, _vRef: ViewContainerRef) {
        super(_routerService, _logService, _toastr, _vRef);
    }

    loginVM: LoginVM;

    ngOnInit() {
        const self = this;
         self.loginVM = {
            UserName: '',
            Password: ''
        } as LoginVM;
    }

    Login() {
        const self = this;
        self.authService.Login(self.loginVM).then(function (response: any) {
            if (response.access_token != null) {
                  const path = (response.role === 'admin') ? '/adminlanding' : '/userlanding';
                  self.routerService.navigateByUrl(path);
            }

        })
        .catch(function (response: any) {
            self.ProcessInfo.Message = response.data;
        });
    }
}
