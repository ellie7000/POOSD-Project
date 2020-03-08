import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public _loginPromise: Promise<User>;
    public _getUserPromise: Promise<User>;

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
      return this._loginPromise = this.http.post<User>('http://localhost:8080/login', {
        "username": username,
        "password": password,
      }).toPromise();
    }

    getUser() {
      return this._getUserPromise = this.http.get<User>('http://localhost:8080/user').toPromise();
    }


  }
