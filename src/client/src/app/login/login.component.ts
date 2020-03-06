import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
 })
export class LoginComponent implements OnInit{

    user: User;

    ngOnInit(): void {
       this.user = { username:"", password:"" };
    }

    constructor(
        private http: HttpClient,
        private router: Router) { }

    loginUser(): void {
        if (this.validate()) {
            this.http.post<User>('http://localhost:8080/login', {
                "username": this.user.username,
                "password": this.user.password,
            }).subscribe({
                next: data => {
                    console.log(data);
                    this.router.navigateByUrl('/about');
                },
                error: error => console.error(error)
            })
        }
        else {

        }
    }

    validate(): boolean {
        let valid: boolean = true;

        if (this.isEmptyOrSpaces(this.user.username)) {
            valid = false;
        }
        if (this.isEmptyOrSpaces(this.user.password)) {
            valid = false;
        }

        return valid;
    }

    isEmptyOrSpaces(str: string) {
        return str === null || str.match(/^ *$/) !== null || str.length == 0;
    }

}