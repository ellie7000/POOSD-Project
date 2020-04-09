import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  ngOnInit(): void {

  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private alerts: AlertsService) { }

  async loginUser() {
    if (this.validate()) {
      try {
        const data = await this.userService.login(this.username, this.password);
        this.alerts.setMessage('Successful login', 'success');
        this.router.navigateByUrl('/profile');
      }
      catch (e){
        this.alerts.setMessage(e.error.message, 'error');
      }
    }
    else {
      this.alerts.setMessage("Missing username and/or password", 'error');
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
