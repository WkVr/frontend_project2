import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';
import {UploadService} from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  file:any;
  fileChanged(e) {
    this.file = e.target.files[0];
  }

  public read(){
    
  }


}
