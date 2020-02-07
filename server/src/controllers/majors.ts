import Database from '../db';

export module Majors {
    export const getAllMajors = async (req: any, res: any) => {
        await Database.connectToMongo();
        res.type("json");
        Database.majors.find({}).toArray().then((result) => res.send(JSON.stringify(result)));
    };

    export const getMajor = async (req: any, res: any) => {
        await Database.connectToMongo();
        res.type("json");
        Database.majors.findOne({ _id: Database.makeId(req.params.id) }).then((result) => res.send(JSON.stringify(result)));
    };
};