import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RoutingRoutingModule } from './routing-routing.module';

import { LoginComponent } from '../components/login/login.component';
import { MenuComponent } from '../components/menu/menu.component'

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'menu', component: MenuComponent }
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
