"use strict";
var scraperjs = require('scraperjs');
var router = new scraperjs.Router();

const scrapeSingleWebsiteText = function(str) {
    // Create a single scraper with the given url
    var scraperPromise = scraperjs.StaticScraper.create(str)
    .scrape(function($) {
        // Extract the body from the website
        return $("body").map(function() {
            // Convert the body to text
            return $(this).text();
        }).get();
    })
    .then(function(result) {
        // Return the website text
        return result.toString()
    })
    return scraperPromise
}

// Scrape
async function scrapeUCFCourseCatalog() {
    var str = await scrapeSingleWebsiteText('https://catalog.ucf.edu/content.php?filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=14&expand=1&navoid=1201&print=1&filter%5Bexact_match%5D=1#acalog_template_course_filter')
    // str +=    await scrapeSingleWebsiteText('http://ucf.catalog.acalog.com/content.php?catoid=14&navoid=1201&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=2&filter%5Bexact_match%5D=1&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter')
    // str +=    await scrapeSingleWebsiteText('http://ucf.catalog.acalog.com/content.php?catoid=14&catoid=14&navoid=1201&filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=3&filter%5Bexact_match%5D=1&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&expand=1&print#acalog_template_course_filter')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    // str +=    await scrapeSingleWebsiteText('')
    return str
}

scrapeUCFCourseCatalog().then(console.log)