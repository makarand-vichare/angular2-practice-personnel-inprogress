import { PlanetService } from './../Services/PlanetService';
import { AppConstants } from './../../Common/AppConstants';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../Common/Components/BaseComponent';
import { PlanetVM } from '../ViewModels/PlanetVM';
import {Router} from '@angular/router';
import {LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-planet',
  templateUrl: './../Views/PlanetComponent.html',
  styleUrls: ['./../Views/PlanetComponent.less'],
  providers: [PlanetService]
})

export class PlanetComponent extends BaseComponent implements OnInit {
  constructor(_routerService: Router, _logService: Logger, private planetService: PlanetService,
        _toastr: ToastsManager, _vRef: ViewContainerRef) {
          super(_routerService , _logService, _toastr, _vRef);
  }

  model: {
    planets: Array<PlanetVM>,
    next: string,
    previous: string
  } ;

  ngOnInit() {
    const self = this;
    self.GetPlanets(1);
    self.model = {
      planets: new Array<PlanetVM>(),
      next: '',
      previous: ''
    };
  }

  GetPlanets = (page: number) => {
     const self = this;
     self.StartProcess();

     self.planetService.GetByPage(page)
          .then(function (response: any) {
            self.model.planets = response.results;
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
    self.planetService.GetByUrl(url)
          .then(function (response: any) {
            self.model.planets = response.results;
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
