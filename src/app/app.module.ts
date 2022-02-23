import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule} from '@angular/material/grid-list';

import { AdminComponentComponent } from './admin-component/admin-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PatientComponentComponent } from './patient-component/patient-component.component';
import { DoctorComponentComponent } from './doctor-component/doctor-component.component';
import { ViewpatientsComponent } from './admin-component/viewpatients/viewpatients.component';
import { ViewdoctorsComponent } from './admin-component/viewdoctors/viewdoctors.component';
import { AddpatientComponent } from './admin-component/addpatient/addpatient.component';
import { AdddoctorComponent } from './admin-component/adddoctor/adddoctor.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponentComponent,
    LoginComponent,
    SignupComponent,
    PatientComponentComponent,
    DoctorComponentComponent,
    ViewpatientsComponent,
    ViewdoctorsComponent,
    AddpatientComponent,
    AdddoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
