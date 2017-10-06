import { StarShipVM } from './../../AdminSection/ViewModels/StarShipVM';
import { Response } from '@angular/http';
import { StarShipTravelService } from './../Services/StarShipTravelService';
import { AppConstants } from './../../Common/AppConstants';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../Common/Components/BaseComponent';
import { StarShipTravelVM } from '../ViewModels/StarShipTravelVM';
import { PlanetVM } from '../../AdminSection/ViewModels/PlanetVM';
import { Router} from '@angular/router';
import { LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PlanetService } from '../../AdminSection/Services/PlanetService';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shiptravel',
  templateUrl: './../Views/StarShipTravelComponent.html',
  providers: [PlanetService, StarShipTravelService , LOG_LOGGER_PROVIDERS]
})

export class StarShipTravelComponent extends BaseComponent implements OnInit {
  constructor(private modalService: NgbModal, _routerService: Router, _logService: Logger, private planetService: PlanetService,
         private starShipTravelService: StarShipTravelService,
        _toastr: ToastsManager, _vRef: ViewContainerRef) {
      super(_routerService , _logService, _toastr, _vRef);
  }

  starshipModel: {
    starships: Array<StarShipTravelVM>,
    next: string,
    previous: string
  };

  planetModel: {
    planets: Array<PlanetVM>,
    next: string,
    previous: string
  };

  selectedPlanet: PlanetVM;
  selectedStarShip: StarShipTravelVM;
  planetDistance: number;
  invalidDistance = false;
  closeResult: string;

  ngOnInit() {
    const self = this;
    self.starshipModel = {
      starships: new Array<StarShipTravelVM>(),
      next: '',
      previous: ''
    };

    self.planetModel = {
      planets: new Array<PlanetVM>(),
      next: '',
      previous: ''
    };

     self.selectedPlanet = new PlanetVM();
     self.selectedStarShip = new StarShipTravelVM();
     self.planetDistance = AppConstants.RandomDistance;
     self.GetAllPlanets();
  }

  OpenStarShipModel = (starShipModalTemplate, starship: StarShipTravelVM) => {
    const self = this;
    self.selectedStarShip = starship;
    self.modalService.open(starShipModalTemplate).result.then((result: StarShipVM) => {
      self.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      self.closeResult = `Dismissed ${self.getDismissReason(reason)}`;
    });
  }

  OpenPlanetModel = (planetModalTemplate, planet: PlanetVM) => {
    const self = this;
    self.selectedPlanet = planet;
    self.modalService.open(planetModalTemplate).result.then((result) => {
      self.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      self.closeResult = `Dismissed ${self.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  GetAllPlanets = () => {
    const self = this;
    self.StartProcess();

    self.planetService.GetByPage(1)
         .then(function (response: any) {
           self.planetModel.planets = response.results;
           self.planetModel.next = response.next;
           self.planetModel.previous = response.previous;

           self.ProcessInfo.IsSucceed = true;
           self.ProcessInfo.Message = 'suceeded';
           self.ProcessInfo.Loading = false;
         })
         .catch(function (response: any) {
           self.ProcessInfo.Message = 'failed';
           self.ProcessInfo.Loading = false;
         });
 }

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

  GetReachablePlanets = (): Array<PlanetVM> => {
    const self = this;
    const filtered = self.planetModel.planets.filter((planet) => {
        return planet.Distance < self.planetDistance;
    });
    return filtered;
  }
}
