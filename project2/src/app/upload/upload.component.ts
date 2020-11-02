import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  information: string[];

  listShow = false;

  constructor() {}

  ngOnInit(): void {}

  file:any;
  fileChanged(e) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file);
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.readToArray(fileReader.result.toString());
      this.listShow = true;
    }
    fileReader.readAsText(this.file);
  }

  readToArray(info: string){
    this.information = info.split(',');
    console.log(this.information);
  }

  write(){
    
  }

}
