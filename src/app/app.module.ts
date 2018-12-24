import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewStudentComponent } from './modals/new-student/new-student.component';
import { EditStudentComponent } from './modals/edit-student/edit-student.component';
import { ModalUpdateStudentComponent } from './modals/modal-update-student/modal-update-student.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    NewStudentComponent,
    EditStudentComponent,
    ModalUpdateStudentComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
