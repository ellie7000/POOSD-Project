import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Major } from '../models/major.model';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  _getMajorsPromise: Promise<Major[]>;
  majors: Major[];
  majorsMap: Map<string, Major> = new Map();
  majorsMapId: Map<string, Major> = new Map();

  constructor(private http: HttpClient) { 
    this.getMajors();
  }

  async getMajors() {
    this._getMajorsPromise = this.http.get<Major[]>('http://localhost:8080/api/majors', {}).toPromise();
    this.majors = await this._getMajorsPromise;
    for (const m of this.majors) {
      this.majorsMap.set(m.name, m);
      this.majorsMapId.set(m._id, m);
    }
    return this._getMajorsPromise;
  }
 
}
