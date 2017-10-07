import { StarShipService } from './../Services/StarShipService';
import { AppConstants } from './../../Common/AppConstants';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../Common/Components/BaseComponent';
import { StarShipVM } from '../ViewModels/StarShipVM';
import {Router} from '@angular/router';
import {LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';
import {plainToClass} from 'class-transformer';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-starship',
  templateUrl: './../Views/StarShipComponent.html',
  styleUrls: ['./../Views/StarShipComponent.less'],
  providers: [StarShipService , LOG_LOGGER_PROVIDERS]
})

export class StarShipComponent extends BaseComponent implements OnInit {
  constructor(_routerService: Router, _logService: Logger, private starShipService: StarShipService,
        _toastr: ToastsManager, _vRef: ViewContainerRef) {
      super(_routerService , _logService, _toastr, _vRef);
  }

  model: {
    starships: Array<StarShipVM>,
    next: string,
    previous: string
  } ;

  ngOnInit() {
    const self = this;
    self.GetStarShips(1);
    self.model = {
      starships: new Array<StarShipVM>(),
      next: '',
      previous: ''
    };
  }

  GetStarShips = (page: number) => {
     const self = this;
     self.StartProcess();

     self.starShipService.GetByPage(page)
          .then(function (response: any) {
            self.model.starships = response.results;
            self.model.next = response.next;
            self.model.previous = response.previous;

            self.ProcessInfo.IsSucceed = true;
            self.ProcessInfo.Message = 'suceeded';
            self.ProcessInfo.Loading = false;
          })
          .catch(function (response: any) {
            self.ProcessInfo.Message = 'failed';
            self.ProcessInfo.Loading = false;
          });
  }

  GetByUrl = (url: string) => {
    const self = this;
    self.StartProcess();
    self.starShipService.GetByUrl(url)
          .then(function (response: any) {
            self.model.starships = response.results;
            self.model.next = response.next;
            self.model.previous = response.previous;
            self.ProcessInfo.IsSucceed = true;
              self.ProcessInfo.Message = 'suceeded';
              self.ProcessInfo.Loading = false;
          })
          .catch(function (response: any) {
              self.ProcessInfo.Message = 'failed';
              self.ProcessInfo.Loading = false;
          });
  }
}
