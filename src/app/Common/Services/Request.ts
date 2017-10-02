import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConstants } from '../../Common/AppConstants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class Request {

  constructor(public http: Http) {

  }

  get(url): Promise<any> {
    return this.http.get(AppConstants.SWAPIUrl + url).map(response => {
      return response.json() || { success: false, message: 'No response from server' };
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

  post(url, data): Promise<any> {
    return this.http.post(AppConstants.SWAPIUrl + url, data).map(response => {
      return response.json() || { success: false, message: 'No response from server' };
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }
}

// import { Request } from "./Request";
// authenticate()
// {
// 	this.request.get("/user").then(response => {
// 		console.log("Got response:", response);
// 	}).catch(error => {
// 		console.log("Got error:", error);
// 	}).then(response => {
// 		console.log("Another response:", response);
// 	}).catch(error => {
// 		console.log("Got another error:", error);
// 	});
// }
