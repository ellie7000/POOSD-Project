import { UserCourse } from './userCourse.model';

export class User {
    username: string;
    password: string;
    name: string;
    email: string;
    majorId?: string;
    coursesTaken?: UserCourse[];
}
