import { Component } from '@angular/core';
import { HttpService } from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project2';

  blogin = false;
  showLogin = false;
  user = false;
  bUpload = false;

  public token: string;
  public refreshToken: string;

  constructor(private http: HttpService) { }

  public bLogin;
  loginError = false;
  createError = false;

  show()
  {
    this.showLogin = true;
  }

  addUser(){
    this.showLogin = false;
    this.bUpload = false;
    this.user = true;
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
          this.user = false;
          this.bUpload = true;
        },
        err => {
          console.log("Error");
          this.createError = true;
        },
        () => {
          console.log("Created");
          this.user = false;
          this.bUpload = true;
        }
      ); 
  }

  cancelUser(){
    this.user = false;
    this.bUpload = true;
  }

  login(usernameParam: string, passwordParam: string){
    if(!this.blogin){
      let info = {
        username: usernameParam,
        password: passwordParam
      }
  
      this.http.login("http://localhost:3000/login", info).subscribe(
        data => {
          let res:any = data;
          console.log(res);
          this.token = res.accessToken;
          localStorage.setItem('token', res.accessToken)
        },
        err => {
          console.log("Error");
          this.loginError = true;
        },
        () => {
          console.log("Logged In");
          this.blogin = true;
          this.showLogin = false;
          this.bUpload = true;
        }
      ); 
    }
    else
    {
      this.logout();
    }
    
  }

  logout()
  {
    this.blogin = false;
    this.bUpload = false;
    this.createError = false;
    this.showLogin = false;
  }
}
