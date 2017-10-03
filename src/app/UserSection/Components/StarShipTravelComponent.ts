import { Response } from '@angular/http';
import { StarShipTravelService } from './../Services/StarShipTravelService';
import { AppConstants } from './../../Common/AppConstants';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../Common/Components/BaseComponent';
import { StarShipTravelVM } from '../ViewModels/StarShipTravelVM';
import { PlanetVM } from '../../AdminSection/ViewModels/PlanetVM';
import { Router} from '@angular/router';
import { LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';
import { plainToClass} from 'class-transformer';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PlanetService } from '../../AdminSection/Services/PlanetService';

@Component({
  selector: 'app-shiptravel',
  templateUrl: './../Views/StarShipTravelComponent.html',
  providers: [StarShipTravelService , LOG_LOGGER_PROVIDERS]
})

export class StarShipTravelComponent extends BaseComponent implements OnInit {
  constructor(_routerService: Router, _logService: Logger, private planetService: PlanetService,
         private starShipTravelService: StarShipTravelService,
        _toastr: ToastsManager, _vRef: ViewContainerRef) {
      super(_routerService , _logService, _toastr, _vRef);
  }

  starshipModel: {
    starships: Array<StarShipTravelVM>,
    next: string,
    previous: string
  } ;

  planetDistance: number = AppConstants.RandomDistance;
  invalidDistance = false;

  ngOnInit() {
    const self = this;
    // self.GetPlanets(1);
    self.starshipModel = {
      starships: new Array<StarShipTravelVM>(),
      next: '',
      previous: ''
    };
  }


  // OpenStarshipModel = (starship: StarShipTravelVM) => {
  //     var self = this;
  //     var modalInstance: ng.ui.bootstrap.IModalServiceInstance = self.modelService.open({
  //         templateUrl: 'starshipModal.html',
  //         controller: Common.Controllers.ModelController,
  //         bindToController: true,
  //         controllerAs: 'popup',
  //         resolve: {
  //             item: () => starship // <- this will pass the same instance
  //             // of the item displayed in the table to the modal
  //         }
  //     });

  //     modalInstance.result.then((selectedItem: StarShipTravelVM) => {
  //         // self.selectedStarship = selectedItem;
  //     });
  // };

  // OpenPlanetModel = (planet: PlanetVM) => {
  //     var self = this;
  //     var modalInstance: ng.ui.bootstrap.IModalServiceInstance = self.modelService.open({
  //         templateUrl: 'planetModal.html',
  //         controller: Common.Controllers.ModelController,
  //         bindToController: true,
  //         controllerAs: 'popup',
  //         resolve: {
  //             item: () => planet // <- this will pass the same instance
  //             // of the item displayed in the table to the modal
  //         }
  //     });
  // };

  GetShipsSupplyCount = () => {
    const self = this;
      self.invalidDistance = false;

      self.StartProcess();
      if (self.planetDistance == null || self.planetDistance <= 0) {
          self.invalidDistance = true;
          return;
      }

      self.starShipTravelService.GetShipsSupplyCountWithObserables(self.planetDistance)
          .subscribe(function (response: any) {
              self.starshipModel.starships = response.results;
              self.starshipModel.next = response.next;
              self.starshipModel.previous = response.previous;
              self.ProcessInfo.IsSucceed = true;
              self.ProcessInfo.Message = 'suceeded';
              self.ProcessInfo.Loading = false;
          });
  }

  GetByUrl = (url: string) => {
    const self = this;
    self.StartProcess();
    self.starShipTravelService.GetStarShipsResupplyWithObserables(url, self.planetDistance)
          .subscribe(function (response: any) {
              self.starshipModel.starships = response.results;
              self.starshipModel.next = response.next;
              self.starshipModel.previous = response.previous;
              self.ProcessInfo.IsSucceed = true;
              self.ProcessInfo.Message = 'suceeded';
              self.ProcessInfo.Loading = false;
          });
  }
}
