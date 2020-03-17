import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  async ngOnInit() {
    await this.userService.logout();
    this.router.navigateByUrl('/');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService) { }

}
