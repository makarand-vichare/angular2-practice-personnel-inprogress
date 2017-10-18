import { AppRoutingModule } from './AppRoutingModule';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RootComponent } from './Components/RootComponent';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { FormsModule } from '@angular/forms';
import { Ng2Webstorage} from 'ngx-webstorage';
import { LoginMenuComponent } from './Components/LoginMenuComponent';
import { HomeComponent } from '../HomeSection/Components/HomeComponent';
import { TopMenuComponent } from './Components/TopMenuComponent';
import { LoginComponent } from '../HomeSection/Components/LoginComponent';
import { StarShipComponent } from './../AdminSection/Components/StarShipComponent';
import { StarShipTravelComponent } from './../UserSection/Components/StarShipTravelComponent';
import { PlanetComponent } from './../AdminSection/Components/PlanetComponent';
import { AdminLandingComponent } from '../AdminSection/Components/AdminLandingComponent';
import { UserLandingComponent } from '../UserSection/Components/UserLandingComponent';
import { LOG_LOGGER_PROVIDERS, Logger } from 'angular2-logger/core';

@NgModule({
  declarations: [
    RootComponent,
    PlanetComponent,
    StarShipComponent,
    StarShipTravelComponent,
    HomeComponent,
    LoginComponent,
    LoginMenuComponent,
    TopMenuComponent,
    AdminLandingComponent,
    UserLandingComponent
  ],
  imports: [
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ToastModule,
    FormsModule,
    Ng2Webstorage
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
