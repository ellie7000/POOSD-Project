import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn = false;

  public _loginPromise: Promise<User>;
  public _getUserPromise: Promise<User>;
  public _getAddCoursePromise: Promise<User>;
  public _getSelectMajorPromise: Promise<User>;

  constructor(private http: HttpClient, private cookies: CookieService) {
    if (cookies.get('sid')) {
      this.isLoggedIn = true;
    }
  }

  async login(username: string, password: string) {
    await (this._loginPromise = this.http.post<User>('http://localhost:4200/api/login', {
      "username": username,
      "password": password
    }).toPromise());
    this.isLoggedIn = true;
    console.log(this.cookies.get("userId"));
    return this._loginPromise;
  }

  async logout() {
    await (this._loginPromise = this.http.post<User>('http://localhost:4200/api/logout', {}).toPromise());
    this.isLoggedIn = false;
  }


  async getUser() {
    return this._getUserPromise = this.http.get<User>('http://localhost:4200/api/user').toPromise();
  }

  async addCourse(majorId: string) {
    return this._getAddCoursePromise = this.http.put<User>('http://localhost:4200/api/user/major', { 
      "majorId": majorId 
    }).toPromise();
  }

  async selectMajor(courseId: string) {
    return this._getSelectMajorPromise = this.http.put<User>('http://localhost:4200/api/user/course', { 
      "courseId": courseId
    }).toPromise();
  }

}
