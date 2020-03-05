import mongodb = require('mongodb');

namespace Database {

    export interface ObjectID {
        _id: string | mongodb.ObjectID
    }

    export interface Course {
        _id: string | mongodb.ObjectID,
        name: string
        courseCode: string;
        credits: number;
    }

    export interface Major {
        _id: string | mongodb.ObjectID,
        name: string
    }

    export interface User {
        _id: string | mongodb.ObjectID,
        name: string,
        username: string,
        email: string,
        passwordHash: string,
        majorId?: string,
        coursesTaken?: string[]
    }
    
    export function makeId(id: string) {
        return new mongodb.ObjectID(id);
    }
    
    export var client: mongodb.MongoClient;
    export var db: mongodb.Db;
    export var courses: mongodb.Collection<Course>;
    export var majors: mongodb.Collection<Major>;
    export var users: mongodb.Collection<User>;

    export var TESTMODE = false;

    const DB_URL = 'mongodb+srv://POOSDKnightsPathAdmin:POOSDKnightsPathPassword@cluster0-tfoma.azure.mongodb.net/test?retryWrites=true&w=majority';

    export async function connectToMongo(): Promise<mongodb.Db> {
        if (db) return Promise.resolve(db);
        return mongodb.connect(DB_URL, {
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(c => {
            client = c;
            db = client.db(TESTMODE ? "KnightsPathTest" : "KnightsPath");
            courses = db.collection("Courses");
            majors = db.collection("Majors");
            users = db.collection("Users");
            return db;
        })
    }

    export function disconnectFromMongo() {
        client.close()
    }
}

export = Database