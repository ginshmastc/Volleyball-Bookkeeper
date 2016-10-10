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
    resetOverlays();
    document.getElementById('overlay2').style.width = "100%";
    document.getElementById('ateamlabel').innerHTML = document.getElementById('teamA').value;
    document.getElementById('bteamlabel').innerHTML = document.getElementById('teamB').value;
}

function lineups()
{
    if(Android != null)
    {
        Android.loadNextForm(lineupForm);
    }

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
    
    saved += '"teamA":"' + document.getElementById('teamA').value + '", ';
    saved += '"teamB":"' + document.getElementById('teamB').value + '", ';
    saved += '"sets":' + document.getElementById('sets').value + ', ';
    saved += '"playTo":' + document.getElementById('playTo') + ', ';
    saved += '"cap":' + document.getElementById('cap') + ', ';
    saved += '"timeoutCap":2, ';
    saved += 
    
    saved += document.getElementById('alineup1').value + ", ";
    saved += document.getElementById('alineup2').value + ", ";
    saved += document.getElementById('alineup3').value + ", ";
    saved += document.getElementById('alineup4').value + ", ";
    saved += document.getElementById('alineup5').value + ", ";
    saved += document.getElementById('alineup6').value + ", ";
    saved += document.getElementById('alineupL').value + '], "bLineup":[';

    saved += document.getElementById('blineup1').value + ", ";
    saved += document.getElementById('blineup2').value + ", ";
    saved += document.getElementById('blineup3').value + ", ";
    saved += document.getElementById('blineup4').value + ", ";
    saved += document.getElementById('blineup5').value + ", ";
    saved += document.getElementById('blineup6').value + ", ";
    saved += document.getElementById('blineupL').value + '], ';

    saved += '"aServe": ' + document.getElementByName('serve').value;
    saved += '}';
    
    if(Android != null)
    {
        Android.finishForm(saved);

    }
}

