import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UploadService} from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files = [];

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  uploadFile(file) {
        const formData = new FormData();  
        formData.append('file', file.data);  
        file.inProgress = true;
        this.uploadService.uploadFile(formData).pipe(
          map(event => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                file.progress = Math.round(event.loaded * 100 / event.total);
                break;
              case HttpEventType.Response:
                return event;
            }  
          }),  
          catchError((error: HttpErrorResponse) => {
            file.inProgress = false;
            return of(`Upload failed: ${file.data.name}`);
          })).subscribe((event: any) => {
            if (typeof (event) === 'object') {
              console.log(event.body);
            }  
          });  
      }

}
