import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UserService } from '../services/user.service';
import { MajorService } from '../services/major.service';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course.model';
import { UserCourse } from '../models/userCourse.model';
import { stringify } from 'querystring';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  courses: UserCourse[] = [];
  user: User;

  mp = new BehaviorSubject<Map<string, Map<string, UserCourse[]>>>(new Map());

  modalRef: MDBModalRef;

  years: any = [];
  semesters: any = [];
  course: any = [];

  constructor(
    private userService: UserService,
    private coursesService: CoursesService,
    private modalService: MDBModalService) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    if (this.user.coursesTaken) {
      for (const c of this.user.coursesTaken) {
        const courseInfo = await this.coursesService.getCourse(c.courseId);
        c.courseInfo = courseInfo;
        this.courses.push(c);
      }
    }
    if (this.user.coursesToTake) {
      for (const c of this.user.coursesToTake) {
        const courseInfo = await this.coursesService.getCourse(c.courseId);
        c.courseInfo = courseInfo;
        this.courses.push(c);
      }
    }

    const semToNum = {
      "SPRING": 0,
      "SUMMER": 1,
      "FALL": 2
    };

    this.courses = this.courses.sort((a: UserCourse, b: UserCourse) => {
      const aa = a.semester.split(" ");
      const bb = b.semester.split(" ");

      const yra = +aa[1];
      const yrb = +bb[1];

      if (yra != yrb) {
        return yra - yrb;
      }

      return semToNum[aa[0]] - semToNum[bb[0]];
    });

    const map = new Map<string, Map<string, UserCourse[]>>();

    for (const c of this.courses) {
      const sp = c.semester.split(" ");

      if (sp.length < 2) {
        continue;
      }

      const year = sp[1];
      const season = sp[0];
      const mp1 = map.get(year) || new Map<string, UserCourse[]>();
      map.set(year, mp1);

      const mp2 = mp1.get(season) || [];

      mp2.push(c);

      mp1.set(season, mp2);
    }

    for (const year of map.keys()) {
      this.years.push(year);
      for (const semester of map.get(year).keys()) {
        this.semesters.push(semester);
        for (const c of map.get(year).get(semester)) {
          // console.log(year + " " + semester + " ");
          // console.log(c);
          this.course.push(c);
        }
      }
    }

    console.log(this.years);
    console.log(this.semesters);
    console.log(this.course);

    this.mp.next(map);
  }

}
