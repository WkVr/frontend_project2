import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  httpPost(url, {}) {
    return this.http.post(url, {});
  }

  login(url, data)
  {
    return this.http.post(url, data);
  }

  createRecord(url, data)
  {
    return this.http.post(url, data);
  }

  getRecords(url)
  {
    return this.http.get(url);
  }

  getRecord(url, data)
  {
    return this.http.get(url, data);
  }
   
}