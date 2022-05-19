import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageDetailList ?: AngularFireList<any>;
  constructor( private firebase: AngularFireDatabase) {
    
  }

  getImageDetailss(){
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails: any){
    this.imageDetailList?.push(imageDetails);
  }
}
