import { gpaCalc } from '../../../server/src/gpa_calc';

//===================================================GPA Calculator Tests===================================================//
describe('Test GPA Calculation', function() {

    //Verify GPA calculates correctly
    it('Calculates GPA with grade and credit input', function() {
        
        var grades = ["A", "B+", "A-", "B", "C+"];
        var credits = [4, 3, 3, 4, 3];

        var calculatedGpa = gpaCalc(grades, credits);

        expect(calculatedGpa).toEqual(3.2935)
    });

    //Verify that GPA calculation returns null if any of the required information is null
    it('Calculates GPA with grade input, but null credit input', function() {
        
        var grades = ["A", "B+", "A-", "B", "C+"];
        var credits = new Array();
        credits = null;

        var calculatedGpa = gpaCalc(grades, credits);

        expect(calculatedGpa).toEqual(null);
    });

    it('Calculates GPA with credit input, but null grade input', function() {
        
        var grades = new Array();
        grades = null;
        var credits = [4, 3, 3, 4, 3];

        var calculatedGpa = gpaCalc(grades, credits);

        expect(calculatedGpa).toEqual(null);
    });

    it('Calculates GPA with credit input, but some grade input', function(){
       
        var grades = [null, "A", null, "B", "C"];
        var credits = [4, 3, 3, 4, 3];

        var calculatedGpa = gpaCalc(grades, credits);

        expect(calculatedGpa).toEqual(null);
    });

    it('Calculates GPA with grade input, but some credit input', function(){
        
        var grades = ["A", "B+", "A-", "B", "C+"];
        var credits = [4, null, 3, null, 3];
        
        var calculatedGpa = gpaCalc(grades, credits);

        expect(calculatedGpa).toEqual(null);
    });
});
