import { Majors } from '../../server/src/controllers/majors';
import { stringify } from 'querystring';
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

    describe('Test Create Major', function () {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        Request.post("http://localhost:8080/majors",
        {
          json: true,
          body: {
            "name": "Physics",
          }
        },
        (error, response, body) => {
          data.body = body;
          done();
        });
      });

      it('createMajor', function () {
        expect(data.body).toBe(""); // FILL OUT
      });
    });

    describe('Test Get A Major', function () {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
        Request.get("http://localhost:8080/majors" + id, (error, response, body) => {
          data.body = body;
          done();
        });
      });

      it('getAllMajors', function () {
        expect(data.body).toBe("");
      });
    });
    
    describe('Test Get All Majors', function() {
      var data = {};
      // Before each individual test, issue an HTTP request and save the response
      beforeAll((done) => {
          Request.get("http://localhost:8080/majors", (error, response, body) => {
              data.body = body;
              done();
          });
      });

      it('getAllMajors', function() {
        expect(data.body).toBe("");
      });
    });

});
