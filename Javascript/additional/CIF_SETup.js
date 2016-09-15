/*
This file gives functions to the CIF setup page.
*/

var lineupForm = "https://cdn.rawgit.com/ginshmastc/Volleyball-Bookkeeper/master/HTML/Lineups6p1l.html";


function lineups()
{
alert("test.");
Android.showToast("Android test");
    if(Android != null)
    {
        alert("Android found.");
        Android.loadNextForm(lineupForm);
    }
    else
    {
        alert("Android NOT found.");
    }

}

