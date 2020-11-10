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
    this.http.getRecords('http://localhost:3000/recordList').subscribe(
      data => {
        this.records = data;
        console.log(this.records);
        for(var i=0; i< this.records.length;i++)
        {
          this.recordData = [];
          this.temp = this.records[i];
          console.log(this.temp);
          for(var item in this.temp)
          {
            this.recordData.push(this.temp[item]);
          }
          this.addToArray(this.recordData);
        }
        console.log(this.recordList);
      },
      err => {
        console.log("Error");
      }
    );
    console.log(this.recordList);
  }

  getRecord(idParam: string){
    let recordId = { 
      id: idParam 
    }; 
    this.http.getRecord('http://localhost:3000/record', recordId).subscribe(
      data => {
        return data;
      },
      err => {
        console.log(err);
      }
    );
  }

  addToArray(elemt: any){
    this.recordList.push(elemt);
  }

}
