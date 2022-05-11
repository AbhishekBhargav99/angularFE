import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';


  constructor(private http: HttpClient,
    private router: Router) {

      }

  addUser(role : string){
    localStorage.setItem('role', role);
  }

  addToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(!token){
      return null;
      this.logOut();
    }
    return token;
  }

  // For Tokens Missing
  logOut(){
    this.removeUser();
    this.router.navigate(['/login']);
    Swal.fire({
      title: "Error",
      text: 'Please Login again',
      confirmButtonText: 'Ok',
      icon: 'error' 
    })
  }

  removeUser(){
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }

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

  getOtp(hospitalId: string, role: string, user: Object) : Observable<any>{
    return this.http.post((this.URL+ '/signup'),
    user,
    {
      headers: new HttpHeaders({
        'hospitalid' : hospitalId,
        'role': role
      })
    }
    )
    .pipe(
      map( res => {
        return res;
        // return reponseData;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
    )
  }

  resetPassword(hospitalId: string, role: string, user: Object): Observable<any> {
    return this.http.post((this.URL+ '/resetPassword'),
    user,
    {
      headers: new HttpHeaders({
        'hospitalid' : hospitalId,
        'role': role
      })
    }
    )
    .pipe(
      map( res => {
        return res;
        // return reponseData;
      }),
      catchError(
        errorRes => {
          throw(errorRes);
        })
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
