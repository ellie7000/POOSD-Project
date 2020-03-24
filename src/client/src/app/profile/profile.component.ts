import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MajorComponent } from '../profile/major/major.component';
import { CoursesComponent } from '../profile/courses/courses.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MajorService } from '../services/major.service';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { CourseComponent } from './course/course.component';
import { UserCourse } from '../models/userCourse.model';
import { RequiredCoursesComponent } from './required-courses/required-courses.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  major: string;
  coursesTaken: string[] = [];
  coursesToTake: string[] = [];
  user: User;

  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService, 
    private userService: UserService, 
    private majorService: MajorService,
    private coursesService: CoursesService) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    await this.majorService._getMajorsPromise;
    if (this.user.majorId)
      this.major = this.majorService.majorsMapId.get(this.user.majorId).name;
    if (this.user.coursesTaken) {
      for (const c of this.user.coursesTaken) {
        this.coursesTaken.push((await this.coursesService.getCourse(c.courseId)));
      }
    }
    if (this.user.coursesToTake) {
      for (const c of this.user.coursesToTake) {
        this.coursesToTake.push((await this.coursesService.getCourse(c.courseId)));
      }
    }
  }

  openMajor() {
    this.modalRef = this.modalService.show(MajorComponent);
  }

  openCourses(listName: string) {
    this.modalRef = this.modalService.show(CoursesComponent, { data: { listName } });
  }

  openCourse(course: Course, listName: string) {
    let userCourse: UserCourse;
    if (listName === 'coursesTaken')
      userCourse = this.user.coursesTaken.find((c) => c.courseId === course._id);
    else if (listName === 'coursesToTake')
      userCourse = this.user.coursesToTake.find((c) => c.courseId === course._id);
    this.modalRef = this.modalService.show(CourseComponent, { data: { course, userCourse, listName} });
  }

  openRequiredCourses() {
    this.modalRef = this.modalService.show(RequiredCoursesComponent);
  }

}
