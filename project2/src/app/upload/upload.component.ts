import {Component, OnInit} from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  constructor() {
    
   }
  ngOnInit(): void {
    
  }

  file:any;
  fileChanged(e) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file);
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
  }

}
