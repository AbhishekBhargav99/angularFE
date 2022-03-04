import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin-component/admin.service';
import { DoctorService } from '../doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmedicalrecord',
  templateUrl: './addmedicalrecord.component.html',
  styleUrls: ['./addmedicalrecord.component.css']
})
export class AddmedicalrecordComponent implements OnInit {

  patientId: string;
  doctorId: string;
  hospitalId: string;
  medForm: FormGroup;
  @ViewChild('form') form: any;
  

  constructor(private formBuilder : FormBuilder, 
    private route: ActivatedRoute,
    private doctorService : DoctorService) 
    { 
    this.patientId = "";
    this.doctorId = "";
    this.hospitalId = "";
    this.medForm = this.formBuilder.group({});

  }

  ngOnInit(): void {

    this.route.parent?.params
                    .subscribe(
                      params => {
                        this.hospitalId = params["hospId"];
                        this.doctorId = params['doctorId'];
                      }
                    )
    this.route.params
                    .subscribe(
                      params => {
                        this.patientId = params['patientId'];
                      }
                    )
        // console.log(this.patientId, this.hospitalId, this.doctorId)
        // {value: this.patientId, disabled: true}
    this.medForm = this.formBuilder.group({
      patientId : new FormControl(this.patientId, Validators.required),
      reasonsForVisit : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      allergies : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      symptoms : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      diagnosis : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      treatment : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      medication : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      followUp : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      notes : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    });
  }

  onSubmit(){
    console.log(this.medForm.value);
    this.doctorService.addMedicalRecords(this.patientId,
       this.doctorId, this.hospitalId, this.medForm.value)
       .subscribe(
         (res: any) => { console.log(res);
            if(res.status === true){
              Swal.fire({
                title: res.message,
                icon:'success',
                confirmButtonText: 'Ok',
              }).then(
                (result) => {
                  if (result.isConfirmed){
                    this.clearForm();
                  }
                }
              )
            }  
        },
         (err: any) => { console.log(err);
          Swal.fire({
            title: "Could Not Add Patient Records",
            icon: 'error'
          })
        }
       )
    this.form.resetForm();
  }

  clearForm(){
    // this.medForm.reset();
    this.form.resetForm();
    this.medForm.controls['patientId'].setValue(this.patientId);
  }

}
