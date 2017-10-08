import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../Common/Components/BaseComponent';
import { Router } from '@angular/router';
import { LOG_LOGGER_PROVIDERS, Logger } from 'angular2-logger/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './../Views/AdminLandingComponent.html',
  styleUrls: ['./../Views/AdminLandingComponent.less']
})

export class AdminLandingComponent extends BaseComponent implements OnInit {
  constructor(_routerService: Router, _logService: Logger,
    _toastr: ToastsManager, _vRef: ViewContainerRef) {
    super(_routerService, _logService, _toastr, _vRef);
  }

  title = 'Welcome to Admin Section';
  ngOnInit() {
    const self = this;
  }
}
