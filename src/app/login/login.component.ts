import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean;
  public loginForm : FormGroup;
  public user: User | undefined;
  public errorMsg : string;

  constructor(private formBuilder : FormBuilder,
      private authService: AuthService,
      private router: Router) {
    this.hidePassword = true;
    this.loginForm =  this.formBuilder.group({
      role: new FormControl('admin'),
      username: new FormControl(null),
      hospitalId: new FormControl('1'),
      password: new FormControl(null)
    })
    this.errorMsg = "";

   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      role: new FormControl('admin', Validators.required),
      username: new FormControl('', Validators.required),
      hospitalId: new FormControl('1', Validators.required),
      password: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(12)])
    })
  }


  createUser() : User{
    const role = this.loginForm.value.role;
    const hospitalId = this.loginForm.value.hospitalId;
    const password = this.loginForm.value.password;
    const username = this.loginForm.value.username;

    let loginUser = new User(
      role, username, password, hospitalId
    );
    return loginUser;
  }

 

  login(){
    // console.log(this.loginForm.value);


    if(this.loginForm.value.role === 'admin'){
      
      let loginUser = this.createUser();
      this.authService.loginAdmin(loginUser)
      .subscribe(
        (res : any) => { this.afterSuccessfulLogin(
                          loginUser.role, 
                          loginUser.hospitalId,
                          loginUser.username )},
        (err) => {
          if(err.status === 401){
            this.errorMsg = "Invalid Admin Credentials";
          }
          else{
            this.errorMsg = err.message;
          }
          alert(this.errorMsg)
        }
      );
    }

    if(this.loginForm.value.role === 'doctor'){

      let loginUser = this.createUser();
      this.authService.loginDoctor(loginUser)
      .subscribe(
        (res : any) => { this.afterSuccessfulLogin(
                          loginUser.role, 
                          loginUser.hospitalId,
                          loginUser.username )},
        (err) => {
          if(err.status === 401){
            this.errorMsg = "Invalid Doctor Credentials";
          }
          else{
            this.errorMsg = err.message;
          }
          alert(this.errorMsg)
        }
      );
    }



    if(this.loginForm.value.role === 'patient'){
      console.log("Patient login");
      let loginUser = this.createUser();
      this.authService.loginPatient(loginUser)
      .subscribe(
        (res : any) => {  
                    console.log("response : ", res);
                          this.afterSuccessfulLogin(
                          loginUser.role, 
                          loginUser.hospitalId,
                          loginUser.username )},
        (err) => {
          if(err.status === 401){
            this.errorMsg = "Invalid Patient Credentials";
          }
          else if(err.status === 403){
            this.errorMsg = "New Patients should change Password First"
          }
          else{
            this.errorMsg = err.message;
          }
          alert(this.errorMsg)
        }
      );
    }
    this.errorMsg = "";
    this.loginForm.reset();    
  }


  afterSuccessfulLogin(role: string, hospitalId: string, userId: string){
    this.router.navigate([role, hospitalId, userId]);
  }


}
