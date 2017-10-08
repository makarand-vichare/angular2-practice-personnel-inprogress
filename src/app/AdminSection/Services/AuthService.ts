import { LoginVM } from './../ViewModels/LoginVM';
import { AuthenticationVM } from './../ViewModels/AuthenticationVM';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import { BaseService } from '../../Common/Services/BaseService';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { AppConstants } from '../../Common/AppConstants';
import { AuthorizationVM } from '../ViewModels/AuthorizationVM';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService extends BaseService {

  constructor(_logService: Logger, _httpService: Http, private localStorageService: LocalStorageService) {
    super(_logService, _httpService);
  }

  isAuth = false;
  authVM: AuthenticationVM = {
    IsAuth: this.isAuth,
    UserName: '',
    Id: 0,
    Role: ''
  };

  Login = (loginData:  LoginVM): Promise<any> => {
    const self = this;
    const data = 'grant_type=password&username=' + loginData.UserName + '&password=' + loginData.Password;
    const  config = {
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token'
      } as RequestOptionsArgs;

      return self.httpService.post(AppConstants.AuthAPIUrl + '/token', data, config).map(response => {
        const result = response.json();
        if (result != null) {
          self.localStorageService.store('authorizationData',
          {
            Token: result.access_token,
            UserName: loginData.UserName,
            Id: result.id,
            Role: result.role
          } as AuthorizationVM);

          self.authVM.IsAuth = !self.isAuth;
          self.authVM.UserName = loginData.UserName;
          self.authVM.Id = result.id;
          self.authVM.Role = result.role;

         return result;
        }
       return {success: false, message: 'No response from server'};
     }).catch((error: Response | any) => {
       return Observable.throw(error.json());
     }).toPromise();
  }

  LogOut = () => {
    const self = this;
    self.localStorageService.clear('authorizationData');
    self.authVM.IsAuth = self.isAuth;
    self.authVM.Id = 0;
    self.authVM.UserName = '';
    self.authVM.Role = '';
  }

  GetAuthData = (): AuthenticationVM => {
    const self = this;
    const authData = self.localStorageService.retrieve('authorizationData') as AuthorizationVM;
    if (authData != null) {
      self.authVM.IsAuth = !self.isAuth;
      self.authVM.UserName = authData.UserName;
      self.authVM.Id = authData.Id;
      self.authVM.Role = authData.Role;
    }
    return self.authVM;
  }

  GetAntiForgeryToken = (): Promise<any> => {
    const self = this;

    return self.httpService.get(AppConstants.AuthAPIUrl + '/api/Antiforgerytoken/GetAntiForgeryToken')
    .map(response => {
      const result = response.json();
       return result || {success: false, message: 'No response from server'};
   }).catch((error: Response | any) => {
     return Observable.throw(error.json());
   }).toPromise();
  }
}
