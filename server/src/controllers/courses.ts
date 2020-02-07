import Database from '../db';

export module Courses {
    export const getAllCourses = async (req: any, res: any) => {
        await Database.connectToMongo();
        res.type("json");
        Database.classes.find({}).toArray().then((result) => res.send(JSON.stringify(result)));
    };

    export const getCourse = async (req: any, res: any) => {
        await Database.connectToMongo();
        res.type("json");
        Database.classes.findOne({ _id: Database.makeId(req.params.id) }).then((result) => res.send(JSON.stringify(result)));
    };
};