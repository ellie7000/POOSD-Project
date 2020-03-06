import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  ngOnInit() {
    this.logoutUser();
  }

  constructor(
    private http: HttpClient,
    private router: Router) { }

  logoutUser(): void {
    console.log("here");
      this.http.post<User>('http://localhost:8080/logout', {}).subscribe({
        next: data => {
          console.log(data);
          this.router.navigateByUrl('/');
        },
        error: error => console.error(error)
      })
  }

}
