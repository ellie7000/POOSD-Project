const fs = require('fs')
// This file parses text from the UCF catalog found at:
// http://catalog.ucf.edu/content.php?filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=14&expand=1&navoid=1201&print=1&filter%5Bexact_match%5D=1#acalog_template_course_filter
// This is just a sample right now where you have to manually paste in the text from the website
// into the courses.txt file.  As of now the data is written to courses.json
// to show that it has been parsed and formatted correctly.
// TODO: Upload the json objects to the database

// To run this file, make sure you are in the same
// directory as this file then enter node .\parser.js

// This regular expression pulls the following capture groups from a string:
// 3 letters from A-Z followed by 4 numbers and an optional letter tag - this is the course code
// Strip out the '-' then capture the course name
// Strip out the string 'Credit Hours:' then capture the number of credit hours
// i.e: (Course Code)('-')(Course Name)('Credit Hours:')(Credits)
// with the capture groups being (Course Code)(Course Name)(Credits)
const regex = /([A-Z]{3} [0-9]{4}[A-Z]*)(?: - )(.+)(?:\r\n\bCredit Hours: \b)(\d)/g

// Read in binary data from the file
const dataBuffer = fs.readFileSync('courses.txt')
// Convert the binary data into a string
str = dataBuffer.toString()

// Pull the capture groups out with the regular expression
courses = str.matchAll(regex)

// Erase the previous contents of the file so we can fill it in with new  information
fs.writeFileSync('courses.json', '')

for (course of courses)
{
    courseJSON = {
        name : course[2],
        courseCode : course[1],
        credits : course[3]
    }
    // Append the course as a json object in string form 
    fs.appendFileSync('courses.json', JSON.stringify(courseJSON))
}