import Database from '../db';
import Express from 'express';

export module Majors {
    export const getAllMajors = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.majors.find({}).toArray().then((result) => res.send(JSON.stringify(result)));
    };

    export const getMajor = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.majors.findOne({ _id: Database.makeId(req.params.id) }).then((result) => res.send(JSON.stringify(result)));
    };
};