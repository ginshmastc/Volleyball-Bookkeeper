
/*
This file is an implementation of a two way linked list used to record game input.
*/

var inputHead;
var inputTail;
var inputCurrent;
var inputLength;
var lock;//prevents addition and removal of elements from linked list while true
/*
Initializes the stack
*/
function initInput()
{
    inputHead = null;
    inputTail = null;
    inputCurrent = null;
    inputLength = 0;
    lock = false;
}

function setLock(locked)
{
    lock = locked;
}

function Node(data)
{
    this.data = data;
    this.next = null;
    this.prev = null;
}

/*
Adds an input to the linked list
data: data being added
*/
function addInput(node)
{
    if(lock)
        return;
    node.next = null;
    if(inputHead == null)
    {
        inputHead = node;
        inputTail = node;
        inputLength = 1;
        return;
    }
    inputTail.next = node;
    node.prev = inputTail;
    inputTail = node;
    inputLength++;
}

function initIterator()
{
    inputCurrent = inputHead;
}

/*
Returns the next input in the linked list
*/
function nextInput()
{
    var res = inputCurrent;
    if(res == null)
        return null;
    inputCurrent = inputCurrent.next;
    return res;
}

/*
Removes the last input in the linked list
*/
function removeInput()
{
    if(inputLength == 0)
        return null;
    var res = inputTail;
    if(inputLength == 1)
    {
        inputHead = null;
        inputTail = null;
        return res;
    }
    else
        inputTail = inputTail.prev;
    inputTail.next = null;
    res.prev = null;
    inputLength--;
    return res;
}

/*
Returns the length of the linked list
*/
function lengthInput()
{
    return inputLength;
}

/*
Deconstructs the linked list and appends it to the starting data JSON.
*/
function gameString(startdata)
{
    initIterator();
    var content = startdata.slice(0, -1) + ', "input":[';
    
    var curElement = nextInput();
    while(curElement != null)
    {
        content += '"' + curElement.data + '", ';
        curElement = nextInput();
    }
    content = content.slice(0, -1) + ']}';
    return content;
}

/*
Appends a linked list of input from a string of game data.
*/
function loadGameData(gamedata)
{
    if(gamedata.charAt(0) == '[')//remove the [surrounding []
        gamedata = gamedata.slice(1, -1);
    
    var inputlist = gamedata.split(',');
    var len = inputlist.length;
    for(i = 0; i < len; i++)
        addInput(new Node(inputlist[i]));
}

function packageDataForAndroid()
{
    Android.getPackage(gameString());
}

