import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CookieService } from 'ngx-cookie-service';

import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MajorComponent } from './profile/major/major.component';
import { CoursesComponent } from './profile/courses/courses.component';
import { LogoutComponent } from './logout/logout.component';
import { CourseFilterPipe } from './pipes/coursefilter.pipe';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MajorComponent,
    CoursesComponent,
    LogoutComponent,
    CourseFilterPipe
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    MajorComponent,
    CoursesComponent
  ],
  entryComponents: [
    MajorComponent,
    CoursesComponent
  ]
})
export class AppModule { 
}
