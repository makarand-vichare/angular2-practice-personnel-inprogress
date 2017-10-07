import { NgModule } from '@angular/core';
import { BaseComponent } from './../Common/Components/BaseComponent';
import { Routes, RouterModule } from '@angular/router';
import { PlanetComponent } from './../AdminSection/Components/PlanetComponent';
import { StarShipComponent } from './../AdminSection/Components/StarShipComponent';
import { StarShipTravelComponent } from './../UserSection/Components/StarShipTravelComponent';
import { HomeComponent } from './../HomeSection/Components/HomeComponent';
import { LoginComponent } from '../HomeSection/Components/LoginComponent';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'planets', component: PlanetComponent },
  { path: 'planet/:name', component: PlanetComponent },
  { path: 'starships', component: StarShipComponent },
  { path: 'starship/:name', component: StarShipComponent },
  { path: 'shiptravel', component: StarShipTravelComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
