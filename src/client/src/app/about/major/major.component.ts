import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import { Major } from '../../models/major.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnInit {
  
  majors: Major[];
  user: User;

  constructor(public modalRef: MDBModalRef, private http: HttpClient,) { }

  ngOnInit() {
    this.getMajors();
    this.getUser();
  }

  getUser() {
    this.http.get<User>('http://localhost:8080/user')
      .subscribe({
        next: data => {
          this.user = data;
          console.log(this.user);
        },
        error: error => console.error(error)
      })
  }

  getMajors(): void {
    this.http.get<Major[]>('http://localhost:8080/majors')
      .subscribe({
        next: data => {
          this.majors = data;
        },
        error: error => console.error(error)
      })
  }

}
