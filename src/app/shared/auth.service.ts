import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  loginAdmin(user : User) : Observable<any>{
    return this.http.post((this.URL + '/login'),
    user, 
    {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .pipe(
      catchError(this.handleError)
    )
  
  }

  loginPatient(user: User): Observable<any>{
    return this.http.post((this.URL + '/login'),
    user, 
    {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  loginDoctor(user: User) : Observable<any>{
    return this.http.post((this.URL + '/login'),
    user, 
    {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){  
    return  throwError({
        "status" : error.status,
        "message" : error.message || "Something went worng",
      }
    )
  }
}
