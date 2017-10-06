
import { NgModule } from '@angular/core';
import { BaseComponent } from './../Common/Components/BaseComponent';
import { Routes, RouterModule } from '@angular/router';
import { PlanetComponent } from './../AdminSection/Components/PlanetComponent';
import { StarShipComponent } from './../AdminSection/Components/StarShipComponent';
import { StarShipTravelComponent } from './../UserSection/Components/StarShipTravelComponent';
import { HomeComponent } from './../HomeSection/Components/HomeComponent';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'planet', component: PlanetComponent },
  { path: 'planet/:name', component: PlanetComponent },
  { path: 'starship', component: StarShipComponent },
  { path: 'starship/:name', component: StarShipComponent },
  { path: 'shiptravel', component: StarShipTravelComponent }
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
