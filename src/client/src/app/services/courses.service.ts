import { Injectable } from '@angular/core';
import {Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  public _coursesPromise: Promise<Course[]>;

  constructor(private http: HttpClient) {
    this._coursesPromise= this.http.get<Course[]>('http://localhost:8080/courses').toPromise();
  }
}
