import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import {FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpService) { }

  public bLogin = false;

  ngOnInit(): void {
  }

  login(usernameParam: string, passwordParam: string){
    let info = {
      username: usernameParam,
      password: passwordParam
    }

    this.http.login("http://localhost:4000/login", info).subscribe(
      data => {
        let res:any = data;
        console.log(res);
      },
      err => {
        console.log("Error");
      },
      () => {
        console.log("Logged In");
        this.bLogin = true;
      }
    );
  }
}
