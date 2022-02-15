import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AdminService } from '../admin-component/admin.service';
import { DisplayVal, PatientRecordsView } from './utils/patient-records-view';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {

  public adminId: string;
  public patientRecords$? : Observable<Array<PatientRecordsView>>;
  public patientRec: Array<PatientRecordsView>;
  private sub ?: Subscription;
  public headers = [
    new DisplayVal(PatientRecordsView.prototype.patientId, 'Patient Id'),
    new DisplayVal(PatientRecordsView.prototype.firstName, 'First Name'),
    new DisplayVal(PatientRecordsView.prototype.lastName, 'Last Name')
  ]

  constructor(private route: ActivatedRoute, 
    private adminService: AdminService) { 

      this.adminId = "";
      this.patientRec = [];
    }

  ngOnInit(): void {
    console.log("In admin")
    this.sub = this.route.params
    .subscribe((params: Params) => {
      console.log(params);
      this.adminId = params['adminId'];
      console.log(this.adminId);
      this.refresh();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public refresh() : void{
    console.log("Hello");
    this.adminService.getAllPatients(this.adminId, '2')
    .subscribe(data => {
      console.log("data : ", data);
      this.patientRec = data;

    },
    error => {
      console.log("error : ",error);
    })
    // this.patientRecords$ = this.adminService.getAllPatients(this.adminId, '1')
    // console.log(this.patientRecords$);
    
  }

}
