import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponentComponent } from './admin-component/admin-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PatientComponentComponent } from './patient-component/patient-component.component';
import { DoctorComponentComponent } from './doctor-component/doctor-component.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponentComponent,
    LoginComponent,
    SignupComponent,
    PatientComponentComponent,
    DoctorComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
