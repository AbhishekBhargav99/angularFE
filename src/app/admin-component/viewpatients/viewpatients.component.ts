import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { PatientRecordsView } from '../utils/patient-records-view';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-viewpatients',
  templateUrl: './viewpatients.component.html',
  styleUrls: ['./viewpatients.component.css']
})
export class ViewpatientsComponent implements OnInit, OnDestroy {

  public adminId: string;
  public hospitalId: string;
  public patientRecords$? : Observable<Array<PatientRecordsView>>;
  private sub ?: Subscription;

  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'phoneNumber', 'email', 'age', 'address'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, 
    private adminService: AdminService,
    private authservice: AuthService){
      
      this.adminId = "";
      this.hospitalId = "";


  }

  ngOnInit(): void {
    
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
      if(error.status === 400){
        this.authservice.logOut();
      }
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
