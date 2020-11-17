import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  information: any = [];
  unclasifiedArray: any[] = [];
  writeArray:  any[] = [];
  correctionArray: any[] = [];

  listShow = false;
  loaded = false;
  correctionList = false;
  correctionSelected = false;
  writedata = false;
  finished = false;

  constructor(private http: HttpService) {}

  dataFormControl = new FormControl('', [
    Validators.required
  ]);

  onListChanged(correction: any){
    this.correctionArray.push(correction);
    var index = this.unclasifiedArray.indexOf(correction);
    if(index > -1) this.unclasifiedArray.splice(index, 1)
  }

  save(data: string, item: any){
    this.writeArray.push(data)
    var index = this.correctionArray.indexOf(item);
    if(index > -1) this.correctionArray.splice(index, 1)
    if(this.correctionArray.length == 0) this.writedata = true;
  }
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
    this.information = info.split('\n');
    this.information = info.split(',');
    this.loaded = true;
  }

  list(){
    for(var i = 0; i < this.information.length; i++)
    {
      this.dataValidate(this.information[i]);
    }
    this.listShow = false;
  }

  clear(){
    this.correctionList = false;
    this.finished = true;
    if(this.correctionArray.length == 0) this.writedata = true;
  }

  write(){
    let record = { };
    for(var i = 0; i< this.writeArray.length; i++)
    {
      record["i"+i] = this.writeArray[i];
    }
    console.log(record);
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
    this.writedata = false;
    this.loaded = false;
  }

  dataValidate(element: any)
  {
    var bClasified = false;
    if(element.length == 13 && !isNaN(parseInt(element))){
      if(this.idValidate(element)){
        this.writeArray.push("Id-Number")
        bClasified = true;
      }
    }
    else if(!isNaN(parseInt(element))){
      if(this.cardValidate(element)) {
        this.writeArray.push("Credit Card Number");
        bClasified = true;
      }
    }
    if(element.includes(' ')){
      if(this.checkString(element)){
        this.writeArray.push("House Address");
        bClasified = true;
      }
    }
    else if(element.includes('@') && element.includes('.')) {
      this.writeArray.push("Email Address");
      bClasified = true;
    }
    if(!bClasified) this.unclasifiedArray.push(element);
    this.correctionList = true;
  }

  checkString(line : string)
  {
    console.log(line);
    var temp = line.toUpperCase();
    var tempArray = temp.split(' ');
    console.log(tempArray);
    var bFlag = false;
    if(Number.isInteger(parseInt(tempArray[0])))
    {
      bFlag = tempArray.includes("STREET") || tempArray.includes("AVENUE") || tempArray.includes("ROAD") || tempArray.includes("WAY") || tempArray.includes("DRIVE");
      if(bFlag) return true;
    }
    return false;
  }

  idValidate(id: string)
  {
    var sumOdd = 0;
    var even = "";
    var evenMul = 0;
    var sumEven = 0;
    var totalSum = 0;
    var diff = 0;
    for(var i = 0; i < 13; i++)
    {
      if(i%2 == 0) sumOdd += parseInt(id[i]);
      else even += id[i]
    }
    evenMul = parseInt(even) * 2;
    for(var i = 0; i < 6; i++)
    {
      sumEven += parseInt(evenMul.toString()[i]);
    }
    totalSum = sumOdd + sumEven;
    diff = 10 - parseInt(totalSum.toString()[1]);
    if(diff.toString() == id[12]) return true;
    else return false
  }

  cardValidate(number: string)
  {
    var temp = "";
    var even = 0;
    var sum = 0;
    var sumEven = 0;
    for(var i = 0; i < number.length; i++)
    {
      if(i%2 != 0)
      {
        if(parseInt(number[i]) * 2 > 9)
        {
          even = parseInt(number[i]) * 2;
          sumEven = parseInt(even.toString()[0]) + parseInt(even.toString()[1]);
          temp += sumEven.toString();
        }
        else temp += (parseInt(number[i]) * 2).toString();
      }
      else temp += number[i];
    }

    for(var i = 0; i < temp.length; i++)
    {
      sum += parseInt(temp[i]);
    }
    console.log("sum " + sum);
    if(sum%10 == 0) return true
    else return false
  }

}
