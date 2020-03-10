import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})

export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  course: string;

  constructor(
    public modalRef: MDBModalRef, 
    private courseService: CoursesService,
    private userService: UserService,
    private coursesService: CoursesService) { }

  async ngOnInit() {
    await this.getCourses();
  }

  async getCourses() {
    this.courses = await this.courseService._coursesPromise;
  }

  onAdd(courseName: string) {
    this.userService.addCourse(this.courseService.coursesMap.get(courseName)._id);
    console.log(this.userService.getUser());
  }

  onSave() {
    window.location.reload();
  }


}
