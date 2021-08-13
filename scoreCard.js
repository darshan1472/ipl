let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
//console.log("Before");
function processSinglematch(url)
{
    request(url, cb);
}
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
    //team name
    let bothInningArr = searchTool(".Collapsible");
    
    for(let i = 0; i < bothInningArr.length; i++)
    {
        //scoreCard = searchTool(bothInningsArr[i]).html()
        let teamNameElem = searchTool(bothInningArr[i]).find("h5");
        let teamName = teamNameElem.text();
        //console.log(teamName);
        teamName = teamName.split("INNINGS")[0];
        //console.log(teachName);
        teamName = teamName.trim();
        console.log(teamName);        // Name of the json file
        let batsManTableBodAllRows = searchTool(bothInningArr[i]).find(".table.batsman tbody tr");
        console.log(batsManTableBodAllRows.length);   //score of each team in json file
        //type conversion/cohersion loops -> 
        for(let j = 0; j < batsManTableBodAllRows.length; j++)
        {
            let numberofTds = searchTool(batsManTableBodAllRows[j]).find("td");
            //console.log(numberofTds)
            if(numberofTds.length == 8)
            {
                //console.log("You are valid");
                let playerName = searchTool(numberofTds[0]).text();
                console.log(playerName);   //player name of each team in json file
            }
        }
        console.log("=============================");
    }
}

module.exports = {
    processSinglematch
}
function finalprocessingPlayer(teamname,playername,runs,balls,fours,sixes,sr,opponentteamname,venue,date,result1){
    let teamPath=path.join(_dirname,"ipl",teamname)
    let inputdata={
        teamname,
        playername,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentteamname,
        venue,
        date,
        result1
    }
    dircre(teamPath);
    let PlayerPath=path.join(teamPath,playername + ".json");
    let jsonWriteable=JSON.stringify(inputdata);
    fs.writeFileSync(Playerpath,jsonwriteable);
}


