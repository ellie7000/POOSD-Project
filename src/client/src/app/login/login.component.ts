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

  user: User;

  ngOnInit(): void {
    this.user = { username: "", password: "" };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService) { }

  async loginUser() {
    if (this.validate()) {
      const data = await this.userService.login(this.user.username, this.user.password);
      console.log(data);
      this.router.navigateByUrl('/profile');
      console.log(await this.userService.getUser());
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
