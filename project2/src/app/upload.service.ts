import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = "{Server URL}";

  constructor(private http: HttpClient) { }

  public uploadFile(formData){
    return this.http.post<any>(this.SERVER_URL, formData, {
      reportProgress: true, observe: 'events'
    });
  }
}
