import Database from '../db';
import Express from 'express';
import parse from '../databaseTools/parser';

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
                res.status(403).send({ message: "This course name already exists" });
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
                    res.status(200).send({ message: "Successful create course", id: success.insertedId });
                    return res.end();
                }
                else {
                    res.status(500).send({ message: "Unsuccessful create course" });
                    return res.end();
                }
            })
        }).catch(console.error);
    };

    export const deleteCourse = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");
        Database.courses.deleteOne({ _id: Database.makeId(req.params.id) }).then(success => {
            if (success) {
                res.status(200).send({ message: "Successful delete course" });
                return res.end();
            }
            else {
                res.status(500).send({ message: "Unsuccessful delete course" });
                return res.end();
            }
        }).catch(console.error);
    };

    export const updateCourses = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        const str = `ACG 2021 - Principles of Financial Accounting
        Credit Hours: 3
        Class Hours: 3
        Lab and Field Work Hours: 0
        Contact Hours: 3
        Prerequisite(s): MAC 1105C with a “C” (2.0) or better. Corequisite(s): None. Prerequisite(s) or Corequisite(s): None.
        
        Nature of accounting, financial statements, the accounting cycle, assets, current liabilities, long-term debt, and owner’s equity; accounting for proprietorships and corporations. Fall, Spring
        BA-ACCT
         
        ACG 2021H - Honors Principles of Financial Accounting
        Credit Hours: 3
        Class Hours: 3
        Lab and Field Work Hours: 0
        Contact Hours: 3
        Prerequisite(s): MAC 1105C with a “C” (2.0) or better, and consent of Honors. Corequisite(s): None. Prerequisite(s) or Corequisite(s): None.
        `
        // Parse the courses from the input string
        var coursesJSON = parse(str)
        var updatedCourses = coursesJSON.courses

        for (var i = 0; i < updatedCourses.length; i++) {
            console.log(updatedCourses[i].name)
            // Check if the course already exists
            var oldCourse = await (Database.courses.findOne({ name: updatedCourses[i].name }))
            if (oldCourse != null) {
                console.log('Course already exists')
                // res.send({ message: "This course already exists" });
            } else {
                console.log('Updating database...')
                Database.courses.insertOne({
                    name: updatedCourses[i].name,
                    courseCode: updatedCourses[i].courseCode,
                    credits: updatedCourses[i].credits
                })
            }
        }

        res.send('Updating Courses...')
    };
};