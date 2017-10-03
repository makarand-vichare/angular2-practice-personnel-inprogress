import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import {Logger} from 'angular2-logger/core';
import { IDictionary } from '../Interfaces/IDictionary';
import { MessageVM } from '../Viewmodels/MessageVM';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export class BaseComponent {

  protected routerService: Router;
  protected logService: Logger;
  protected toastr: ToastsManager;
  constructor(_routerService: Router, _logService: Logger, _toastr: ToastsManager, vRef: ViewContainerRef) {
      this.routerService = _routerService;
      this.logService = _logService;
      this.toastr = _toastr;
      this.toastr.setRootViewContainerRef(vRef);
  }

  ProcessInfo = { Message: '' } as MessageVM;

  InfoMessage = () => {
    this.toastr.info('App Demo', 'This feature is not yet implmented.');
  }
  StartProcess() {
       this.ProcessInfo = {
          Message: 'loading..',
          Loading: true,
          IsSucceed: false
      };
  }

  EndProcess(message: string, isSucceed: boolean) {
      this.ProcessInfo = {
          Message: message,
          Loading: false,
          IsSucceed: isSucceed
      };
  }

  GetQueryStringData = (url: string): string => {
      const indexQuestionMark = url.indexOf('?');
      if (indexQuestionMark >= 0) {
          return url.substr(indexQuestionMark + 1);
      } else {
          return '';
      }
  }

  GetFragment = (url: string): IDictionary<string> => {
      const queryStringData = this.GetQueryStringData(url);
      if (queryStringData.length >= 0) {
          return this.ParseQueryString(queryStringData);
      } else {
          return {};
      }
  }

  ParseQueryString = (queryString: string): IDictionary<string> => {
      const data: IDictionary<string> = {};
      let pairs: Array<string>;
      let pair: string;
      let separatorIndex: number;
      let escapedKey: string;
      let escapedValue: string;
      let key: string;
      let value: string;

      if (queryString === null) {
          return data;
      }

      pairs = queryString.split('&');

      for (let i = 0; i < pairs.length; i++) {
          pair = pairs[i];
          separatorIndex = pair.indexOf('=');

          if (separatorIndex === -1) {
              escapedKey = pair;
              escapedValue = null;
          } else {
              escapedKey = pair.substr(0, separatorIndex);
              escapedValue = pair.substr(separatorIndex + 1);
          }

          key = decodeURIComponent(escapedKey);
          value = decodeURIComponent(escapedValue);

          data[key] = value;
      }

      return data;
  }

}
