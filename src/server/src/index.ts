// Using ES6 imports
import Express from 'express';
import Session from 'express-session';
import { Courses } from './controllers/courses';
import { Majors } from './controllers/majors';
import { User } from './controllers/users';

const Cors = require("cors");
const cookieParser = require('cookie-parser');

const app = Express();
const port = 8080;

const secret = 'cookie';

app.use(Session({
    name: 'sid',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false
    }
}));

app.use(cookieParser(secret));

app.use(Cors());

app.use(Express.json());

app.use((req, res, next) => {
    if (req.session && req.session.username) {
        res.cookie('userId', req.session.userId);
    }
    else {
        res.clearCookie('userId');
    }
    next();
});

app.get("/", async (req: any, res: any) => {
    res.send("This is our POOSD API");
});

// Routes
app.post("/api/login", User.login);

app.post("/api/signup", User.createUser);

app.post("/api/logout", User.logout);

app.put("/api/user/major", User.putMajor);

app.put("/api/user/course", User.putCourse);

app.put("/api/user/deleteCourse", User.deleteCourseFromUser);

app.get("/api/user", User.getUser);

app.get("/api/courses", Courses.getAllCourses);

app.post("/api/course", Courses.createCourse);

app.get("/api/course/:id", Courses.getCourse);

app.delete("/api/course/:id", Courses.deleteCourse);

app.get("/api/majors", Majors.getAllMajors);

app.post("/api/major", Majors.createMajor);

app.get("/api/major/:id", Majors.getMajor);

app.delete("/api/major/:id", Majors.deleteMajor);

app.get("/api/courses/update", Courses.updateCourses);

// start the Express server
let server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

module.exports = server;