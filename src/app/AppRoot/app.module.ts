import { AppRoutingModule } from './AppRoutingModule';
import { StarShipComponent } from './../AdminSection/Components/StarShipComponent';
import { StarShipTravelComponent } from './../UserSection/Components/StarShipTravelComponent';
import { PlanetComponent } from './../AdminSection/Components/PlanetComponent';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RootComponent } from './Components/RootComponent';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { FormsModule } from '@angular/forms';
import {Ng2Webstorage} from 'ngx-webstorage';

@NgModule({
  declarations: [
    RootComponent,
    PlanetComponent,
    StarShipComponent,
    StarShipTravelComponent
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
