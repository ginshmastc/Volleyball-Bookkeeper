/*
This file contains the functions for the menu overlay that operates the book.
*/

function openMenu() {
    document.getElementById("overlay").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeMenu() {
    document.getElementById("overlay").style.width = "0%";
}
