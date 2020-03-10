import { Injectable } from '@angular/core';
import {Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  public _coursesPromise: Promise<Course[]>;
  courses: Course[] = [];
  coursesMap: Map<string, Course> = new Map();
  coursesMapId: Map<string, Course> = new Map();

  constructor(private http: HttpClient) {
    this.getCourses();
  }

  async getCourses() {
    await (this._coursesPromise = this.http.get<Course[]>('http://localhost:4200/api/courses').toPromise());
    for (const m of await this._coursesPromise) {
      this.coursesMap.set(m.name, m);
      this.coursesMapId.set(m._id, m);
    }
  }

  async getCourse(courseId: string) {
    let course;
    await (course = this.http.get<Course>('http://localhost:4200/api/course/' + courseId).toPromise());
    return course;
  }
}
