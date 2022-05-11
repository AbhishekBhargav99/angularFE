import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { PatientRecordsView } from './utils/patient-records-view';
import { DoctorRecordsView } from './utils/doctor-records-view';
import { AuthService } from '../shared/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private Url = 'http://localhost:3000/adminApi'
  constructor(private http: HttpClient,
    private authservice: AuthService
    ) { }

  public getAllPatients(adminId: string, hospId: string) : Observable<any> {

    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.get<PatientRecordsView>(
      (this.Url+ '/allPatients'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId,
          'accessToken' : token,
        })
      }
    ).pipe(
      map(
        reponseData => {
          return reponseData; 
        }),
        catchError(errorRes => {
            throw(errorRes);
        
        })

    )
  }

  public getAllDoctors(adminId: string, hospId: string) : Observable<any> {
    
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
          'adminid': adminId,
          'accessToken': token
        })
      }
    ) .pipe(
      map( responseArray => {
        
        return responseArray;
        // return reponseData;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  public registerPatient(adminId: string, hospId: string, patientData: Object){
    // console.log(adminId, hospId);
    // console.log(patientData);
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.post(
      (this.Url + '/newPatient'),
      patientData,
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId,
          'accessToken': token
        })
      }
    )
    .pipe(
      map(
        reponseData => {
          return reponseData;
        }
      ),
      catchError(
        err => {
          throw(err);
        }
      )
    )
  }

  public registerDoctor(adminId: string, hospId: string, doctorData: Object){
    
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.post(
      (this.Url + '/newDoctor'),
      doctorData,
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId,
          'accessToken': token
        })
      }
    ) .pipe(
      map(
        responseData => {
          return responseData;
        }
      ),
      catchError(
        err => {
          throw(err);
          console.log(err);
        }
      )
    )
  }
}
