/*
This file gives functions to the CIF setup page.
*/

var lineupForm = "https://cdn.rawgit.com/ginshmastc/Volleyball-Bookkeeper/master/HTML/Lineups6p1l.html";

function onStart()
{
    Android.test("onstart");
}

function lineups()
{
    var saved = '{';
    saved += '"teamA":' + document.getElementById('teamA').value;
    saved += ', "teamB":' + document.getElementById('teamB').value;
    saved += ', "sets":' + document.getElementById('sets').value;
    saved += ', "playTo":' + document.getElementById('playTo').value;
    
    if(document.getElementById('cap') == '')
        saved += ', "pointCap":-1';
    else
        saved += ', "pointCap":' + document.getElementById('cap').value;

    if(Android != null)
    {
        Android.addStartingData(saved);
        Android.loadForm(lineupForm);
        //window.location.href = lineupForm;
    }
}

