import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AppComponent } from "./app.component"

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  tokenHeader = JSON.stringify(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer' + this.tokenHeader)
  }

  httpPost(url, {}) {
    return this.http.post(url, {}, this.header);
  }

  login(url, data)
  {
    return this.http.post(url, data);
  }

  createRecord(url, data)
  {
    return this.http.post(url, data, this.header);
  }

  getRecords(url)
  {
    return this.http.get(url, this.header);
  }

  getRecord(url, data)
  {
    return this.http.get(url, data);
  }
   
}