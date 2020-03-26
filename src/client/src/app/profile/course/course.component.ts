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
  semesters = ["SPRING 2015", "SUMMER 2015", "FALL 2015", "SPRING 2016", "SUMMER 2016", "FALL 2016", "SPRING 2017", "SUMMER 2017", "FALL 2017", "SPRING 2018", "SUMMER 2018", "FALL 2018", "SPRING 2019", "SUMMER 2019", "FALL 2019", "SPRING 2020", "SUMMER 2020", "FALL 2020", "SPRING 2021", "SUMMER 2021", "FALL 2021", "SPRING 2022", "SUMMER 2022", "FALL 2022", "SPRING 2023", "SUMMER 2023", "FALL 2023", "SPRING 2024", "SUMMER 2024", "FALL 2024", "SPRING 2025", "SUMMER 2025", "FALL 2025",];
  userCourse: UserCourse;
  listName: string;

  constructor(
    public modalRef: MDBModalRef,
    private userService: UserService) { }

  ngOnInit() {
    this.userGrade = this.userCourse.grade;
    this.userSemester = this.userCourse.semester;
  }

  onSave() {
    this.userService.updateCourse(this.course._id, this.userSemester, this.userGrade, this.listName);
    window.location.reload();
  }

  onDelete() {
    this.userService.deleteCourse(this.course._id, this.userCourse.semester, this.userCourse.grade, this.listName);
    window.location.reload();
  }

  onMove() {
    this.userService.moveCourse(this.course._id, this.userCourse.semester, this.userCourse.grade, this.listName);
    window.location.reload();
  }

}
