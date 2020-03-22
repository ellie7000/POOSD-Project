import Database from '../../../server/src/db';

let Request = require("request");

const { Gen } = require("verify-it");
const random_username = Gen.stringWithLength(10)();

describe("Server", () => {
  var server;
  beforeAll(() => {
    // Turn on test mode to connect to local database
    Database.TESTMODE = true;

    // Before each set of tests, start the server and save a reference to it
    server = require("../../../server/src/index");
  });
  afterAll(() => {
    // After each set of tests, close the server
    server.close();
  });

  var id = "";

//===================================================Major Tests===================================================//
  describe('Test Create Major', function () {
    var data = {};
    // Before each individual test, issue an HTTP request and save the response
    beforeAll((done) => {
      Request.post("http://localhost:8080/major",
        {
          json: true,
          body: {
            "name": "Test Major",
          }
        },
        (error, response) => {
          data.body = response.body;
          id = response.body.id;
          done();
        });
    });

    it('createMajor', function () {
      expect(data.body.message).toEqual("Successful create major");
    });
  });
    describe('Test Get All Majors', function () {
      var data = {};
      var major = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        Request.get("http://localhost:8080/majors", (error, response, body) => {
          data.body = response.body;
          major = JSON.parse(data.body);
          done();
        });
      });

      it('getAllMajors', function () {
        expect(major[0].name).toEqual("Test Major");
      });
    });

    describe('Test Get A Major', function () {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        while (id === ""); // Wait for id from create
        Request.get("http://localhost:8080/major/" + id,
          {
            json: true
          },
          (error, response, body) => {
            data.body = response.body;
            done();
          });
      });

      it('getMajor', function () {
        expect(data.body.name).toEqual("Test Major");
      });
    });

    describe('Test Delete Major', function () {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        while (id === ""); // Wait for id from create
        Request.delete("http://localhost:8080/major/" + id,
          {
            json: true
          },
          (error, response) => {
            data.body = response.body;
            done();
          });
      });

      it('deleteMajor', function () {
        expect(data.body.message).toEqual("Successful delete major");
      });
    });


//===================================================Course Tests===================================================//
  describe('Test Create Course', function () {
    var data = {};
    // Before each individual test, issue an HTTP request and save the response
    beforeAll((done) => {
      Request.post("http://localhost:8080/course",
        {
          json: true,
          body: {
            "name": "Test Course",
            "courseCode": "Test Course Code",
            "credits": 0
          }
        },
        (error, response) => {
          data.body = response.body;
          id = response.body.id;
          done();
        });
    });
    it('createCourse', function () {
      expect(data.body.message).toEqual("Successful create course");
    });
  });

    describe('Test Get All Courses', function () {
      var data = {};
      var course = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        Request.get("http://localhost:8080/courses", (error, response, body) => {
          data.body = response.body;
          course = JSON.parse(data.body);
          done();
        });
      });

      it('getAllCourses', function () {
        expect(course[0].name).toEqual("Test Course");
        expect(course[0].courseCode).toEqual("Test Course Code");
        expect(course[0].credits).toBe(0);
      });
    });

    describe('Test Get A Course', function () {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        while (id === ""); // Wait for id from create
        Request.get("http://localhost:8080/course/" + id,
          {
            json: true
          },
          (error, response, body) => {
            data.body = response.body;
            done();
          });
      });

      it('getCourse', function () {
        expect(data.body.name).toEqual("Test Course");
        expect(data.body.courseCode).toEqual("Test Course Code");
        expect(data.body.credits).toBe(0);
      });
    });

    describe('Test Delete Course', function () {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        while (id === ""); // Wait for id from create
        Request.delete("http://localhost:8080/course/" + id,
          {
            json: true
          },
          (error, response) => {
            data.body = response.body;
            done();
          });
      });

      it('deleteCourse', function () {
        expect(data.body.message).toEqual("Successful delete course");
      });
    });

  

  //===================================================User Tests===================================================//
  describe('Test Create User', function () {
    var data = {};
    // Before each individual test, issue an HTTP request and save the response
    beforeAll((done) => {
      Request.post("http://localhost:8080/signup",
        {
          json: true,
          body: {
            "username": random_username,
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
      expect(data.body.message).toEqual("Successful create user");
    });
  });

    describe('Test User Login', function () {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        Request.post("http://localhost:8080/login",
          {
            json: true,
            body: {
              "username": random_username,
              "password": "test",
            }
          },
          (error, response, body) => {
            data.body = body;
            done();
          });
      });

      it('userLogin', function () {
         expect(data.body.message).toEqual("Successful login");
      });
    });

      describe('Test Get A User', function () {
        var data = {};
        // Before each individual test, issue an HTTP request and save the response
        beforeAll((done) => {
          while (id === ""); // Wait for id from create
          Request.get("http://localhost:8080/User/",
            {
              json: true
            },
            (error, response, body) => {
              data.body = response.body;
              done();
            });
        });
  
        it('getUser', function () {
          expect(data.body.name).toEqual("Test User");
        });
      });

      describe('Test User Logout', function () {
        var data = {};
        // Before each individual test, issue an HTTP request and save the response
        beforeAll((done) => {
          Request.post("http://localhost:8080/logout",
            {
              json: true
            },
            (error, response, body) => {
              data.body = body;
              done();
            });
        });

        it('userLogout', function () {
          expect(data.body.message).toEqual("Successful logout");
        });
      });

});
