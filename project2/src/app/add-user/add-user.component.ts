import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  createUser(username: any, password: any){
    let user = {
      username: username,
      password: password
    }
    this.http.createUser("http://localhost:3000/register", user).subscribe(
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
  }

}
