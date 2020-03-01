import Database from '../db';
import Express, { Request } from 'express';

export module Majors {
    export const getAllMajors = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.majors.find({}).toArray().then((result) => res.send(JSON.stringify(result)));
    };

    export const getMajor = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.majors.findOne({ _id: Database.makeId(req.params.id) }).then((result) => {
            if (result) {
                res.status(200).send(JSON.stringify(result));
                return res.end();
            }
            else {
                res.status(500).send({ message: "Major not found" });
                return res.end();
            }
        }).catch(console.error);
    };

    export const createMajor = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();

        if (!req.body.name) {
            res.status(403).send({ message: "Missing name" });
            return res.end();
        }

        Database.majors.findOne({ name: req.body.name }).then((result) => {
            // Validate
            if (result) {
                res.status(403).send({ message: "This major name already exists" });
                return res.end();
            }
            if (!req.body.name) {
                res.status(403).send({ message: "Missing a name" });
                return res.end();
            }

            Database.majors.insertOne({
                name: req.body.name,
            }).then(success => {
                if (success) {
                    res.status(200).send({ message: "Successful create major", id: success.insertedId });
                    return res.end();
                }
                else {
                    res.status(500).send({ message: "Unsuccessful create major" });
                    return res.end();
                }
            })
        }).catch(console.error);
    }

    export const deleteMajor = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.majors.deleteOne({ _id: Database.makeId(req.params.id) }).then(success => {
            if (success) {
                res.status(200).send({ message: "Successful delete major" });
                return res.end();
            }
            else {
                res.status(500).send({ message: "Unsuccessful delete major" });
                return res.end();
            }
        }).catch (console.error);
    }
};