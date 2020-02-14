import Database from '../db';
import Express from 'express';

export module Courses {
    export const getAllCourses = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.courses.find({}).toArray().then((result) => res.send(JSON.stringify(result)));
    };

    export const getCourse = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.courses.findOne({ _id: Database.makeId(req.params.id) }).then((result) => res.send(JSON.stringify(result)));
    };

    export const createCourse = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();

        if (!req.body.name) {
            res.status(403).send({ message: "Missing name" });
            return res.end();
        }

        Database.courses.findOne({ name: req.body.name }).then((result) => {
            // Validate
            if (result) {
                res.status(403).send({ message: "This class name already exists" });
                return res.end();
            }
            if (!req.body.name) {
                res.status(403).send({ message: "Missing a name" });
                return res.end();
            }

            Database.courses.insertOne({
                name: req.body.name,
                courseCode: req.body.courseCode,
                credits: req.body.credits
            }).then(success => {
                if (success) {
                    if (req.session) req.session.userId = success.insertedId;
                    res.status(200).send({ message: "Successful create class" });
                    return res.end();
                }
                else {
                    res.status(500).send({ message: "Unsuccessful create class" });
                    return res.end();
                }
            })
        }).catch(console.error);
    }
};