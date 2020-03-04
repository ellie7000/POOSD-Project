// Using ES6 imports
import Express from 'express';
import Session from 'express-session';
import { Courses } from './controllers/courses';
import { Majors } from './controllers/majors';
import { User } from './controllers/users';

const Cors = require("cors");

const app = Express();
const port = 8080;

app.use(Session({ 
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: true
}));

app.use(Cors());

app.use(Express.json());

app.get("/", async (req: any, res: any) => {
    res.send("This is our POOSD API");
});

// Routes
app.post("/login", User.login);

app.post("/signup", User.createUser);

app.post("/logout", User.logout);

app.put("/user/major", User.putMajor);

app.get("/user", User.getUser);

app.get("/courses", Courses.getAllCourses);

app.post("/course", Courses.createCourse);

app.get("/course/:id", Courses.getCourse);

app.delete("/course/:id", Courses.deleteCourse);

app.get("/majors", Majors.getAllMajors);

app.post("/major", Majors.createMajor);

app.get("/major/:id", Majors.getMajor);

app.delete("/major/:id", Majors.deleteMajor);

app.get("/courses/update", Courses.updateCourses);

// start the Express server
let server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

module.exports = server;