import { Injectable } from '@angular/core';
import { AppConstants } from './../../Common/AppConstants';
import { BaseService } from './../../Common/Services/BaseService';
import { Logger } from 'angular2-logger/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { plainToClass } from 'class-transformer';
import { StarShipTravelVM } from './../ViewModels/StarShipTravelVM';

@Injectable()
export class StarShipTravelService extends BaseService {

  constructor(_logService: Logger, _httpService: Http) {
    super(_logService, _httpService);
  }

  GetStarShipsResupplyWithObserables = (url: string, planetDistance: number): Observable<any> => {
    const self = this;
    const config = {
      'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token'
    } as RequestOptionsArgs;

    return self.httpService.get(url, config)
      .map((response) => {
        return response.json() || { success: false, message: 'No response from server' };
      })
      .map((data: any) => {
        const starships = plainToClass(StarShipTravelVM, data.results);
        data.results = self.CalculateReSupplyCount(starships, planetDistance);
        return data;
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      });
  }

  GetShipsSupplyCountWithObserables = (planetDistance: number): Observable<any> => {
    const self = this;
    const config = {
      'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token'
    } as RequestOptionsArgs;

    return self.httpService.get(AppConstants.SWAPIUrl + '/starships/', config)
      .map((response) => {
        return response.json() || { success: false, message: 'No response from server' };
      })
      .map((data: any) => {
        const starships = plainToClass(StarShipTravelVM, data.results);
        data.results = self.CalculateReSupplyCount(starships, planetDistance);
        return data;
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      });
  }

  // GetShipsSupplyCountWithPromise = (planetDistance: number): Promise<any> => {
  //   const self = this;
  //   const config = {
  //     'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token'
  //   } as RequestOptionsArgs;

  //   var defer = this.Promise.defer();
  //   self.httpService.get(AppConstants.SWAPIUrl + '/starships/', config)
  //       .map(function (response: any) {
  //           response.data.results = self.CalculateReSupplyCount(response.data.results, planetDistance);
  //           defer.resolve(response);
  //       })
  //       .catch((error: Response | any) => {
  //         return Observable.throw(error.json());
  //       }).toPromise();
  //   return defer.promise;
  // }

  private CalculateReSupplyCount = (starShips: Array<StarShipTravelVM>, planetDistance: number)
    : Array<StarShipTravelVM> => {
    const self = this;
    starShips.forEach((starship) => {
      const unknown = 'unknown';
      const resupplyCount = (starship.MGLT === unknown || starship.consumables === unknown)
        ? unknown : (planetDistance / Number(starship.MGLT)) / self.GetConsumablesInHour(starship.consumables);
      // stopsNeeded = hours required to reach the distance divided by food available per hour
      starship.ReSupplyCount = (resupplyCount === unknown) ? resupplyCount : Math.floor(Number(resupplyCount)).toString();
    });
    return starShips;
  }

  private GetConsumablesInHour = (consumables: string): number => {
    let result = 0;
    const splitArray = consumables.split(' ');
    switch (splitArray[1]) {
      case 'days':
      case 'day':
        {
          result = Number(splitArray[0]) * 24;
          break;
        }
      case 'weeks':
      case 'week':
        {
          result = Number(splitArray[0]) * 24 * 7;
          break;
        }
      case 'months':
      case 'month':
        {
          result = Number(splitArray[0]) * 24 * 30;
          break;
        }
      case 'years':
      case 'year':
        {
          result = Number(splitArray[0]) * 24 * 365;
          break;
        }
    }

    return result;
  }

}
