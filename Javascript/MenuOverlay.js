/*
This file contains the functions for the menu overlay that operates the book.
*/


/*
Prepares the canvas to be drawn on by storing the canvas object, context, width,
and height as well as sets canvasReady to true.
*/
function init()
{
    
}

function openMenu() {
    document.getElementById("overlay").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeMenu() {
    document.getElementById("overlay").style.width = "0%";
}