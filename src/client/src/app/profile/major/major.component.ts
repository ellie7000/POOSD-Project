import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import { Major } from '../../models/major.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MajorService } from 'src/app/services/major.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnInit {
  
  majors: Major[];
  userMajorId: string;
  userMajorName: string;

  constructor(
    public modalRef: MDBModalRef, 
    private http: HttpClient, 
    private userService: UserService,
    private majorService: MajorService) { }

  async ngOnInit() {
    this.majors = (await this.majorService._getMajorsPromise);
  }

  async onSave() {
    await this.userService.selectMajor(this.majorService.majorsMap.get(this.userMajorName)._id);
    window.location.reload();
  }

 

}
