// This file parses text from the UCF catalog found at:
// http://catalog.ucf.edu/content.php?filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=14&expand=1&navoid=1201&print=1&filter%5Bexact_match%5D=1#acalog_template_course_filter
// This is just a sample right now where you have to manually paste in the text from the website.
// As of now the text is simply printed to show that the information is parsed correctly.
// TODO: Write the data to a json file that can be uploaded to the database.

// To run this file and see the results, make sure you are in the same
// directory as this file then enter node .\parser.js

// This regular expression pulls the following capture groups from a string:
// 3 letters from A-Z followed by 4 numbers and an optional letter tag - this is the course code
// Strip out the '-' then capture the course name
// Strip out the string 'Credit Hours:' then capture the number of credit hours
// i.e: (Course Code)('-')(Course Name)('Credit Hours:')(Credits)
const regex = /([A-Z]{3} [0-9]{4}[A-Z]*)(?: - )(.+)(?:\n\bCredit Hours: \b)(\d)/g

// The string to be parsed
str = ` 
 
ACG 2021 - Principles of Financial Accounting
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

Same as ACG 2021 with honors level content. Occasional

BA-ACCT
  	
 
ACG 2071 - Principles of Managerial Accounting
Credit Hours: 3
Class Hours: 3
Lab and Field Work Hours: 0
Contact Hours: 3
Prerequisite(s): ACG 2021 with a “C” (2.0) or better. Corequisite(s): None. Prerequisite(s) or Corequisite(s): None.

The purpose of this class is to thoroughly familiarize the student with the various uses of accounting information for planning and control. Fall, Spring

BA-ACCT`

// Pull the capture groups out with the regular expression
courses = str.matchAll(regex)

for (course of courses)
{
    console.log('Course Code: ' + course[1])
    console.log('Course Title: ' + course[2])
    console.log('Credits: ' + course[3])
    console.log()
}
// Output should be: 
/*
    Course Code: ACG 2021
    Course Title: Principles of Financial Accounting
    Credits: 3

    Course Code: ACG 2021H
    Course Title: Honors Principles of Financial Accounting
    Credits: 3

    Course Code: ACG 2071
    Course Title: Principles of Managerial Accounting
    Credits: 3
*/