/*
This file gives functions to the CIF setup page.
*/

var saved;
function init()
{
    saved = "";
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
    document.getElementById('ateamlabel').innerHTML = document.getElementById('teamA').value;
    document.getElementById('bteamlabel').innerHTML = document.getElementById('teamB').value;
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
    
    var aLineup = [];
    var bLineup = [];
    
    aLineup[0] = document.getElementById('alineup1').value;
    aLineup[1] = document.getElementById('alineup2').value;
    aLineup[2] = document.getElementById('alineup3').value;
    aLineup[3] = document.getElementById('alineup4').value;
    aLineup[4] = document.getElementById('alineup5').value;
    aLineup[5] = document.getElementById('alineup6').value;
    aLineup[6] = document.getElementById('alineupL').value;
    
    bLineup[0] = document.getElementById('blineup1').value;
    bLineup[1] = document.getElementById('blineup2').value;
    bLineup[2] = document.getElementById('blineup3').value;
    bLineup[3] = document.getElementById('blineup4').value;
    bLineup[4] = document.getElementById('blineup5').value;
    bLineup[5] = document.getElementById('blineup6').value;
    bLineup[6] = document.getElementById('blineupL').value;
    
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
            if(aLineup[i] == aLineup[j])
            {
                Android.toast('Cannot have repeating number: ' + aLineup[i]);
                return;
            }
            if(bLineup[i] == bLineup[j])
            {
                Android.toast('Cannot have repeating number: ' + bLineup[i]);
                return;
            }
        }
    var tCap;
    var tAL;
    var tBL;
    var tServe;
    
    if(aLineup[6] == '')
        tAL = '-';
    else
        tAL = aLineup[6];
    
    if(bLineup[6] == '')
        tBL = '-';
    else
        tBL = bLineup[6];
    
    if(document.getElementById('cap').value == '')
        tCap = '-1';
    else
        tCap = document.getElementById('cap').value;
    
    if(document.getElementById('serve').value == 'a')
        tServe = 'true';
    else
        tServe = 'false';
    
    saved += '"teamA":"' + document.getElementById('teamA').value + '", ';
    saved += '"teamB":"' + document.getElementById('teamB').value + '", ';
    saved += '"sets":' + document.getElementById('sets').value + ', ';
    saved += '"playTo":' + document.getElementById('playTo').value + ', ';
    saved += '"cap":' + tCap + ', ';
    saved += '"timeoutCap":2, ';
    saved += '"aServe":' + tServe + ', ';
    
    saved += '"aLineup":[';
    saved += aLineup[0] + ", ";
    saved += aLineup[1] + ", ";
    saved += aLineup[2] + ", ";
    saved += aLineup[3] + ", ";
    saved += aLineup[4] + ", ";
    saved += aLineup[5] + ", ";
    saved += tAL + '], "bLineup":[';
    
    saved += bLineup[0] + ", ";
    saved += bLineup[1] + ", ";
    saved += bLineup[2] + ", ";
    saved += bLineup[3] + ", ";
    saved += bLineup[4] + ", ";
    saved += bLineup[5] + ", ";
    saved += tBL + ']';
    saved += '}';

    Android.finishForm(saved);
    
}

