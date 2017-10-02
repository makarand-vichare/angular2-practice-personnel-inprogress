import {Logger} from 'angular2-logger/core';

export class BaseService {
  protected logService: Logger;

  constructor(_logService: Logger) {
      this.logService = _logService;
  }

  Log = (message: string): void => {
    this.logService.log(message);
  }
}
