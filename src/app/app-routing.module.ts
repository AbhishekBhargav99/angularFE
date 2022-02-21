import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdddoctorComponent } from './admin-component/adddoctor/adddoctor.component';
import { AddpatientComponent } from './admin-component/addpatient/addpatient.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { ViewdoctorsComponent } from './admin-component/viewdoctors/viewdoctors.component';
import { ViewpatientsComponent } from './admin-component/viewpatients/viewpatients.component';
import { DoctorComponentComponent } from './doctor-component/doctor-component.component';
import { LoginComponent } from './login/login.component';
import { PatientComponentComponent } from './patient-component/patient-component.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    path: 'login',
    component: LoginComponent,
  },{
    path: 'signup',
    component: SignupComponent
  },{

    path:'admin/:hospId/:adminId',
    component: AdminComponentComponent,
    children: [
      {
        path: '',
        redirectTo: 'patients',
        pathMatch: 'full'
      }, {
        path: 'patients',
        component: ViewpatientsComponent,
      }, {
        path: 'doctors',
        component: ViewdoctorsComponent,
      },{
        path: 'addPatient',
        component: AddpatientComponent,
      }, {
        path: 'addDoctor',
        component: AdddoctorComponent,
      }
    ]
  },{
    path: 'patient/:hospId/:patientId',
    component: PatientComponentComponent,
  }, {
    path : 'doctor/:hospId/:doctorId',
    component: DoctorComponentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
