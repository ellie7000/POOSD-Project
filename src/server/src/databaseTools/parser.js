const fs = require('fs')
// This function parses a given string input for course information.
// The course information is returned as a JSON string
const parse = function(str) {
    // This regular expression pulls the following capture groups from a string:
    // 3 letters from A-Z followed by 4 numbers and an optional letter tag - this is the course code
    // Strip out the '-' then capture the course name
    // Strip out the string 'Credit Hours:' then capture the number of credit hours
    // i.e: (Course Code)('-')(Course Name)('Credit Hours:')(Credits)
    // with the capture groups being (Course Code)(Course Name)(Credits)
    const regex = /([A-Z]{3} [0-9]{4}[A-Z]*)(?: - )(.+)(?:[^0-9]+)(\d)/g
    // Pull the capture groups out with the regular expression
    var courses = str.matchAll(regex)

    // Erase the previous contents of the file so we can fill it in with new  information

    var coursesJSON = '{\"courses\":['

    for (course of courses)
    {
        courseJSON = {
            name : course[2],
            courseCode : course[1],
            credits : course[3]
        }
        coursesJSON += JSON.stringify(courseJSON)
        coursesJSON += (',')
    }
    coursesJSON = coursesJSON.substring(0, coursesJSON.length - 1);
    coursesJSON += (']}')
    console.log(coursesJSON)
    return coursesJSON
}
module.exports = parse