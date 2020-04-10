import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Major } from '../models/major.model';
import { Course } from '../models/course.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  _getMajorsPromise: Promise<Major[]>;
  _getRequiredCoursesPromise: Promise<Course[]>
  majors: Major[];
  majorsMap: Map<string, Major> = new Map();
  majorsMapId: Map<string, Major> = new Map();

  constructor(private http: HttpClient) { 
    this.getMajors();
  }

  async getMajors() {
    this._getMajorsPromise = this.http.get<Major[]>(environment.api + '/api/majors', {}).toPromise();
    this.majors = await this._getMajorsPromise;
    for (const m of this.majors) {
      this.majorsMap.set(m.name, m);
      this.majorsMapId.set(m._id, m);
    }
    return this._getMajorsPromise;
  }

  async getRequiredCourses(majorId: string) {
    return this._getRequiredCoursesPromise = this.http.get<Course[]>(environment.api + '/api/major/' + majorId + '/requirements', {}).toPromise();
  }
 
}
