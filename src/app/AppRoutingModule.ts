
import { NgModule } from '@angular/core';
import { BaseComponent } from './Common/Components/BaseComponent';
import { Routes, RouterModule } from '@angular/router';
import { PlanetComponent } from './AdminSection/Components/PlanetComponent';

const appRoutes: Routes = [
  { path: 'app-planet', component: PlanetComponent },
  { path: 'app-root',   component: BaseComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
