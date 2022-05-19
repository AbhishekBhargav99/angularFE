import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RecorddetailsComponent } from 'src/app/patient-component/recorddetails/recorddetails.component';
import { AuthService } from 'src/app/shared/auth.service';
import { DoctorService } from '../doctor.service';
import { ShowImageComponent } from 'src/app/show-image/show-image.component';

@Component({
  selector: 'app-viewrecordspermissioned',
  templateUrl: './viewrecordspermissioned.component.html',
  styleUrls: ['./viewrecordspermissioned.component.css']
})
export class ViewrecordspermissionedComponent implements OnInit {

  patientId: string;
  doctorId: string;
  hospitalId: string;
  displayedColumns: string[] = ['sno', 'changedBy', 'timestamp' , 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder : FormBuilder, 
    private route: ActivatedRoute,
    private doctorService : DoctorService,
    public dialog: MatDialog,
    private authservice: AuthService) { 

      this.patientId = "";
      this.doctorId = "";
      this.hospitalId = "";

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
      this.refresh();

  }

  refresh() {
    this.doctorService.getPatientRecords(this.patientId, this.doctorId, this.hospitalId)
    .subscribe(
      (response: any) => { 
        console.log('Response : ', response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error : any) => {
        if(error.status === 400){
          this.authservice.logOut();
        }
      }
    )
  }

  showRecordsDetails(medRecord: any){
    this.dialog.open(RecorddetailsComponent,{
      width: '40%',
      data: medRecord,
    })
    console.log("medRecords : ", medRecord);

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public convertToDate(val: any): string{
    return new Date(val.seconds.low * 1000).toDateString();
  }

  showImage(imageUrls : Array<any>){
    this.dialog.open(ShowImageComponent,{
      width: '60%',
      data: imageUrls,
    })
  }

}
