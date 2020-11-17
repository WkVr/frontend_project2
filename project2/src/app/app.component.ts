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

  public token: string;
  public refreshToken: string;

  constructor(private http: HttpService) { }

  public bLogin;
  loginError = false;

  show()
  {
    this.showLogin = true;
  }

  login(usernameParam: string, passwordParam: string){
    if(!this.blogin){
      let info = {
        username: usernameParam,
        password: passwordParam
      }
  
      this.http.login("http://localhost:4000/login", info).subscribe(
        data => {
          let res:any = data;
          console.log(res);
          this.token = res.accessToken;
          this.refreshToken = res.refreshToken;
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
  }
}
