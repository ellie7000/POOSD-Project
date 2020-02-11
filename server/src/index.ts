// Using ES6 imports
import Express from 'express';
import Session from 'express-session';
import { Courses } from './controllers/courses';
import { Majors } from './controllers/majors';
import { User } from './controllers/users';

const app = Express();
const port = 8080;

app.use(Session({ 
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: true
}));

app.use(Express.json());

app.get("/", async (req: any, res: any) => {
    res.send("This is our POOSD API");
});

// Routes
app.post("/login", User.login);

app.post("/signup", User.createUser);

app.post("/logout", User.logout);

app.get("/courses", Courses.getAllCourses);

app.get("/course/:id", Courses.getCourse);

app.get("/majors", Majors.getAllMajors);

app.get("/major/:id", Majors.getMajor);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});