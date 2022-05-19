import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import Swal from 'sweetalert2';
import { DoctorService } from '../doctor.service';
// import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage'
import { StorageModule } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { FirebaseStorage } from 'firebase/storage';

@Component({
  selector: 'app-addmedrec',
  templateUrl: './addmedrec.component.html',
  styleUrls: ['./addmedrec.component.css']
})
export class AddmedrecComponent implements OnInit {

  inputTypes = ['Text', 'Text Area', 'Date', 'Boolean'];
  inputType: string;
  public medRecItem : FormGroup;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  selectedFile : any;
  imgSrc: string;
  uploaded: Boolean;
  isValidFileType: Boolean;
  uploadedImageCount: number;
  imageUrls : Array<any>;

  displayedColumns: string[] = ['sNo', 'key', 'value' , 'action' ];
  allRecords : Array<Object>;
  @ViewChild('form') form: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  
  constructor(private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private doctorService : DoctorService,
    private router : Router,
    private authservice: AuthService,
    private storage: Storage,
    private af: AngularFireStorage,
    private ngxService: NgxUiLoaderService) {

    this.patientId = "";
    this.doctorId = "";
    this.hospitalId = "";
    this.inputType = 'Text';
    this.medRecItem = this.formBuilder.group({});
    this.allRecords = [];
    this.selectedFile = "";
    this.imgSrc = "";
    this.uploaded = false;
    this.isValidFileType = false;
    this.uploadedImageCount = 0;
    this.imageUrls = [];
   }

  ngOnInit(): void {
    this.uploadedImageCount = 0;
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

    this.medRecItem = this.formBuilder.group({
        key: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        value: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)])
    })
    this.uploaded = false;
  }

  myFilter(){
    return true;

  }

  createRec(){
    let key = this.medRecItem.value.key;
    let value = "";
    if(this.inputType === 'Date'){
      value = this.medRecItem.value.value.toDateString()
    } else{
      value = this.medRecItem.value.value;
    }
    return ({
      key : key,
      value: value
    })
  }
  onSubmit(){
    let newRec = this.createRec();
    this.resetForm();
    this.allRecords.push(newRec);
    this.dataSource = new MatTableDataSource(this.allRecords);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  submitForm(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.doctorService.addMedicalRecs(this.patientId, this.doctorId,
          this.hospitalId, this.allRecords, this.imageUrls)
          .subscribe(
            (res : any) => {
              console.log(res);
              if(res.status === true){
                this.resetForm();
                this.allRecords = [];
                this.dataSource = new MatTableDataSource(this.allRecords);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                // Swal.fire('Saved!', '', 'success')
                Swal.fire({
                  title: "Successfully Added medical Records",
                  text: `Of Patient : ${this.patientId}, By Doctor : ${this.doctorId}`,
                  icon:'success',
                  confirmButtonText: 'Ok',
                }).then(
                  (result) => {
                    if (result.isConfirmed){
                      this.resetForm();
                      this.allRecords = [];
                      this.router.navigate(['../../', 'viewPatients'], {relativeTo: this.route});
                    }
                  }
                )

              }
            },
            (error: any)=> {
              if(error.status === 400){
                this.authservice.logOut();
              }
            }
          )
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
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

  onDelete(row: any){
    this.allRecords = this.allRecords.filter(item => item !== row);
    this.dataSource = new MatTableDataSource(this.allRecords);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  resetForm(){
    this.form.resetForm();
    this.inputType = 'Text';
  }

  chooseImage(event : any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e : any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    }
    else{
      this.imgSrc = "";
      this.selectedFile = null;
    }
    console.log('Selected File :', this.selectedFile);
    console.log('Selected File Type :', this.selectedFile.type);
    console.log('File Size mb : ', (this.selectedFile.size)/(1024 * 1024) )
    if(this.selectedFile.type != "image/png" && this.selectedFile.type != 'image/jpg' && this.selectedFile.type != 'image/jpeg' && this.selectedFile.type != 'application/pdf'){
      this.isValidFileType = false;
      this.selectedFile = "";
      Swal.fire({
        title: "Select JPG, PNG, JPEG and PDF only",
        icon:"error"
      })
      return;
    }
    if((this.selectedFile.size)/(1024 * 1024) > 4){
      this.isValidFileType = false;
      this.selectedFile = "";
      Swal.fire({
        title: "File size should be less than 4mb",
        icon:"error"
      })
      return;
    }
    this.isValidFileType = true;
  }

  uploadImage(){

    if(!this.selectedFile)
      return;
    console.log('Upload');
    var filePath = `ehrFiles/${this.selectedFile.name}_${new Date().getTime()}`;
    const fileRef = this.af.ref(filePath);
    this.ngxService.start()
    this.af.upload(filePath, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        
        fileRef.getDownloadURL().subscribe((url: any) => {
          // this.imgSrc = url;
          this.imageUrls.push(url);
          console.log('URL : ', url);
          console.log(this.imageUrls);
          this.uploadedImageCount += 1;
          this.selectedFile= "";
          this.ngxService.stop()
          Swal.fire({
            title: "Successfully Uploaded Image",
            text: `Total Uploaded Images : ${this.uploadedImageCount}`,
            icon:'success',
            confirmButtonText: 'Ok',
          })
          this.uploaded = true;
          
        })
      })
    )
    .subscribe()
    // this.ngxService.stop()
  }

  deleteImage(){
    for(let url in this.imageUrls){
      this.af.refFromURL(url).delete();
    }
  }
}

