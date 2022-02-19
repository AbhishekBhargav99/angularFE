import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean;
  public loginForm : FormGroup;

  constructor(private formBuilder : FormBuilder) {
    this.hidePassword = true;
    this.loginForm =  this.formBuilder.group({
      role: new FormControl('admin'),
      username: new FormControl(null),
      hospitalId: new FormControl('1'),
      password: new FormControl(null)
    })

   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      role: new FormControl('admin', Validators.required),
      username: new FormControl('', Validators.required),
      hospitalId: new FormControl('1', Validators.required),
      password: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(10)])
    })
  }

  login(){
    console.log(this.loginForm.value);
    
  }


}
