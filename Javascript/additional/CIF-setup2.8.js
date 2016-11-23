/*
This file gives functions to the CIF setup page.
*/

var saved;
var teamA;
var teamB;
var lineupA;
var lineupB;


function init()
{
    saved = "";
    teamA = "";
    teamB = "";
    openOverlay1();
}

function resetOverlays()
{
    document.getElementById("overlay1").style.width = "0%";
    document.getElementById("overlay2").style.width = "0%";
}

function openOverlay1()
{
    resetOverlays();
    document.getElementById("overlay1").style.width = "100%";
}

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
    
    resetOverlays();
    document.getElementById('overlay2').style.width = "100%";
    teamA = document.getElementById('teamA').value;
    teamB = document.getElementById('teamB').value;
    document.getElementById('ateamlabel').innerHTML = teamA;
    document.getElementById('bteamlabel').innerHTML = teamB;
}

function openOverlay2(a_team, b_team, a_lineup, b_lineup)
{   
    resetOverlays();
    document.getElementById('overlay2').style.width = "100%";
    teamA = a_team;
    teamB = b_team;
    document.getElementById('ateamlabel').innerHTML = teamA;
    document.getElementById('bteamlabel').innerHTML = teamB;
    lineupA = a_lineup;
    lineupB = b_lineup;
    
    document.getElementById('alineup1').value = a_lineup[0];
    document.getElementById('alineup2').value = a_lineup[1];
    document.getElementById('alineup3').value = a_lineup[2];
    document.getElementById('alineup4').value = a_lineup[3];
    document.getElementById('alineup5').value = a_lineup[4];
    document.getElementById('alineup6').value = a_lineup[5];
    document.getElementById('alineupL').value = a_lineup[6];
    
    document.getElementById('blineup1').value = b_lineup[0];
    document.getElementById('blineup2').value = b_lineup[1];
    document.getElementById('blineup3').value = b_lineup[2];
    document.getElementById('blineup4').value = b_lineup[3];
    document.getElementById('blineup5').value = b_lineup[4];
    document.getElementById('blineup6').value = b_lineup[5];
    document.getElementById('blineupL').value = b_lineup[6];
}

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

function start()
{
    var saved = '{';
    
    lineupA[0] = document.getElementById('alineup1').value;
    lineupA[1] = document.getElementById('alineup2').value;
    lineupA[2] = document.getElementById('alineup3').value;
    lineupA[3] = document.getElementById('alineup4').value;
    lineupA[4] = document.getElementById('alineup5').value;
    lineupA[5] = document.getElementById('alineup6').value;
    lineupA[6] = document.getElementById('alineupL').value;
    
    lineupB[0] = document.getElementById('blineup1').value;
    lineupB[1] = document.getElementById('blineup2').value;
    lineupB[2] = document.getElementById('blineup3').value;
    lineupB[3] = document.getElementById('blineup4').value;
    lineupB[4] = document.getElementById('blineup5').value;
    lineupB[5] = document.getElementById('blineup6').value;
    lineupB[6] = document.getElementById('blineupL').value;
    
    for(i = 0; i < 6; i++)
    {
        if(aLineup[i] == '')
        {
            Android.toast('Need to fill in lineup at position: ' + (i + 1));
            return;
        }
        if(bLineup[i] == '')
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
    var tCap;
    var tAL;
    var tBL;
    var tServe;
    
    if(lineupA[6] == '')
        tAL = '-1';
    else
        tAL = lineupA[6];
    
    if(lineupB[6] == '')
        tBL = '-1';
    else
        tBL = lineupB[6];
    
    if(document.getElementById('cap').value == '')
        tCap = '-1';
    else
        tCap = document.getElementById('cap').value;
    
    if(document.getElementById('serve').value == 'a')
        tServe = 'true';
    else
        tServe = 'false';
    
    saved += '"teamA":"' + teamA + '", ';
    saved += '"teamB":"' + teamB + '", ';
    saved += '"aWins":0, "bWins":0, ';
    saved += '"sets":' + document.getElementById('sets').value + ', ';
    saved += '"playTo":' + document.getElementById('playTo').value + ', ';
    saved += '"cap":' + tCap + ', ';
    saved += '"timeoutCap":2, ';
    saved += '"aServe":' + tServe + ', ';
    
    saved += '"aLineup":[';
    saved += lineupA[0] + ", ";
    saved += lineupA[1] + ", ";
    saved += lineupA[2] + ", ";
    saved += lineupA[3] + ", ";
    saved += lineupA[4] + ", ";
    saved += lineupA[5] + ", ";
    saved += tAL + '], "bLineup":[';
    
    saved += lineupB[0] + ", ";
    saved += lineupB[1] + ", ";
    saved += lineupB[2] + ", ";
    saved += lineupB[3] + ", ";
    saved += lineupB[4] + ", ";
    saved += lineupB[5] + ", ";
    saved += tBL + ']';
    saved += '}';

    Android.finishForm(saved);
    
}

