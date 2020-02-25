import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';

import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
