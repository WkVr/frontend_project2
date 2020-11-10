import {Component, OnInit} from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  information: string[];
  writeArray: any[];

  listShow = false;

  constructor(private http: HttpService) {}

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
    let record = {
      item1: 'ssssss',
      item2: 'dddddd'
    }
    this.http.login("http://localhost:3000/createRecord", record).subscribe(
      data => {
        let res:any = data;
        console.log(res);
      },
      err => {
        console.log("Error");
      },
      () => {
        console.log("Created");
      }
    );
  }

}
