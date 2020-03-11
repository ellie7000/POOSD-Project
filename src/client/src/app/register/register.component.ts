import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string; 
  username: string; 
  password: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onSave() {
    if (this.validate()) {
      const data = await this.userService.register(this.firstName, this.lastName, this.email, this.username, this.password);
      console.log("here");
      console.log(data);
      this.router.navigateByUrl('/login');
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

    // Check rest of attributes

    return valid;
  }

  isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null || str.length == 0;
  }

}
