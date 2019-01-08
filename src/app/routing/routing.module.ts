import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RoutingRoutingModule } from './routing-routing.module';

import { LoginComponent } from '../components/login/login.component';
import { MenuComponent } from '../components/menu/menu.component'

import { NewStudentComponent } from '../modals/new-student/new-student.component';
import { EditStudentComponent } from '../modals/edit-student/edit-student.component';
import { AdminSettingsComponent } from '../modals/admin-settings/admin-settings.component';
import { SystemEntriesComponent } from '../modals/system-entries/system-entries.component';
import { ReportsComponent } from '../modals/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'add-student', component: NewStudentComponent },
      { path: 'md-student', component: EditStudentComponent },
      { path: 'admin-settings', component: AdminSettingsComponent },
      { path: 'system-entries', component: SystemEntriesComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'payments', component: SystemEntriesComponent }
    ]
  }
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
