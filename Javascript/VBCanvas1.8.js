/*
This file gives functions to aid in drawing texts and symbols on the canvas in
the correct locations on the scaled bookkeeping image.
*/
var os;
var scale;
var canvas;
var context;
var width;
var height;
var canvasReady;
var fontFamily;
var fontSize;
var startingData;
var startingJSON;

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
	startingJSON = sessionStorage.getItem('json');

    if(startingJSON)
	  setStartingData(startingJSON);
}

/*
Inputs the starting match data.
*/
function setStartingData(data, url)
{
	os = getMobileOperatingSystem();
	if(os == 'Android') {
	Android.test("Parsing JSON... " + data);
    startingJSON = data;
    startingData = JSON.parse(data);
	
	Android.test("Attempting to load input...");
    if(startingData.input)
	loadGameData(startingData.input);
    Android.test("Input finished.");

    var script = document.createElement('script');
    script.onload = function() {
      onStart();
    };
    if(!url || url === "nourl")
        script.src = startingData.module;
    else
        script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
	Android.test("module loaded.");
	} else {
        startingData = JSON.parse(data);
        if(startingData.input)
	      loadGameData(startingData.input);
        
    var script = document.createElement('script');
    script.onload = function() {
      onStart();
    };
    if(!url || url === "nourl")
        script.src = startingData.module;
    else
        script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
	}
}

/*
Draws text based on percentages from the left and top of the screen.
xPercent: horizontal percentage from the left.
yPercent: vertical percentage from the top.
text: text being drawn.
*/
function drawText(xPercent, yPercent, text)
{
    if(!canvasReady)
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
    if(!canvasReady)
        return;
    drawText(xPercent, yPercent, text);
    var xLocation = xPercent * width * scale;
    var yLocation = yPercent * height * scale;

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
    if(!canvasReady)
        return;
    var xLocation = xPercent * width * scale;
    var yLocation = yPercent * height * scale;
    context.fillText(text, xLocation, yLocation);

    var fontWidth = context.measureText(text).width * 2;
    var fontHeight = context.measureText("M").width * 2;
    drawTriangle(xLocation - (fontWidth / 4), yLocation - (fontHeight / 1.25), fontWidth, fontHeight);
}

/*
Helper function to measure the space needed for a string to be displayed and move the cursor accordingly.
text: the string being measured.
return: The width of the string.
*/
function measureText(text)
{
    if(!canvasReady)
        return -1;
    return context.measureText(text).width;
}

/*
Erases the content in a rectangular area.
xPercent: The percentage from the left of page of the starting x location in the left side of the box.
yPercent: The percentage from the top of page of the starting y location in the top side of the box.
xPercent2: The percentage from the left of page for the right side of the box.
yPercent2: The percentage from the top of page for the top bottom side of the box.
*/
function clearRect(xPercent, yPercent, xPercent2, yPercent2)
{
    if(!canvasReady)
        return;
    var dx = xPercent2 - xPercent;
    var dy = yPercent2 - yPercent;
    context.clearRect(xPercent * width * scale, yPercent * height * scale, dx * scale * width, dy * height * scale);
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
