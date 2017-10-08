import { NgModule } from '@angular/core';
import { BaseComponent } from './../Common/Components/BaseComponent';
import { Routes, RouterModule } from '@angular/router';
import { PlanetComponent } from './../AdminSection/Components/PlanetComponent';
import { StarShipComponent } from './../AdminSection/Components/StarShipComponent';
import { StarShipTravelComponent } from './../UserSection/Components/StarShipTravelComponent';
import { HomeComponent } from './../HomeSection/Components/HomeComponent';
import { LoginComponent } from '../HomeSection/Components/LoginComponent';
import { AuthGard } from '../AdminSection/Services/AuthGard';
import { AdminLandingComponent } from './../AdminSection/Components/AdminLandingComponent';
import { UserLandingComponent } from './../UserSection/Components/UserLandingComponent';
import { AuthService } from '../AdminSection/Services/AuthService';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminlanding', component: AdminLandingComponent , canActivate : [AuthGard] },
  { path: 'userlanding', component: UserLandingComponent , canActivate : [AuthGard] },
  { path: 'planets', component: PlanetComponent , canActivate : [AuthGard] },
  { path: 'planet/:name', component: PlanetComponent , canActivate : [AuthGard] },
  { path: 'starships', component: StarShipComponent , canActivate : [AuthGard]  },
  { path: 'starship/:name', component: StarShipComponent , canActivate : [AuthGard] },
  { path: 'shiptravel', component: StarShipTravelComponent , canActivate : [AuthGard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGard, AuthService, LOG_LOGGER_PROVIDERS]
})
export class AppRoutingModule { }
