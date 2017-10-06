import { Injectable } from '@angular/core';
import { AppConstants } from '../../Common/AppConstants';
import { BaseService } from '../../Common/Services/BaseService';
import { Logger } from 'angular2-logger/core';
import {Http , Response , RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { PlanetVM } from '../ViewModels/PlanetVM';

@Injectable()
export class PlanetService  extends BaseService  {

  constructor(_logService: Logger , _httpService: Http) {
      super(_logService, _httpService);
  }

  GetByPage = (page: number): Promise<any> => {
      const  config = {
              'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token',
              params: {page: page}
      } as RequestOptionsArgs;

      return this.httpService.get(AppConstants.SWAPIUrl + '/planets/', config)
      .map(response => {
         const result = response.json();
         if (result != null) {
          result.results = this.SetRandomDistance(result.results);
          return result;
         }
        return {success: false, message: 'No response from server'};
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
  }
}
