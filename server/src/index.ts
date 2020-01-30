// Using ES6 imports
import Express from 'express';
import Database from './db';

const app = Express();
const port = 8080;

// define a route handler for the default home page
app.get("/", async (req: any, res: any) => {
    await Database.connectToMongo();
    Database.classes.find({}).toArray().then((stuff) => res.send(JSON.stringify(stuff)));
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
