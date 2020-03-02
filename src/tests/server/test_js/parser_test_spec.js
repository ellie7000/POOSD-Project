const fs = require('fs')
const parse = require('../../../server/src/databaseTools/parser')
//===================================================Parser Tests===================================================//
describe('Test Parser', function () {

    it('Parse one course to JSON', function () {

        const str = `ACG 2021 - Principles of Financial Accounting
        Credit Hours: 3`
        var courseString = parse(str)
        var courseJSON = JSON.parse(courseString)

        expect(courseJSON.courses[0].name).toEqual("Principles of Financial Accounting");
        expect(courseJSON.courses[0].courseCode).toEqual("ACG 2021");
        expect(courseJSON.courses[0].credits).toEqual('3');
      });

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
        var courseString = parse(str)
        var courseJSON = JSON.parse(courseString)

        // The first course
        expect(courseJSON.courses[0].name).toEqual("Principles of Financial Accounting");
        expect(courseJSON.courses[0].courseCode).toEqual("ACG 2021");
        expect(courseJSON.courses[0].credits).toEqual('3');

        // The second course
        expect(courseJSON.courses[1].name).toEqual("Honors Principles of Financial Accounting");
        expect(courseJSON.courses[1].courseCode).toEqual("ACG 2021H");
        expect(courseJSON.courses[1].credits).toEqual('3');
      });
});