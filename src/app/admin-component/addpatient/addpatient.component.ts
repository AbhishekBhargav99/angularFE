import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent  {

  public adminId: string;
  public hospitalId: string;
  public newPatientForm : FormGroup;
  public bloodGroups : any;
  private sub ?: Subscription;
  public dob ?: Date;
  date = new FormControl(new Date());
 

  constructor(private formBuilder : FormBuilder,
    private adminService : AdminService, 
    private route: ActivatedRoute) {
      this.newPatientForm = this.formBuilder.group({});
      this.bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

      this.adminId ="";
      this.hospitalId = "";
    

   }

  ngOnInit(): void {
    this.newPatientForm = this.formBuilder.group({
      firstName : new FormControl('', Validators.required),
      lastName : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      bloodGroup: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    })

    this.sub = this.route.parent?.params
                    .subscribe(
                      params => {
                        this.adminId = params['adminId'];
                        this.hospitalId = params["hospId"]
                      }
                    )
              console.log(this.adminId, this.hospitalId);
  }

  getDate() {
    let isoString = this.date.value.toISOString();
    return isoString.split('T')[0];

  }
  createPatient(){
    let newPatient = {
      firstName: this.newPatientForm.value.firstName,
      lastName : this.newPatientForm.value.lastName ,
      email : this.newPatientForm.value.email ,
      phoneNumber : this.newPatientForm.value.phoneNumber ,
      address : this.newPatientForm.value.address ,
      bloodGroup : this.newPatientForm.value.bloodGroup ,
      age : this.getDate() ,
    }
    return newPatient;
  }

  myFilter = (d: Date | null): boolean => {
    
  
    const day = (d || new Date()).getDay();
    const month = (d || new Date()).getMonth();
    const year = (d || new Date()).getFullYear();
    // months start from 0 to 11
    // Prevent Saturday and Sunday from being selected.
    if(year == 2022){
      if(month <= 1) return true;
      else return false;
    }
    return year <= 2021
  };


  onSubmit(){
    console.log("date : ", this.date.value);
    // let newDate = this.date.value.toISOString();
    // console.log("date : ", newDate.split('T')[0]);
    let newPatient = this.createPatient();
    console.log(newPatient);
  }

 
}
