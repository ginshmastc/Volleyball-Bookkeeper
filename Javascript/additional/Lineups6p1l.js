/*
This file gives functions to the CIF setup page.
*/

var lineupForm = "";

function init()
{
    document.getElementById('ateamlabel').innerHTML = Android.getData(0);
    document.getElementById('bteamlabel').innerHTML = Android.getData(1);


}

function start()
{
    var saved = [];

    saved[0] = document.getElementById('alineup1').value + "";
    saved[1] = document.getElementById('alineup2').value + "";
    saved[2] = document.getElementById('alineup3').value + "";
    saved[3] = document.getElementById('alineup4').value + "";
    saved[4] = document.getElementById('alineup5').value + "";
    saved[5] = document.getElementById('alineup6').value + "";
    saved[6] = document.getElementById('alineupL').value + "";

    saved[7] = document.getElementById('blineup1').value + "";
    saved[8] = document.getElementById('blineup2').value + "";
    saved[9] = document.getElementById('blineup3').value + "";
    saved[10] = document.getElementById('blineup4').value + "";
    saved[11] = document.getElementById('blineup5').value + "";
    saved[12] = document.getElementById('blineup6').value + "";
    saved[13] = document.getElementById('blineupL').value + "";

    saved[14] = document.getElementByName('serve').value;
    
    if(Android != null)
    {
        Android.addData(saved);
        Android.finishForm();

    }
}

