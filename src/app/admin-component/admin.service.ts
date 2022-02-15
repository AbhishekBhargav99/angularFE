import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { PatientRecordsView } from './utils/patient-records-view';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private Url = 'http://localhost:3000/adminApi'
  constructor(private http: HttpClient) { }

  public getAllPatients(adminId: string, hospId: string) : Observable<any> {
    return this.http.get<PatientRecordsView>(
      (this.Url+ '/all'),
      {
        headers: new HttpHeaders({
          'hospitalid' : hospId,
          'adminid': adminId
        })
      }
    ).pipe(
      map(
        reponseData => {
          let responseArray : PatientRecordsView[] = [];
          for(let response of responseArray){
            responseArray.push(response);
          }
          return reponseData; 
        }),
        catchError(errorRes => {
          throw(errorRes);
        })

    )
  }
}
