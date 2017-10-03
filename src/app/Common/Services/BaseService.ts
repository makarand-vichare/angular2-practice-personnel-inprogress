import {Logger} from 'angular2-logger/core';
import {Http , Response , RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class BaseService {
  protected logService: Logger;
  protected httpService: Http;

  constructor(_logService: Logger, _httpService: Http) {
      this.logService = _logService;
      this.httpService = _httpService;
  }

  Log = (message: string): void => {
    this.logService.log(message);
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
