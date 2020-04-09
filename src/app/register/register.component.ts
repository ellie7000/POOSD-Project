import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";
  email: string = ""; 
  username: string = ""; 
  password: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
  }

  async onSave() {
    if (this.validate()) {
      try {
        const data = await this.userService.register(this.firstName, this.lastName, this.email, this.username, this.password);
        this.router.navigateByUrl('/login');
        this.alerts.setMessage("Successfully created account", 'success');
      }
      catch (e) {
        this.alerts.setMessage(e.error.message, 'error');
      }
    }
    else {
      this.alerts.setMessage("Must fill out all fields", 'error');
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
    if (this.isEmptyOrSpaces(this.email)) {
      valid = false;
    }
    if (this.isEmptyOrSpaces(this.firstName)) {
      valid = false;
    }
    if (this.isEmptyOrSpaces(this.lastName)) {
      valid = false;
    }

    return valid;
  }

  isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null || str.length == 0;
  }

}
