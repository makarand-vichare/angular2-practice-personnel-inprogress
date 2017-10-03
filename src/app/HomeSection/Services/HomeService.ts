import { Injectable } from '@angular/core';
import { AppConstants } from '../../Common/AppConstants';
import { BaseService } from '../../Common/Services/BaseService';
import { Logger } from 'angular2-logger/core';
import {Http , Response , RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HomeService  extends BaseService  {

  constructor(_logService: Logger , _httpService: Http) {
      super(_logService, _httpService);
  }

  GetTestValuesList(): Promise<any> {
    return this.httpService.get(AppConstants.AuthAPIUrl + '/api/TestApi').map(response => {
      return response.json() || {success: false, message: 'No response from server'};
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }
}
