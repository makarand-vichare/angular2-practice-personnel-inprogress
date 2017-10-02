import { AppRoutingModule } from './AppRoutingModule';
import { PlanetComponent } from './AdminSection/Components/PlanetComponent';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PlanetComponent
  ],
  imports: [
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [PlanetComponent]
})
export class AppModule { }
