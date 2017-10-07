import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { BaseComponent } from './../../Common/Components/BaseComponent';
import {Router} from '@angular/router';
import {LOG_LOGGER_PROVIDERS , Logger} from 'angular2-logger/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './../Views/RootComponent.html',
  styleUrls: ['./../Views/RootComponent.css'],
  providers: [LOG_LOGGER_PROVIDERS]
})
export class RootComponent implements OnInit {
  title = 'App Root Page';

  ngOnInit() {
  }
}
