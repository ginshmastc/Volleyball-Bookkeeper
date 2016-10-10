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
    var saved = [];
    saved[0] = document.getElementById('teamA').value + "";
    saved[1] = document.getElementById('teamB').value + "";
    saved[2] = document.getElementById('sets').value + "";
    saved[3] = document.getElementById('playTo').value + "";
    saved[4] = document.getElementById('cap').value + "";
    
    if(saved[0] == '')
        saved[0] = 'Team A';
    if(saved[1] == '')
        saved[1] = 'Team B';
    if(saved[4] == '')
        saved[4] = '-1';

    if(Android != null)
    {
        Android.addStartingData(saved);
        Android.loadForm(lineupForm);
        //window.location.href = lineupForm;
    }
}

