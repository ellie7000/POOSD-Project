// Using ES6 imports
import Express from 'express';
import { Courses } from './controllers/courses'

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

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});