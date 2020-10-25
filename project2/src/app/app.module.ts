import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UploadComponent } from './upload/upload.component';
import { RecordsComponent } from './records/records.component';
import { InfoComponent } from './info/info.component';

import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadComponent,
    RecordsComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
