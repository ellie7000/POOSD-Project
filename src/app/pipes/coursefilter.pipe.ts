import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
    name: 'coursefilter'
})

export class CourseFilterPipe implements PipeTransform {
    transform(courses: Course[], text: string): Course[] {
        if (!courses || !text || text === "") {
            return [];
        }

        text = text.toLowerCase();

        return courses.filter(course => {
            const nameHasFilter = course.name.toLowerCase().indexOf(text) > -1;
            const codeHasFilter = course.courseCode.toLowerCase().indexOf(text) > -1;

            return nameHasFilter || codeHasFilter;
        });
    }
}