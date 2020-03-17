import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public _loginPromise: Promise<User>;
  public _getUserPromise: Promise<User>;
  public _getAddCoursePromise: Promise<User>;
  public _getDeleteCoursePromise: Promise<User>;
  public _getSelectMajorPromise: Promise<User>;
  public _registerPromise: Promise<User>;
  public _getUpdateCoursePromise: Promise<User>;

  constructor(private http: HttpClient, private cookies: CookieService) {
    if (cookies.get('sid')) {
      this.isUserLoggedIn.next(true);
    }
  }

  async login(username: string, password: string) {
    await (this._loginPromise = this.http.post<User>('http://localhost:4200/api/login', {
      "username": username,
      "password": password
    }).toPromise());
    this.isUserLoggedIn.next(true);
    return this._loginPromise;
  }

  async logout() {
    await (this._loginPromise = this.http.post<User>('http://localhost:4200/api/logout', {}).toPromise());
    this.isUserLoggedIn.next(false);
  }


  async getUser() {
    return this._getUserPromise = this.http.get<User>('http://localhost:4200/api/user', {}).toPromise();
  }

  async addCourse(courseId: string, semester: string, grade: string) {
    return this._getAddCoursePromise = this.http.put<User>('http://localhost:4200/api/user/course', { 
        "userCourse": {
          "courseId": courseId,
          "semester": semester,
          "grade": grade
      }
    }).toPromise();
  }

  async selectMajor(majorId: string) {
    return this._getSelectMajorPromise = this.http.put<User>('http://localhost:4200/api/user/major', { 
      "majorId": majorId 
    }).toPromise();
  }

  async register(firstName: string, lastName: string, email: string, username: string, password: string) {
    return this._registerPromise = this.http.post<User>('http://localhost:4200/api/signup', {
      "name": firstName + " " + lastName,
      "email": email, 
      "username": username,
      "password": password
    }).toPromise();
  }

  async deleteCourse(courseId: string, semester: string, grade: string) {
    return this._getDeleteCoursePromise = this.http.put<User>('http://localhost:4200/api/user/deleteCourse/', {
      "userCourse": {
        "courseId": courseId,
        "semester": semester,
        "grade": grade
      }
    }).toPromise();
  }

  async updateCourse(courseId: string, semester: string, grade: string) {
    return this._getUpdateCoursePromise = this.http.put<User>('http://localhost:4200/api/user/updateCourse', {
      "courseId": courseId,
      "semester": semester,
      "grade": grade
    }).toPromise();
  }

}
