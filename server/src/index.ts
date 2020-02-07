// Using ES6 imports
import Express from 'express';
import { Courses } from './controllers/courses'
import { Majors } from './controllers/majors'

const app = Express();
const port = 8080;

// route for the default home page
app.get("/", async (req: any, res: any) => {
    res.send("This is our POOSD API");
});

// route to all courses
app.get("/courses", Courses.getAllCourses);

// route to a course
app.get("/course/:id", Courses.getCourse);

// route to all majors
app.get("/majors", Majors.getAllMajors);

// route to a major
app.get("/major/:id", Majors.getMajor);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});