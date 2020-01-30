// Using ES6 imports
import Mongoose from 'mongoose';
import Express from 'express';

const app = Express();
const port = 8080;

// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});