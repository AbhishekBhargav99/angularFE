import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private Url = 'http://localhost:3000/doctorApi'
  constructor(private http: HttpClient,
    private authservice : AuthService) { }

  public getPatients(doctorId:string, hospitalId: string) : Observable<any>{
    
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.get(
      (this.Url+ '/allPermissionedPatients'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId,
          'accessToken' : token
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

  public addMedicalRecords(patientId: string, doctorId:string, hospitalId: string, medRecord: Object) : Observable<any>{
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.patch(
      (this.Url+ `/${hospitalId}/${doctorId}/addRecords/${patientId}`),
      medRecord,
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId,
          'patientId': patientId,
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

  public addMedicalRecs(patientId: string, doctorId:string, hospitalId: string, medRecord: Object, imageUrls: Array<any>) : Observable<any>{
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    console.log(hospitalId, patientId, doctorId);
    return this.http.patch(
      (this.Url+ `/${hospitalId}/${doctorId}/addRecs/${patientId}`),
      {medRecord : medRecord,
      imageUrls: imageUrls},
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId,
          'patientId': patientId,
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

  public getPatientRecords(patientId: string, doctorId:string, hospitalId: string) :Observable<any> {
    let token = this.authservice.getToken();
    if(!token){
      this.authservice.logOut();
      token = '123';
    }
    return this.http.get(
      ( this.Url + '/getMedicalHistory'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospitalId,
          'doctorId': doctorId,
          'patientId': patientId,
          'accessToken': token
        })
      }
    ) .pipe(
      map(
        responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          throw(errorRes);
        })
    )
  }
}
