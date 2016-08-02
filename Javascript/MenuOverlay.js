/*
This file contains the functions for the menu overlay that operates the book.
*/

function openMenu() {
    document.getElementById("overlay").style.width = "100%";
}

function closeMenu() {
    document.getElementById("overlay").style.width = "0%";
    closeSubMenu();
}

function openSubMenu() {
    document.getElementById("subOverlay").style.width = "100%";
}

function closeSubMenu() {
    document.getElementById("subOverlay").style.width = "0%";
}

