/*
This file contains the functions for the menu overlay that operates the book.
*/
var curTeam;

function openMenu() {
    document.getElementById("overlay").style.width = "100%";
}

function closeMenu() {
    document.getElementById("overlay").style.width = "0%";
    closeSubMenu();
}

function openSubMenu(team) {
    curTeam = team;
    if(team == 'a')
    {
        document.getElementById("sub1").innerHTML = "I: " + a_lineup[0];
        document.getElementById("sub2").innerHTML = "II: "+a_lineup[1];
        document.getElementById("sub3").innerHTML = "III: "+a_lineup[2];
        document.getElementById("sub4").innerHTML = "IV: "+a_lineup[3];
        document.getElementById("sub5").innerHTML = "V: "+a_lineup[4];
        document.getElementById("sub6").innerHTML = "VI: "+a_lineup[5];
    }
    else if(team == 'b')
    {
        document.getElementById("sub1").innerHTML = "I: "+b_lineup[0];
        document.getElementById("sub2").innerHTML = "II: "+b_lineup[1];
        document.getElementById("sub3").innerHTML = "III: "+b_lineup[2];
        document.getElementById("sub4").innerHTML = "IV: "+b_lineup[3];
        document.getElementById("sub5").innerHTML = "V: "+b_lineup[4];
        document.getElementById("sub6").innerHTML = "VI: "+b_lineup[5];
    }

    document.getElementById("subin1").value = "";
    document.getElementById("subin2").value = "";
    document.getElementById("subin3").value = "";
    document.getElementById("subin4").value = "";
    document.getElementById("subin5").value = "";
    document.getElementById("subin6").value = "";

    document.getElementById("subOverlay").style.width = "100%";
}

function closeSubMenu() {
    document.getElementById("subOverlay").style.width = "0%";
}

function subPressed() {
    var subs = ["0", "0", "0", "0", "0", "0"];
    subs[0] = document.getElementById("subin1").value;
    subs[1] = document.getElementById("subin2").value;
    subs[2] = document.getElementById("subin3").value;
    subs[3] = document.getElementById("subin4").value;
    subs[4] = document.getElementById("subin5").value;
    subs[5] = document.getElementById("subin6").value;

    onSubstitution(subs, curTeam);
    closeSubMenu();
}

function openPenMenu(team) {
    curTeam = team;
        document.getElementById("penOverlay").style.width = "100%";

}

function closePenMenu() {
        document.getElementById("penOverlay").style.width = "0%";

}

function penaltyPressed()
{
    var com = document.getElementById('comments').value;
    var aw = document.getElementById('award').checked;
    onPenalty(curTeam, com, aw);
}
