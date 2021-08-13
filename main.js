let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
console.log("Before");
let scoreCardObj = require("./scoreCard");
request(url, cb);
function cb (error, response, html) {
    if(error){
        console.error(error); // Print the error if one occurred
    }
    else if (response.statusCode == 404)
    {
        console.log("Page not Found");
    }
    else{
        dataExtractor(html);
    }
}
function dataExtractor(html)
{
    let searchTool = cheerio.load(html);
    let anchorrep = searchTool('a[data-hover="View All Results"]');
    let link = anchorrep.attr("href");
    let fullAllmatchPageLink = `https://www.espncricinfo.com${link}`;
    // console.log(fullAllmatchPageLink); //go to all match page

    request(fullAllmatchPageLink, allMatchPageCb);
}

function allMatchPageCb(error, response, html)
{
    if(error)
    {
        console.log(error);
    }
    else if(response.statusCode == 404)
    {
        console.log("Page Not Found");
    }
    else{
        //console.log(html);//print the html for the request made
        getAllScoreCardLink(html);
    }
}

function getAllScoreCardLink(html) {
    console.log("=========================");
    let searchTool = cheerio.load(html);
    let scorecardArr = searchTool('a[data-hover="Scorecard"]');
    for(let i = 0; i < scorecardArr.length; i++)
    {
        let link = searchTool(scorecardArr[i]).attr("href");
        let fullAllmatchPageLink = `https://www.espncricinfo.com${link}`;
        console.log(fullAllmatchPageLink);
        scoreCardObj.processSinglematch(fullAllmatchPageLink)
    }
    console.log("================================");
}