/// <reference path="../../../../node_modules/@types/toastr/index.d.ts" />
import { PlanetService } from './../Services/PlanetService';
import { AppConstants } from './../../Common/AppConstants';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../Common/Components/BaseComponent';
import { PlanetVM } from '../ViewModels/PlanetVM';
import {Router} from '@angular/router';
import {LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';

@Component({
  selector: 'app-planet',
  templateUrl: './PlanetComponent.html',
  providers: [PlanetService , LOG_LOGGER_PROVIDERS]
})

export class PlanetComponent extends BaseComponent implements OnInit {
  constructor(_routerService: Router, _logService: Logger, private planetService: PlanetService) {
      super(_routerService , _logService);
  }

  model = {
      planets: new Array<PlanetVM>(),
      next: '',
      previous: ''
  };

  ngOnInit() {
    this.GetPlanets(1);
  }

  GetPlanets = (page: number) => {
      this.StartProcess();

      this.planetService.GetByPage(page)
          .then(function (response: any) {
              this.model.planets = this.SetRandomDistance(response.data.results);
              this.model.next = response.data.next;
              this.model.previous = response.data.previous;

              this.ProcessInfo.IsSucceed = true;
              this.ProcessInfo.Message = response.data.message;
              this.ProcessInfo.Loading = false;
          })
          .catch(function (response: any) {
              this.ProcessInfo.Message = response.data.message;
              this.ProcessInfo.Loading = false;
          });
  }

  GetByUrl = (url: string) => {
      this.StartProcess();
      this.planetService.GetByUrl(url)
          .then(function (response: any) {
              this.model.planets = this.SetRandomDistance(response.data.results);
              this.model.next = response.data.next;
              this.model.previous = response.data.previous;
              this.ProcessInfo.IsSucceed = true;
              this.ProcessInfo.Message = response.data.message;
              this.ProcessInfo.Loading = false;
          })
          .catch(function (response: any) {
              this.ProcessInfo.Message = response.data.message;
              this.ProcessInfo.Loading = false;
          });
  }

  InfoMessage = () => {
      toastr.info('App Demo', 'This feature is not yet implmented.');
  }

  private SetRandomDistance = (planets: Array<PlanetVM>): Array<PlanetVM> => {
      planets.forEach((planet) => {
          planet.Distance = Math.floor(Math.random() * AppConstants.RandomDistance * 2);
      });
      return planets;
  }
}
