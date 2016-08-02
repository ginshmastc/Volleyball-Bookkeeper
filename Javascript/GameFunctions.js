
/*
This file is an abstract of the game's logic which includes functions for game
events that should be implemented in a specific module's design since the logic
changes for different modifications of the game.  This file includes common
variables that will be used in any normal modification of the game.

*/

var a_teamName;
var a_lineup;
var a_liberoServeRotation;
var a_points;
var a_setsWon;
var a_rotationPosition;
var a_subs;
var a_timeouts;

var b_teamName;
var b_lineup;
var b_liberoServeRotation;
var b_points;
var b_setsWon;
var b_rotationPosition;
var b_subs;
var b_timeouts;

/*
Each team's starting points...usually 0.
Note: Some users prefer to start at a score other than 0 rather than lower
the playTo or scoreCap.
*/
var startingPoints;
var playTo; //score to reach to end the game (have to win by 2 points)
var scoreCap; //The game is won when a team reaches this score
var subCap; //max number of subs per team per set (depends on format)
var timeoutCap; //max number of timeouts per team (usually 2)
var aServe; //boolean if team a is serving
var input; //array containing all input

var module;
var onPoint;
var onSubstitution;
var onTimeout;
var onPenalty;
var onSetFinished;

/*
Called when the set is started.
*/
function onStart(startingData)
{
    module = getModule();
    module.onStart(startingData);
}

/*
Called when a point button is pushed.
team: l (left) or r (right) depending on which point button was pushed.
*/
function onPoint(team)
{
    var lib = document.getElementById("");
    module.onPoint(team);
    closeMenu();
}

function onSubstitution(team)
{
    module.onSubstitution();
    closeMenu();
}

function onTimeout(team)
{
    module.onTimeout(team);
    closeMenu();
}

function onPenalty(team)
{
    module.onPenalty(team);
    closeMenu();
}

function onSetFinished(team)
{
    module.onSetFinished(team);
    closeMenu();
}


