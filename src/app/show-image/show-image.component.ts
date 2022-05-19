import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  imageUrl: any;
  imageIndex : number;

  constructor(@Inject(MAT_DIALOG_DATA) public imageUrls : any,) { 
    this.imageUrl = "";
    this.imageIndex = 0;
    this.imageUrl = imageUrls[0];
  }

  ngOnInit(): void {
    console.log('In dialog Box: ', this.imageUrls);
  }

  onChangeImage(){
    let n = this.imageUrls.length;
    this.imageIndex  = (this.imageIndex + 1) % n;
    this.imageUrl = this.imageUrls[this.imageIndex];
  }

  isPdf(URL: any){
    let imgUrl = String(URL).toLowerCase();
    return imgUrl.search('.pdf') != -1;
  }

}
