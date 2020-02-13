import { Majors } from '../../server/src/controllers/majors';
let Request = require("request");

  describe("Server", () => {
    var server;
    beforeAll(() => {
        // Before each set of tests, start the server and save a reference to it
        server = require("../../server/src/index");
    });
    afterAll(() => {
        // After each set of tests, close the server
        server.close();
    });

describe('Test Major', function() {
    var data = {};
    // Before each individual test, issue an HTTP request and save the response
    beforeAll((done) => {
        Request.get("http://localhost:8080/majors", (error, response, body) => {
            data.body = body;
            done();
        });
    });

    it('getAllMajors', function() {
      expect(data.body).toBe("[{\"_id\":\"5e3c4ae01c9d44000050e1c7\",\"name\":\"Computer Science\"},{\"_id\":\"5e44098e1c9d440000be3fdd\",\"name\":\"Computer Engineering\"}]");
    });
  });
});
