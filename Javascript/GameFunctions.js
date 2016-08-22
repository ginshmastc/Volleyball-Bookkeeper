
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
var comments;//additional comments

var module;

/*
Called when the set is started.
*/
function onStart()
{
    module = getModule();
    module.onStart();
}

/*
Called when a point button is pushed.
team: l (left) or r (right) depending on which point button was pushed.
*/
function onPoint(team, lib)
{
    module.onPoint(team, lib);
    closeMenu();
}

/*
Called when the substitution button is pressed.
subs: list of input values from substitution list.
team: which team made the substitution.
*/
function onSubstitution(subs, team)
{
    module.onSubstitution(subs, team);
    closeMenu();
}

/*
Called when a timeout button is pressed.
team: which side timeout button is pressed.
*/
function onTimeout(team)
{
    module.onTimeout(team);
    closeMenu();
}

/*
Called when a penalty button is pressed.
team: which side penalty button is pressed.
additionalComments: string for user comments.
award: true if a point should be awarded to the opposing team.
*/
function onPenalty(team, additionalComments, award)
{
    module.onPenalty(team, additionalComments, award);
    closeMenu();
}

/*
Called when the set is finished.
*/
function onSetFinished(team)
{
    module.onSetFinished(team);
    closeMenu();
}

