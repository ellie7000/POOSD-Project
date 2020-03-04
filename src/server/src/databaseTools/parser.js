"use strict";
const fs = require('fs')
// This function parses a given string input for course information.
// The course information is returned as a JSON object
const parse = function(str) {
    // This regular expression pulls the following capture groups from a string:
    // 3 letters from A-Z followed by 4 numbers and an optional letter tag - this is the course code
    // Strip out the '-' then capture the course name
    // Strip out the string 'Credit Hours:' then capture the number of credit hours
    // i.e: (Course Code)('-')(Course Name)('Credit Hours:')(Credits)
    // with the capture groups being (Course Code)(Course Name)(Credits)
    const regex = /([A-Z]{3} [0-9]{4}[A-Z]*)(?: - )(.+)(?:[^C]+\bCredit Hours: \b)(\d)/g
    // Pull the capture groups out with the regular expression
    var courses = str.matchAll(regex)
    // Whether or not the regular expression found anything, initially false
    var foundOne = false

    // Initialize output string
    var coursesJSON = '{\"courses\":['

    // Convert
    var coursesArray = Array.from(courses)
    for (var i = 0; i < coursesArray.length; i++)
    {
        // If we're here, the regular expression found something
        foundOne = true
        var courseJSON = {
            name : coursesArray[i][2],
            courseCode : coursesArray[i][1],
            credits : coursesArray[i][3]
        }
        coursesJSON += JSON.stringify(courseJSON)
        coursesJSON += (',')
    }
    // Strip off the last comma so the JSON is formatted correctly
    coursesJSON = coursesJSON.substring(0, coursesJSON.length - 1);
    coursesJSON += (']}')
    if (foundOne) {
        return JSON.parse(coursesJSON)
    } else {
        return null
    }
}
module.exports = parse