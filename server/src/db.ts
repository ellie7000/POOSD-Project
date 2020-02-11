import mongodb = require('mongodb');

namespace Database {

    export interface ObjectID {
        _id: string | mongodb.ObjectID
    }

    export interface Class {
        _id: string | mongodb.ObjectID,
        name: string
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
    }
    
    export function makeId(id: string) {
        return new mongodb.ObjectID(id);
    }
    
    export var client: mongodb.MongoClient;
    export var db: mongodb.Db;
    export var classes: mongodb.Collection<Class>;
    export var majors: mongodb.Collection<Major>;
    export var users: mongodb.Collection<User>;

    export async function connectToMongo(): Promise<mongodb.Db> {
        if (db) return Promise.resolve(db);
        return mongodb.connect('mongodb://localhost:27017', {
            bufferMaxEntries: 0,
            reconnectTries: 5000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(c => {
            client = c;
            db = client.db("POOSD");
            classes = db.collection("Classes");
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