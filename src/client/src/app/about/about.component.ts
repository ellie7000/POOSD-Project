import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MajorComponent } from './major/major.component';
import { CoursesComponent } from './courses/courses.component';

@Component({ 
    templateUrl: 'about.component.html',
    styleUrls: ['./about.component.css']
 })
export class AboutComponent implements OnInit {
    modalRef: MDBModalRef;

    constructor(private modalService: MDBModalService) { }

    ngOnInit() {
    }

    openMajor() {
        this.modalRef = this.modalService.show(MajorComponent)
    }

    openCourses() {
        this.modalRef = this.modalService.show(CoursesComponent)
    }

}
