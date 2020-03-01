const fs = require('fs')
const parse = require('../../server/src/databaseTools/parser')
//===================================================Parser Tests===================================================//
describe('Test Parser', function () {

    it('test_parse_one_course_to_string', function () {

        const str = `ACG 2021 - Principles of Financial Accounting
        Credit Hours: 3`
        var courseString = parse(str)
        // const data = JSON.parse(dataJSON)
        var courseJSON = JSON.parse(courseString)

        expect(courseJSON.courses[0].name).toEqual("Principles of Financial Accounting");
        expect(courseJSON.courses[0].courseCode).toEqual("ACG 2021");
        expect(courseJSON.courses[0].credits).toEqual('3');
      });
});