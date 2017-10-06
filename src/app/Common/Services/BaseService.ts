import {Logger} from 'angular2-logger/core';
import {Http , Response , RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {plainToClass} from 'class-transformer';
import { PlanetVM } from '../../AdminSection/ViewModels/PlanetVM';
import { AppConstants } from '../../Common/AppConstants';

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

  SetRandomDistance = (results: Array<Object>): Array<PlanetVM> => {
    const planets = plainToClass(PlanetVM, results);
    planets.forEach((planet) => {
        planet.Distance = Math.floor(Math.random() * AppConstants.RandomDistance * 2);
    });
    return planets;
  }
}
