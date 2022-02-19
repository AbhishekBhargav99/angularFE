import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hidePassword: boolean;
  public signupForm: FormGroup;


  constructor(private formbuilder : FormBuilder) {
    this.hidePassword = true;
    this.signupForm =  this.formbuilder.group({
        role: new FormControl('doctor'),
        username: new FormControl(''),
        hospitalId: new FormControl('0'),
        newPassword: new FormControl(''),
        email: new FormControl(''),
    })
   }

  ngOnInit(): void {
    this.signupForm =  this.formbuilder.group({
      role: new FormControl('doctor'),
      username: new FormControl('', Validators.required),
      hospitalId: new FormControl('1'),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
  })
  }

  signup(){
    console.log(this.signupForm.value);
    this.signupForm.reset()
  }  

}
