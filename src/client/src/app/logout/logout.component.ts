import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ThrowStmt } from '@angular/compiler';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  async ngOnInit() {
    try {
      await this.userService.logout();
      this.alerts.setMessage('Successful logout', 'success');
      this.router.navigateByUrl('/');
    }
    catch (e) {
      this.alerts.setMessage(e.error.message, 'error');
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private alerts: AlertsService) { }

}
