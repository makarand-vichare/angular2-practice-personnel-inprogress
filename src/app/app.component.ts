/// <reference path="../../node_modules/@types/toastr/index.d.ts" />
import { PlanetService } from './AdminSection/Services/PlanetService';
import { AppConstants } from './Common/AppConstants';
import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { BaseComponent } from './Common/Components/BaseComponent';
import { PlanetVM } from './AdminSection/ViewModels/PlanetVM';
import {Router} from '@angular/router';
import {LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PlanetService , LOG_LOGGER_PROVIDERS]
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'app';
  constructor(_routerService: Router, _logService: Logger, private planetService: PlanetService,
              public toastr: ToastsManager, vRef: ViewContainerRef) {
    super(_routerService , _logService);
    this.toastr.setRootViewContainerRef(vRef);
  }
  ngOnInit() {
   // this.GetPlanets(1);
  }
}
