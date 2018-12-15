import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RoutingRoutingModule } from './routing-routing.module';

import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RoutingRoutingModule,
    RouterModule.forRoot(routes)
  ], exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
