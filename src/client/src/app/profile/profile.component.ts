import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MajorComponent } from '../profile/major/major.component';
import { CoursesComponent } from '../profile/courses/courses.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService, private userService: UserService) { }

  async ngOnInit() {
    console.log(await this.userService.getUser());
    
    console.log(this.userService.isLoggedIn);
  }

  openMajor() {
    this.modalRef = this.modalService.show(MajorComponent);
  }

  openCourses() {
    this.modalRef = this.modalService.show(CoursesComponent);
  }

}
