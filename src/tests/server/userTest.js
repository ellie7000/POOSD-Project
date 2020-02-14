import Database from '../../server/src/db';

let Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        // Turn on test mode to connect to local database
        Database.TESTMODE = true;

        // Before each set of tests, start the server and save a reference to it
        server = require("../../server/src/index");
    });
    afterAll(() => {
        // After each set of tests, close the server
        server.close();
    });

    describe('Test Create User', function () {
        var data = {};
        // Before each individual test, issue an HTTP request and save the response
        beforeAll((done) => {
            Request.post("http://localhost:8080/signup",
            {
                json: true,
                body: {
                    "username": "teststudent",
                    "password": "test",
                    "name": "Student",
                    "email": "teststudent@knights.ucf.edu"
                }
            },
            (error, response, body) => {
                data.body = body;
                done();
            });
        });

        it('createUser', function () {
            expect(data.body).toEqual({ message: "Successful create user" });
        });
        describe('Test User Login', function () {
            var data = {};
            // Before each individual test, issue an HTTP request and save the response
            beforeAll((done) => {
                Request.post("http://localhost:8080/login",
                    {
                        json: true,
                        body: {
                            "username": "teststudent",
                            "password": "test",
                        }
                    },
                    (error, response, body) => {
                        data.body = body;
                        done();
                    });
            });

            it('userLogin', function () {
                expect(data.body).toEqual({ message: "Successful login" });
            });
            describe('Test User Logout', function () {
                var data = {};
                // Before each individual test, issue an HTTP request and save the response
                beforeAll((done) => {
                    Request.post("http://localhost:8080/logout",
                        {
                            json:true
                        },
                        (error, response, body) => {
                            data.body = body;
                            done();
                        });
                });

                it('userLogout', function () {
                    expect(data.body).toEqual({ message: "Successful logout" });
                });
            });
        });
    });
   
});
