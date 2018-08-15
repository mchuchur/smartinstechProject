import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AirlineRegistrationComponent } from './airline-registration/airline-registration.component';
import { AirlineLoginComponent } from './airline-login/airline-login.component';
import { AirlineHomeComponent } from './airline-home/airline-home.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'airline', component: AirlineHomeComponent, canActivate: [AuthGuard] },
  { path: 'airline/registration', component: AirlineRegistrationComponent },
  { path: 'airline/login', component: AirlineLoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'airline' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }