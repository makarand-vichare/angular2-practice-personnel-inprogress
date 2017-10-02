import { AppRoutingModule } from './AppRoutingModule';
import { PlanetComponent } from './AdminSection/Components/PlanetComponent';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [PlanetComponent]
})
export class AppModule { }
