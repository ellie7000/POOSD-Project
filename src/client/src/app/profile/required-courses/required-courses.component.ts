import { Component, OnInit } from '@angular/core';
import { Major } from 'src/app/models/major.model';
import { MDBModalRef } from 'angular-bootstrap-md';
import { UserService } from 'src/app/services/user.service';
import { MajorService } from 'src/app/services/major.service';
import { Course } from 'src/app/models/course.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-required-courses',
  templateUrl: './required-courses.component.html',
  styleUrls: ['./required-courses.component.css']
})
export class RequiredCoursesComponent implements OnInit {

  courses: Course[] = [];
  user: User;

  constructor(
    public modalRef: MDBModalRef,
    private majorService: MajorService,
    private userService: UserService) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.courses = (await this.majorService.getRequiredCourses(this.user.majorId));
  }

  async onSave() {
    //window.location.reload();
  }

}
