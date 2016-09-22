/*
This file gives functions to the CIF setup page.
*/

var lineupForm = "https://cdn.rawgit.com/ginshmastc/Volleyball-Bookkeeper/master/HTML/Lineups6p1l.html";


function lineups()
{
    var saved = [];
    saved[0] = document.getElementById('teamA').value + "";
    saved[1] = document.getElementById('teamB').value + "";
    saved[2] = document.getElementById('sets').value + "";
    saved[3] = document.getElementById('playTo').value + "";
    saved[4] = document.getElementById('cap').value + "";

    if(Android != null)
    {
        Android.loadNextForm(saved, lineupForm);
    }
}

