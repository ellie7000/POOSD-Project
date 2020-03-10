import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  ngOnInit(): void {

  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService) { }

  async loginUser() {
    if (this.validate()) {
      const data = await this.userService.login(this.username, this.password);
      console.log(data);
      this.router.navigateByUrl('/profile');
    }
    else {

    }
  }

  validate(): boolean {
    let valid: boolean = true;

    if (this.isEmptyOrSpaces(this.username)) {
      valid = false;
    }
    if (this.isEmptyOrSpaces(this.password)) {
      valid = false;
    }

    return valid;
  }

  isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null || str.length == 0;
  }

}
