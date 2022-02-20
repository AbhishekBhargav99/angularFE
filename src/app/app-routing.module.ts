import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponentComponent } from './admin-component/admin-component.component';
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
