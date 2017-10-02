import { Injectable } from '@angular/core';
import { AppConstants } from '../../Common/AppConstants';
import { BaseService } from '../../Common/Services/BaseService';
import { Logger } from 'angular2-logger/core';
import {Http , Response , RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PlanetService  extends BaseService  {

  httpService: Http;
  constructor(_logService: Logger , _httpService: Http) {
      super(_logService);
  }

  GetByPage = (page: number): Promise<any> => {
      const  config = {
              'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token',
              params: {page: page}
      } as RequestOptionsArgs;

      return this.httpService.get(AppConstants.SWAPIUrl + '/planets/', config).map(response => {
        return response.json() || {success: false, message: 'No response from server'};
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
  }

  GetByUrl = (url: string): Promise<any> => {
      const  config = {
        'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token'
      } as RequestOptionsArgs;

      return this.httpService.get(url, config).map(response => {
        return response.json() || {success: false, message: 'No response from server'};
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
  }
}
