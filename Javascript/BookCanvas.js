/*
This file gives functions to aid in drawing texts and symbols on the canvas in
the correct locations on the scaled bookkeeping image.
*/

var scale;
var canvas;
var context;
var width;
var height;
var canvasReady;
var fontFamily;
var fontSize;

/*
Prepares the canvas to be drawn on by storing the canvas object, context, width,
and height as well as sets canvasReady to true.
*/
function init()
{
    scale = 3;
    canvas = document.getElementById("myCanvas");
    fontFamily = "Arial";

    width = canvas.width;
    height = canvas.height;
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    context = canvas.getContext("2d");
    fontSize = 12;
    context.font = "12px Arial";
    context.fillStyle = "black";
    canvasReady = true;
canvas.addEventListener('mousedown', function(event) {
    openMenu();
        }, false);

}

/*
Draws text based on percentages from the left and top of the screen.
xPercent: horizontal percentage from the left.
yPercent: vertical percentage from the top.
text: text being drawn.
*/
function drawText(xPercent, yPercent, text, circled)
{
    if(canvasReady != true)
        return;
    var xLocation = xPercent * width * scale;
    var yLocation = yPercent * height * scale;
    context.fillText(text, xLocation, yLocation);
    
}

/*
Draws text based on percentages from the left and top of the screen with a circle around the text.
xPercent: horizontal percentage from the left.
yPercent: vertical percentage from the top.
text: text being drawn.
*/
function circleText(xPercent, yPercent, text)
{
    if(canvasReady != true)
        return;
    var xLocation = xPercent * width * scale;
    var yLocation = yPercent * height * scale;
    context.fillText(text, xLocation, yLocation);

    var fontWidth = context.measureText(text).width * 2;
    var fontHeight = context.measureText("M").width * 2;
    drawEllipse(xLocation - (fontWidth / 4), yLocation - (fontHeight / 1.5), fontWidth, fontHeight);
}

/*
Draws text based on percentages from the left and top of the screen with a triangle around the text.
xPercent: horizontal percentage from the left.
yPercent: vertical percentage from the top.
text: text being drawn.
*/
function triangleText(xPercent, yPercent, text)
{
    if(canvasReady != true)
        return;
    var xLocation = xPercent * width * scale;
    var yLocation = yPercent * height * scale;
    context.fillText(text, xLocation, yLocation);

    var fontWidth = context.measureText(text).width * 2;
    var fontHeight = context.measureText("M").width * 2;
    drawTriangle(xLocation - (fontWidth / 4), yLocation - (fontHeight / 1.25), fontWidth, fontHeight);
}

/*
Increases the density scale by 1.
*/
function sharpen()
{
    scale++;
    setFontSize(scale * fontSize);
}

/*
Decreases the density scale by 1.
*/
function blur()
{
    scale--;
    setFontSize(scale * fontSize);
}

/*
Sets the size of the context's font.
size: the new font size (should be a number).
*/
function setFontSize(size)
{
    fontSize = size;
    context.font = size + "px " + fontFamily;
}

/*
Sets the color of the context's font.
color: the new color.
*/
function setFontColor(color)
{
    context.fillStyle = color;
}

/*
Draws an ellipse based on a rectangular boundary.
x: left of bounds.
y: top of bounds.
width: width of the bounding rectangle.
height: height of the bounding rectangle.
*/
function drawEllipse(x, y, width, height) {
	
    context.beginPath();
  
    context.moveTo(x + (width / 2), y);
  
    context.bezierCurveTo(
    x + width, y, x + width, y + height, x + (width / 2), y + height);

    context.bezierCurveTo(
    x, y + height, x, y, x + (width/2), y);
 
    context.stroke();
    context.closePath();	
}

function drawTriangle(x, y, width, height) {
	
    context.beginPath();
  
    context.moveTo(x + (width/2), y);
  
    context.lineTo(x, y + height);
    context.lineTo(x + width, y + height);
    context.lineTo(x + (width/2), y);
 
    context.stroke();
    context.closePath();	
}