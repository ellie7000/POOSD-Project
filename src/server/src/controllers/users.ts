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


    // A compare function that compares the 4 digit code in a course code
    var compareCourses = function (str1: String, str2: String) {
        // Regular expression to pull out the 4 digit course code
        const regex = /([0-9]{4})*/g;
        var code1 = str1.match(regex);
        var code2 = str2.match(regex);
        if (code1 == null || code2 == null) {return 0;}
        if (code1 < code2) {return -1;}
        if (code2 < code2) {return 1;}
        return 0;
    }

    export const getUserMajorRequirements = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        res.type("json");

        var requirements:Database.Course[] = new Array();
        // Make sure a user is logged in
        if (req.session && req.session.userId) {
            // Pull the user data from the database
            var user = await (Database.users.findOne({ _id: Database.makeId(req.session?.userId) }))
            if (user && user.majorId && (user.coursesTaken || user.coursesToTake)) {
                // Pull the users major from the database
                var major = await (Database.majors.findOne({ _id: Database.makeId(user.majorId) }))
                if (major) {
                    // Sort the requirements for the major by course code
                    var sortedResult = major.requirements?.sort(compareCourses);
                    if (sortedResult) {
                        for (var string of sortedResult) {
                            // Look up the course code in the courses database
                            var course = await (Database.courses.findOne({ courseCode: string}))
                            if (course) {
                                var foundOne = false

                                if (user.coursesTaken) {
                                    // Check if the user has already taken the required course
                                    for (var i = 0; i < user.coursesTaken.length; i++) {
                                        if (course._id == user.coursesTaken[i].courseId) {
                                            foundOne = true
                                            break
                                        }
                                    }
                                }

                                if (user.coursesToTake) {
                                    // Check if the user has already added course to list
                                    for (var i = 0; i < user.coursesToTake.length; i++) {
                                        if (course._id == user.coursesToTake[i].courseId) {
                                            foundOne = true
                                            break
                                        }
                                    }
                                }

                                // If the user has not already taken the required course, push it onto the list
                                if (!foundOne) {
                                    requirements.push(course)
                                }
                            } else {
                                res.status(403).send({ message: "Could not find required course" });
                                return res.end();
                            }
                        }
                    }
                } else {
                    res.status(403).send({ message: "User has invalid major" });
                    return res.end();
                }
            } else {
                res.status(403).send({ message: "Could not find user" });
                return res.end();
            }
            res.status(200).send(JSON.stringify(requirements));
            return res.end();
        }
        else {
            res.status(403).send({ message: "No user logged in" });
            return res.end();
        }
    }

    export const putCourse = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        if (req.session && req.session.userId) {
            if (req.body.listName === "coursesTaken") {
                Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $push: { coursesTaken: req.body.userCourse } })
                    .then((result) => {
                        if (result) {
                            res.status(200).send({ message: "Successful course add" });
                            return res.end();
                        }
                        else {
                            res.status(500).send({ message: "Unsuccessful course add" });
                            return res.end();
                        }
                    }).catch(console.error);
            }
            if (req.body.listName === "coursesToTake") {
                Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $push: { coursesToTake: req.body.userCourse } })
                    .then((result) => {
                        if (result) {
                            res.status(200).send({ message: "Successful course add" });
                            return res.end();
                        }
                        else {
                            res.status(500).send({ message: "Unsuccessful course add" });
                            return res.end();
                        }
                    }).catch(console.error);
            }
        }
        else {
            res.status(403).send({ message: "No user logged in" });
            return res.end();
        }
    }

    export const updateCourse = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        if (req.session && req.session.userId) {
            if (req.body.listName === "coursesTaken") {
                Database.users.updateOne({ _id: Database.makeId(req.session.userId),  "coursesTaken.courseId" : req.body.courseId }, 
                    { $set: { "coursesTaken.$.semester": req.body.semester, "coursesTaken.$.grade": req.body.grade} } )
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
            if (req.body.listName === "coursesToTake") {
                Database.users.updateOne({ _id: Database.makeId(req.session.userId), "coursesToTake.courseId": req.body.courseId },
                    { $set: { "coursesToTake.$.semester": req.body.semester, "coursesToTake.$.grade": req.body.grade } })
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
        }
        else {
            res.status(403).send({ message: "No user logged in" });
            return res.end();
        }
    }

    export const moveCourse = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        
        // Make sure the user is logged in
        if (req.session && req.session.userId) {
            // Make sure the user is trying to move from coursesToTake to coursesTaken
            if (req.body.listName === "coursesToTake") {
                // Delete the course from coursesToTake
                Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $pull: { coursesToTake: req.body.userCourse } })
                    .then((result) => {
                        if (result && req.session) {
                            // Add the course to coursesTaken
                            Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $push: { coursesTaken: req.body.userCourse } })
                                .then((result) => {
                                    if (result) {
                                        res.status(200).send({ message: "Successful move course" });
                                        return res.end();
                                    } else {
                                        console.log("here2");
                                        res.status(500).send({ message: "Unsuccessful move course" });
                                        return res.end();
                                    }
                                }).catch(console.error);
                        } else {
                            console.log("here1");
                            res.status(500).send({ message: "Unsuccessful move course" });
                            return res.end();
                        }
                    }).catch(console.error);
            } else {
                console.log("here");
                res.status(500).send({ message: "Unsuccessful move course" });
                return res.end();
            }
        } else {
            res.status(403).send({ message: "No user logged in" });
            return res.end();
        }
    }

    export const deleteCourseFromUser = async (req: Express.Request, res: Express.Response) => {
        await Database.connectToMongo();
        if (req.session && req.session.userId) {
            if (req.body.listName === "coursesTaken") {
                Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $pull: { coursesTaken: req.body.userCourse } })
                    .then((result) => {
                        if (result) {
                            res.status(200).send({ message: "Successful delete course" });
                            return res.end();
                        }
                        else {
                            res.status(500).send({ message: "Unsuccessful delete course" });
                            return res.end();
                        }
                    }).catch(console.error);
            }
            if (req.body.listName === "coursesToTake") {
                Database.users.updateOne({ _id: Database.makeId(req.session.userId) }, { $pull: { coursesToTake: req.body.userCourse } })
                    .then((result) => {
                        if (result) {
                            res.status(200).send({ message: "Successful delete course" });
                            return res.end();
                        }
                        else {
                            res.status(500).send({ message: "Unsuccessful delete course" });
                            return res.end();
                        }
                    }).catch(console.error);
            }
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