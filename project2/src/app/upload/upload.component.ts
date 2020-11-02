import {Component, OnInit} from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  htmlVariable: string;

  constructor(private http: HttpService) {
    
   }
  ngOnInit(): void {
  }

}
