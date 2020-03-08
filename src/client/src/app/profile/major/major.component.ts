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

  constructor(public modalRef: MDBModalRef, private http: HttpClient) { }

  ngOnInit() {
    this.getMajors();
  }

  getMajors(): void {
    this.http.get<Major[]>('http://localhost:8080/api/majors')
      .subscribe({
        next: data => {
          this.majors = data;
        },
        error: error => console.error(error)
      })
  }

}
