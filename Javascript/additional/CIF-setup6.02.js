/*
This file gives functions to the CIF setup page.
*/

var os;//operating system of the user
var win;//next page window
var saved;
var teamA;
var teamB;
var aWins;
var bWins;
var lineupA;
var lineupB;
var sets;
var playTo;
var cap;
var scores;

/*
Initializes values for the setup page.
*/
function init()
{
	os = getMobileOperatingSystem();
    saved = "";
    teamA = "";
    teamB = "";
    aWins = 0;
    bWins = 0;
    sets = 0;
    lineupA = [];
    lineupB = [];
    playTo = 25;
    cap = 0;
	scores = '';
	/*
	If storage session json has content, then it should not be the first set, and we can skip the first overlay
	*/
	if(sessionStorage.getItem('json'))
	{
		saved = sessionStorage.getItem('json');
		var saveddata = JSON.parse(saved);
		document.getElementById("teamA").value = saveddata.teamA;
		document.getElementById("teamB").value = saveddata.teamB;
		document.getElementById("playTo").value = saveddata.playTo;
		aWins = saveddata.aWins;
		bWins = saveddata.bWins;
		document.getElementById("sets").value = saveddata.sets;
		lineupA = saveddata.aLineup;
		lineupB = saveddata.bLineup;
		scores = saveddata.scores;
		
		document.getElementById('alineup1').value = lineupA[0];
        document.getElementById('alineup2').value = lineupA[1];
		document.getElementById('alineup3').value = lineupA[2];
		document.getElementById('alineup4').value = lineupA[3];
		document.getElementById('alineup5').value = lineupA[4];
		document.getElementById('alineup6').value = lineupA[5];
		document.getElementById('alineupL').value = lineupA[6];
    
		document.getElementById('blineup1').value = lineupB[0];
		document.getElementById('blineup2').value = lineupB[1];
		document.getElementById('blineup3').value = lineupB[2];
		document.getElementById('blineup4').value = lineupB[3];
		document.getElementById('blineup5').value = lineupB[4];
		document.getElementById('blineup6').value = lineupB[5];
		document.getElementById('blineupL').value = lineupB[6];
		
		openOverlay2();
	}
	else {
	  if(sessionStorage.getItem('scores')) {
		var scorelist = sessionStorage.getItem('scores').split(",");
		for(var i = 1; i < scorelist.length; i++)
    		document.getElementById('score'+ i).innerHTML = scorelist[i-1];
	    openScoreOverlay();
	}
	else {
      openOverlay1();
	}
	}
}

/*
Hides all overlays from the page.
*/
function resetOverlays()
{
    document.getElementById("overlay1").style.width = "0%";
    document.getElementById("overlay2").style.width = "0%";
    document.getElementById("overlay3").style.width = "0%";
	document.getElementById("scoreoverlay").style.width = "0%";
}

/*
Opens overlay 1.
*/
function openOverlay1()
{
    resetOverlays();
    document.getElementById("overlay1").style.width = "100%";
}

/*
Opens overlay 2
*/
function openOverlay2()
{
    if(document.getElementById('teamA').value == '' || document.getElementById('teamB').value == '')
    {
        Android.toast('Team name is missing!');
        return;
    }
    
    if(document.getElementById('playTo').value == '')
    {
        Android.toast('Need to input a score to play to!');
        return;
    }
    
    saved = "";
    teamA = document.getElementById('teamA').value;
    teamB = document.getElementById('teamB').value;
    
    document.getElementById('ateamlabel').innerHTML = teamA;
    document.getElementById('bteamlabel').innerHTML = teamB;
    
    sets = document.getElementById('sets').value;
    playTo = document.getElementById('playTo').value;
    
    if(document.getElementById('cap').value != '')
        cap = document.getElementById('cap').value;
    
    resetOverlays();
    document.getElementById('overlay2').style.width = "100%";
}

/*
Opens overlay 3.
*/
function openOverlay3()
{
    resetOverlays();
    document.getElementById("overlay3").style.width = "100%";
}

/*
Opens the score overlay to display scores.
*/
function openScoreOverlay()
{
    resetOverlays();
    document.getElementById("scoreoverlay").style.width = "100%";
}

/*
Switches the data for each of the teams so that they are on different sides of the screen.
Typically users will want the team to be on the same side as they are seen on the screen.
*/
function switchSides()
{
    var temp = teamA;
    teamA = teamB;
    teamB = temp;
    document.getElementById('ateamlabel').innerHTML = teamA;
    document.getElementById('bteamlabel').innerHTML = teamB;
    
    temp = aWins;
    aWins = bWins;
    bWins = temp;
    
    temp = document.getElementById('alineup1').value;
    document.getElementById('alineup1').value = document.getElementById('blineup1').value;
    document.getElementById('blineup1').value = temp;
    
    temp = document.getElementById('alineup2').value;
    document.getElementById('alineup2').value = document.getElementById('blineup2').value;
    document.getElementById('blineup2').value = temp;
    
    temp = document.getElementById('alineup3').value;
    document.getElementById('alineup3').value = document.getElementById('blineup3').value;
    document.getElementById('blineup3').value = temp;
    
    temp = document.getElementById('alineup4').value;
    document.getElementById('alineup4').value = document.getElementById('blineup4').value;
    document.getElementById('blineup4').value = temp;
    
    temp = document.getElementById('alineup5').value;
    document.getElementById('alineup5').value = document.getElementById('blineup5').value;
    document.getElementById('blineup5').value = temp;
    
    temp = document.getElementById('alineup6').value;
    document.getElementById('alineup6').value = document.getElementById('blineup6').value;
    document.getElementById('blineup6').value = temp;
    
    temp = document.getElementById('alineupL').value;
    document.getElementById('alineupL').value = document.getElementById('blineupL').value;
    document.getElementById('blineupL').value = temp;
}

/*
  Performs a forward volleyball rotation by shifting player positions forward by 1 spot
*/
function rotate(team)
{
    if(team == 'a')
    {
        var temp = [];
        temp[0] = document.getElementById('alineup1').value;
        temp[1] = document.getElementById('alineup2').value;
        temp[2] = document.getElementById('alineup3').value;
        temp[3] = document.getElementById('alineup4').value;
        temp[4] = document.getElementById('alineup5').value;
        temp[5] = document.getElementById('alineup6').value;

        document.getElementById('alineup1').value = temp[1];
        document.getElementById('alineup2').value = temp[2];
        document.getElementById('alineup3').value = temp[3];
        document.getElementById('alineup4').value = temp[4];
        document.getElementById('alineup5').value = temp[5];
        document.getElementById('alineup6').value = temp[0];
    }
    else
    {
        var temp = [];
        temp[0] = document.getElementById('blineup1').value;
        temp[1] = document.getElementById('blineup2').value;
        temp[2] = document.getElementById('blineup3').value;
        temp[3] = document.getElementById('blineup4').value;
        temp[4] = document.getElementById('blineup5').value;
        temp[5] = document.getElementById('blineup6').value;

        document.getElementById('blineup1').value = temp[1];
        document.getElementById('blineup2').value = temp[2];
        document.getElementById('blineup3').value = temp[3];
        document.getElementById('blineup4').value = temp[4];
        document.getElementById('blineup5').value = temp[5];
        document.getElementById('blineup6').value = temp[0];
    }
}

/*
  Performs a back volleyball rotation by moving all players back 1 spot
*/
function backRotate(team)
{
    if(team == 'a')
    {
        var temp = [];
        temp[0] = document.getElementById('alineup1').value;
        temp[1] = document.getElementById('alineup2').value;
        temp[2] = document.getElementById('alineup3').value;
        temp[3] = document.getElementById('alineup4').value;
        temp[4] = document.getElementById('alineup5').value;
        temp[5] = document.getElementById('alineup6').value;

        document.getElementById('alineup1').value = temp[5];
        document.getElementById('alineup2').value = temp[0];
        document.getElementById('alineup3').value = temp[1];
        document.getElementById('alineup4').value = temp[2];
        document.getElementById('alineup5').value = temp[3];
        document.getElementById('alineup6').value = temp[4];
    }
    else
    {
        var temp = [];
        temp[0] = document.getElementById('blineup1').value;
        temp[1] = document.getElementById('blineup2').value;
        temp[2] = document.getElementById('blineup3').value;
        temp[3] = document.getElementById('blineup4').value;
        temp[4] = document.getElementById('blineup5').value;
        temp[5] = document.getElementById('blineup6').value;

        document.getElementById('blineup1').value = temp[5];
        document.getElementById('blineup2').value = temp[0];
        document.getElementById('blineup3').value = temp[1];
        document.getElementById('blineup4').value = temp[2];
        document.getElementById('blineup5').value = temp[3];
        document.getElementById('blineup6').value = temp[4];
    }
}

/*
Called when all information is entered and the next set is ready to start.
*/
function start()
{
    saved = '{';
    lineupA[0] = document.getElementById('alineup1').value;
    lineupA[1] = document.getElementById('alineup2').value;
    lineupA[2] = document.getElementById('alineup3').value;
    lineupA[3] = document.getElementById('alineup4').value;
    lineupA[4] = document.getElementById('alineup5').value;
    lineupA[5] = document.getElementById('alineup6').value;
    if(document.getElementById('alineupL').value == '')
        lineupA[6] = '-1';
    else
        lineupA[6] = document.getElementById('alineupL').value;
    
    lineupB[0] = document.getElementById('blineup1').value;
    lineupB[1] = document.getElementById('blineup2').value;
    lineupB[2] = document.getElementById('blineup3').value;
    lineupB[3] = document.getElementById('blineup4').value;
    lineupB[4] = document.getElementById('blineup5').value;
    lineupB[5] = document.getElementById('blineup6').value;
    if(document.getElementById('blineupL').value == '')
        lineupB[6] = ' -1';
    else
        lineupB[6] = document.getElementById('blineupL').value;
 
    for(i = 0; i < 6; i++)
    {
        if(lineupA[i] == '')
        {
            Android.toast('Need to fill in lineup at position: ' + (i + 1));
            return;
        }
        if(lineupB[i] == '')
        {
            Android.toast('Need to fill in lineup at position: ' + (i + 1));
            return;
        }
    }
    
    for(i = 0; i < 6; i++)
        for(j = i + 1; j < 7; j++)
        {
            if(lineupA[i] == lineupA[j])
            {
                Android.toast('Cannot have repeating number: ' + aLineup[i]);
                return;
            }
            if(lineupB[i] == lineupB[j])
            {
                Android.toast('Cannot have repeating number: ' + bLineup[i]);
                return;
            }
        }
    
    var tServe;
    if(document.getElementById('serve1').checked)
        tServe = 'true';
    else
        tServe = 'false';
    
    saved += '"teamA":"' + teamA + '", ';
    saved += '"teamB":"' + teamB + '", ';
    saved += '"aWins":' + aWins + ', "bWins":' + bWins + ', ';
    saved += '"sets":' + sets + ', ';
    saved += '"playTo":' + playTo + ', ';
    saved += '"cap":' + cap + ', ';
    saved += '"aServe":' + tServe + ', ';
	saved += '"scores":"' + scores + '", ';
    
    saved += '"aLineup":[';
    saved += lineupA[0] + ", ";
    saved += lineupA[1] + ", ";
    saved += lineupA[2] + ", ";
    saved += lineupA[3] + ", ";
    saved += lineupA[4] + ", ";
    saved += lineupA[5] + ", ";
    saved += lineupA[6] + '], "bLineup":[';
    
    saved += lineupB[0] + ", ";
    saved += lineupB[1] + ", ";
    saved += lineupB[2] + ", ";
    saved += lineupB[3] + ", ";
    saved += lineupB[4] + ", ";
    saved += lineupB[5] + ", ";
    saved += lineupB[6] + ']';
	
	saved += ', "module":"../Javascript/modules/CIF_module3.3.js"';
    saved += '}';

    resetOverlays();
	if(os == 'Android')
      Android.finishForm(saved);
    else if(os == 'Web')
	{
		var localpath = '../HTML/VolleyballBook5.4.html';
		sessionStorage.setItem('json', saved);
        var win = window.open(localpath, "_self");
	}
    
}

