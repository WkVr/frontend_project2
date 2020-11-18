import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  bRecords = false;

  records: any;
  recordList : any = [];
  recordData : any = [];
  temp : any;
  i = 0;

  constructor(private http: HttpService) {}
      
  ngOnInit(): void {
    this.getRecords();
  }

  refresh(){
    this.getRecords();
  }

  getRecords(){
    this.http.getRecords('http://localhost:3000/recordList').subscribe(
      data => {
        this.records = data;
        console.log(this.records);
        for(var i=0; i< this.records.length;i++)
        {
          this.recordData = [];
          this.temp = this.records[i];
          for(var item in this.temp)
          {
            this.recordData.push(this.temp[item]);
          }
          this.addToArray(this.recordData);
        }
      },
      err => {
        console.log("Error");
      }
    );
  }

  addToArray(elemt: any){
    this.recordList.push(elemt);
  }

}
