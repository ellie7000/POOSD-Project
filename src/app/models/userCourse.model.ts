import { Course } from './course.model';

export class UserCourse {
    courseId: string;
    semester: string;
    grade: string;
    courseInfo?: Course;
}