import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { UserService } from 'src/app/services/user.service';
import { UserCourse } from 'src/app/models/userCourse.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;
  userGrade: string;
  grades = ["A", "B", "C", "D", "F"];
  userSemester: string;
  semesters = ["FALL 2019"];
  userCourse: UserCourse;

  constructor(
    public modalRef: MDBModalRef,
    private userService: UserService) { }

  ngOnInit() {
    console.log(this.course);
    console.log(this.userCourse);
  }

  onSave() {
    this.userService.updateCourse(this.course._id, this.userGrade, this.userSemester);
  }

  onDelete() {
    this.userService.deleteCourse(this.course._id, this.userCourse.grade, this.userCourse.semester);
  }

}
