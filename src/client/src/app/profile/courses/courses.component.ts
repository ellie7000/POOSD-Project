import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})

export class CoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(public modalRef: MDBModalRef, private courseService: CoursesService) { }

  async ngOnInit() {
    await this.getCourses();
  }

  async getCourses() {
    this.courses = await this.courseService._coursesPromise;
  }


}
