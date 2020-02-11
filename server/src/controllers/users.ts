import Database from '../db';
import Express from 'express';

export module User {
    export const login = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        if (!req.body.username || !req.body.password) {
            res.status(403).send({ message: "Missing username or password" });
            return res.end();
        }
        Database.users.findOne({ username: req.body.username }).then((result) => 
        {
            if (!result) {
                res.status(403).send({ message: "User not found" });
                return res.end();
            }
            if (req.session) req.session.userId = result._id;
            res.send(200).send({ message:"Successful login" });
            res.end();
        }).catch(console.error)
    }
};