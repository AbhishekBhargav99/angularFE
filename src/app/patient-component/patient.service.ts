import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { DoctorRecordsView } from '../admin-component/utils/doctor-records-view';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private Url = 'http://localhost:3000/patientApi'
  permissionedArray: any
  constructor(private http: HttpClient,
    private authservice: AuthService) { 
    this.permissionedArray = [];
  }

  public getPatientDetails(patientId : string, hospitalId: string) : Observable<any> {
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    console.log(patientId, hospitalId);
    return this.http.get(
      (this.Url) + '/details',
      {
        headers: new HttpHeaders({
          'patientId' : patientId,
          'hospitalid' : hospitalId,
          'accessToken': token
        })
      }
    ) .pipe(
      map(
        response => {
          return response
        }
      ),
      catchError(
        err => {
          throw(err);
        }
      )
    )


  }

  public getAllDoctors(hospId: string) : Observable<any> {
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.get<DoctorRecordsView>(
      (this.Url+ '/allDoctors'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'accessToken': token
        })
      }
    ) .pipe(
      map( responseArray => {
        return responseArray;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public grantAccessToDoctor(patientId: string, doctorId: string, hospitalId: string){
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    console.log(hospitalId, patientId, doctorId);
    return this.http.patch(
      (this.Url+ `/${hospitalId}/${patientId}/grant/${doctorId}`),
      {},
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'patientid' : patientId,
          'accessToken': token
        })
      }
    ) .pipe(
      map( response => {
        return response;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public revokeAccessFromDoctor(patientId: string, doctorId: string, hospitalId: string){
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    console.log(hospitalId, patientId, doctorId);
    return this.http.patch<DoctorRecordsView>(
      (this.Url+ `/${hospitalId}/${patientId}/revoke/${doctorId}`),
      {},
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'patientid' : patientId,
          'accessToken': token
        })
      }
    ) .pipe(
      map( response => {
        return response;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public getPatientMedicalHistory( patientId: string, hospitalId: string){
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.get(
      (this.Url+ '/getHistory'),{
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'patientid' : patientId,
          'accessToken': token
        })
      }
    ) .pipe(
      map( response => {
        return response
        // console.log("response : ", response);
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public updatePersonelDetails(patientId: string, hospitalId: string, data: any){
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.patch(
      (this.Url+ `/updatePatient/${hospitalId}/${patientId}`),
      data,
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'patientid' : patientId,
          'accessToken': token
        })
      }
    ) .pipe(
      map( response => {
        return response;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )

  }
  
}
