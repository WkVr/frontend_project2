import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project2';

  blogin = false;

  login(){
    if(this.blogin){
      this.blogin = false;
    }
    this.blogin = true;
  }
}
