const fs = require('fs')
const parse = require('../../../server/src/databaseTools/parser')
//===================================================Parser Tests===================================================//
describe('Test Parser', function () {

    // Verify parse returns a JSON object with 1 course object with the proper data
    it('Parse one course to JSON', function () {

        const str = `ACG 2021 - Principles of Financial Accounting Credit Hours: 3Class Hours: 3Lab and Field Work Hours: 0Contact Hours: 3Prerequisite(s): MAC 1105C with a “C” (2.0) or better. Corequisite(s): None. Prerequisite(s) or Corequisite(s): None.`
        var courseJSON = parse(str)

        expect(courseJSON.courses[0].name).toEqual("Principles of Financial Accounting");
        expect(courseJSON.courses[0].courseCode).toEqual("ACG 2021");
        expect(courseJSON.courses[0].credits).toEqual('3');
        expect(courseJSON.courses[0].prerequisites).toEqual('MAC 1105C with a “C” (2.0) or better.')
      });

      // Verify parse returns a JSON object with multiple course objects with the proper data
      it('Parse multiple courses to JSON', function () {

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
        var coursesJSON = parse(str)

        // The first course
        expect(coursesJSON.courses[0].name).toEqual("Principles of Financial Accounting");
        expect(coursesJSON.courses[0].courseCode).toEqual("ACG 2021");
        expect(coursesJSON.courses[0].credits).toEqual('3');
        expect(coursesJSON.courses[0].prerequisites).toEqual('MAC 1105C with a “C” (2.0) or better.')

        // The second course
        expect(coursesJSON.courses[1].name).toEqual("Honors Principles of Financial Accounting");
        expect(coursesJSON.courses[1].courseCode).toEqual("ACG 2021H");
        expect(coursesJSON.courses[1].credits).toEqual('3');
        expect(coursesJSON.courses[1].prerequisites).toEqual('MAC 1105C with a “C” (2.0) or better, and consent of Honors.')
      });

      // Verify parse returns null if no courses were found
      it('Parse no courses', function () {

        const str = `Blah Blah Blah ABC BADCOURSE`
        var courseJSON = parse(str)

        expect(courseJSON).toEqual(null);
      });
});