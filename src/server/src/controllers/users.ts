import Database from '../db';
import Express from 'express';
import Bcrypt from 'bcrypt';

export module User {
    export const login = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();

        if (!req.body.username || !req.body.password) {
            res.status(403).send({ message: "Missing username or password" });
            return res.end();
        }
        
        Database.users.findOne({ username: req.body.username }).then((result) => {
            if (!result) {
                res.status(403).send({ message: "User not found" });
                return res.end();
            }
            if (!Bcrypt.compareSync(req.body.password, result.passwordHash)) {
                res.status(403).send({ message: "Incorrect password"});
                return res.end();
            }

            if (req.session) {
                req.session.userId = ""+result._id;
                res.cookie('userId', req.session.userId);
            }
            res.status(200).send({ message: "Successful login" });
            return res.end();

        }).catch(console.error)
    }

    export const createUser = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();

        if (!req.body.username || !req.body.password) {
            res.status(403).send({ message: "Missing username or password"});
            return res.end();
        }

        Database.users.findOne( { username: req.body.username }).then((result) => {
            // Validate
            if (result) {
                res.status(403).send({ message: "This username already exists"});
                return res.end();
            }
            if (!req.body.name) {
                res.status(403).send({ message: "Missing a name" });
                return res.end();
            }
            if (!req.body.username) {
                res.status(403).send({ message: "Missing a username" });
                return res.end();
            }
            if (!req.body.email) {
                res.status(403).send({ message: "Missing an email" });
                return res.end();
            }
            if (!req.body.password) {
                res.status(403).send({ message: "Missing a password" });
                return res.end();
            }

            const passwordHash = Bcrypt.hashSync(req.body.password, 10);

            Database.users.insertOne({  name: req.body.name, 
                                        username: req.body.username, 
                                        email: req.body.email,
                                        passwordHash
                                    }).then(success => {
                                        if (success) {
                                            if (req.session) req.session.userId = success.insertedId;
                                            res.status(200).send({ message: "Successful create user"});
                                            return res.end();
                                        }
                                        else {
                                            res.status(500).send({ message: "Unsuccessful create user" });
                                            return res.end();
                                        }
                                    })
        }).catch(console.error);
    }

    export const logout = async (req: Express.Request, res: Express.Response) => {
        if (req.session) {
            delete req.session.userId;
            res.clearCookie('sid');
            res.status(200).send({ message: "Successful logout" });
            return res.end();
        }
        else {
            res.status(500).send({ message: "Unsuccessful logout" });
            return res.end();
        }
    }

    export const putMajor = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        if (req.session && req.session.userId) {
            Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $set: {majorId: req.body.majorId} })
                .then((result) => {
                    if (result) {
                        res.status(200).send({ message: "Successful update major" });
                        return res.end();
                    }
                    else {
                        res.status(500).send({ message: "Unsuccessful update major" });
                        return res.end();
                    }
            }).catch (console.error);
        }
        else {
            res.status(403).send({ message: "No user logged in" });
            return res.end();
        }
    }

    export const putCourse = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        if (req.session && req.session.userId) {
            Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $push: { coursesTaken: req.body } })
                .then((result) => {
                    if (result) {
                        res.status(200).send({ message: "Successful update course" });
                        return res.end();
                    }
                    else {
                        res.status(500).send({ message: "Unsuccessful update course" });
                        return res.end();
                    }
                }).catch(console.error);
        }
        else {
            res.status(403).send({ message: "No user logged in" });
            return res.end();
        }
    }

    export const getUser = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.users.findOne({ _id: Database.makeId(req.session?.userId) }).then((result) => {
            if (result) {
                res.status(200).send(JSON.stringify(result));
                return res.end();
            }
            else {
                res.status(500).send({ message: "User not found" });
                return res.end();
            }
        }).catch(console.error);
    };

}