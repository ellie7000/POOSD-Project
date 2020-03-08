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

  constructor(private http: HttpClient, private cookies: CookieService) {
    if (cookies.get('sid')) {
      this.isLoggedIn = true;
    }
  }

  async login(username: string, password: string) {
    await (this._loginPromise = this.http.post<User>('http://localhost:4200/api/login', {
      "username": username,
      "password": password,
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

}
