// function gpaCalc(grades:any [], credits:any []) {
//     var gradeLetters = new Array();
//     var gradeValues = new Array();
//     var i, j;
//     var totalGrades = 0, totalCredits = 0, gpa = 0;
//     var grcount = 27;

//     gradeLetters[0] = "A+";
//     gradeValues[0] = 4.00;
//     gr[1] = "A";
//     gradeValues[1] = 4.00;
//     gradeLetters[2] = "A-"; 
//     gradeValues[2] = 3.70;
//     gradeLetters[3] = "B+";
//     gradeValues[3] = 3.33
//     gradeLetters[4] = "B";
//     gradeValues[4] = 3.00;
//     gradeLetters[5] = "B-";
//     gradeValues[5] = 2.70;
//     gradeLetters[6] = "C+";
//     gradeValues[6] = 2.30;
//     gradeLetters[7] = "C";
//     gradeValues[7] = 2.00;
//     gradeLetters[8] = "C-";
//     gradeValues[8] = 1.70;
//     gradeLetters[9] = "D+";
//     gradeValues[9] = 1.30;
//     gradeLetters[10] = "D";
//     gradeValues[10] = 1.00;
//     gradeLetters[11] = "D-";
//     gradeValues[11] = 0.70;
//     gradeLetters[12] = "F";
//     gradeValues[12] = 0.00;
//     gradeLetters[13] = "a+";
//     gradeValues[14] = 4.00;
//     gradeLetters[15] = "a";
//     gradeValues[15] = 4.00;
//     gradeLetters[16] = "a-";
//     gradeValues[16] = 3.70;
//     gradeLetters[17] = "b+";
//     gradeValues[17] = 3.33
//     gradeLetters[18] = "b";
//     gradeValues[18] = 3.00;
//     gradeLetters[19] = "b-";
//     gradeValues[19] = 2.70;
//     gradeLetters[20] = "c+";
//     gradeValues[20] = 2.30;
//     gradeLetters[21] = "c";
//     gradeValues[21] = 2.00;
//     gradeLetters[22] = "c-";
//     gradeValues[22] = 1.70;
//     gradeLetters[23] = "d+";
//     gradeValues[23] = 1.30;
//     gradeLetters[24] = "d";
//     gradeValues[24] = 1.00;
//     gradeLetters[25] = "d-";
//     gradeValues[25] = 0.70;
//     gradeLetters[26] = "f";
//     gradeValues[26] = 0.00;

//     for (i = 0; i < grades.length; i++) {
//         if (grades[i] == "") {
//             break;
//         }
//         var validGradeCheck = 0;
//         for (j = 0; j < grcount; j++) {
//             if (grades[i] == gradeLetters[j]) {
//                 totalGrades = totalGrades + (parseInt(credits[i], 10) * gradeValues[j]);
//                 totalCredits = totalCredits + parseInt(credits[i], 10);
//                 validGradeCheck = 1;
//                 break;
//             }
//         }
//         gpa = totalGrades / totalCredits;
//     }
    
//     console.log("Your GPA is " + gpa);

//     return 0;
// }
