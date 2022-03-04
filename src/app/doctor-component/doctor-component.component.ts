import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../admin-component/admin.service';

@Component({
  selector: 'app-doctor-component',
  templateUrl: './doctor-component.component.html',
  styleUrls: ['./doctor-component.component.css']
})
export class DoctorComponentComponent implements OnInit {

  public doctorId: string;
  public hospitalId: string;

  constructor(private route: ActivatedRoute, 
    private adminService: AdminService) { 
      this.doctorId ="";
      this.hospitalId= "";
    }

  ngOnInit(): void {
    this.route.params
        .subscribe((params: Params) => {
          this.doctorId = params['doctorId'];
          this.hospitalId = params["hospId"]
        });
  }

}
