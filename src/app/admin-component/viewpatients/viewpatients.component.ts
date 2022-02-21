import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { DisplayVal, PatientRecordsView } from '../utils/patient-records-view';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-viewpatients',
  templateUrl: './viewpatients.component.html',
  styleUrls: ['./viewpatients.component.css']
})
export class ViewpatientsComponent implements OnInit, OnDestroy {

  public adminId: string;
  public hospitalId: string;
  public patientRecords$? : Observable<Array<PatientRecordsView>>;
  public patientRec: Array<PatientRecordsView>;
  private sub ?: Subscription;

  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'phoneNumber', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, 
    private adminService: AdminService,
    private router: Router){
      
      this.adminId = "";
      this.hospitalId = "";
      this.patientRec = [];

  }

  ngOnInit(): void {
    // console.log("In ngonitn")
      // Cannot directly access params in child routes
        // this.sub = this.route.params
        // .subscribe((params: Params) => {
        //   this.adminId = params['adminId'];
        //   this.hospitalId = params["hospId"]
        //   console.log("cred : ", this.adminId, this.hospitalId);
        //   this.refresh();
        // });
        this.sub = this.route.parent?.params
                    .subscribe(
                      params => {
                        this.adminId = params['adminId'];
                        this.hospitalId = params["hospId"]
                        this.refresh();
                      }
                    )
  }

    public refresh() : void{

    this.adminService.getAllPatients(this.adminId, this.hospitalId)
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      console.log("error : ",error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }


}
