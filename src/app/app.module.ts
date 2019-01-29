import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewStudentComponent } from './modals/new-student/new-student.component';
import { EditStudentComponent } from './modals/edit-delete-student/edit-student/edit-student.component';
import { ModalUpdateStudentComponent } from './modals/edit-delete-student/modal-update-student/modal-update-student.component';
import { AdminSettingsComponent } from './modals/admin-settings/admin-settings.component';
import { SystemEntriesComponent } from './modals/system-entries/system-entries.component';
import { ReportsComponent } from './modals/reports/reports.component';
import { UserComponent } from './components/user/user.component';
import { SelectStudentComponent } from './modals/payments/select-student/select-student.component';
import { MakePaymentComponent } from './modals/payments/make-payment/make-payment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    NewStudentComponent,
    EditStudentComponent,
    ModalUpdateStudentComponent,
    AdminSettingsComponent,
    SystemEntriesComponent,
    ReportsComponent,
    UserComponent,
    SelectStudentComponent,
    MakePaymentComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
