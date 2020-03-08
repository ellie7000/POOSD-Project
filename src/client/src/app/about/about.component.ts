import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MajorComponent } from './major/major.component';
import { CoursesComponent } from './courses/courses.component';
import { UserService } from '../services/user.service';

@Component({ 
    templateUrl: 'about.component.html',
    styleUrls: ['./about.component.css']
 })
export class AboutComponent implements OnInit {
    modalRef: MDBModalRef;

    constructor(private modalService: MDBModalService, private userService: UserService) { }

    async ngOnInit() {
        console.log(await this.userService.getUser());
    }

    openMajor() {
        this.modalRef = this.modalService.show(MajorComponent)
    }

    openCourses() {
        this.modalRef = this.modalService.show(CoursesComponent)
    }

}
