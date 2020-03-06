import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

}
