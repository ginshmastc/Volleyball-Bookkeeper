/*
This module contains functions and logic for the CIF volleybal book style.
*/
//CSS file should be loaded here also if possible
function getModule(module) {
	//define functions and set common functions names to their declarations contained here
    
    var onStart = function ()
        {
            a_points = 0;
            a_teamName = "TeamA";
            a_liberoServeRotation = -1;//libero has not served yet
            a_setsWon = 0;
            a_rotationPosition = 0;
            a_subs = 0;
            a_timeouts = 0;

            b_points = 0;
            b_teamName = "TeamA";
            b_liberoServeRotation = -1;//libero has not served yet
            b_setsWon = 0;
            b_rotationPosition = 0;
            b_subs = 0;
            b_timeouts = 0;

            drawText(.15, .15, a_teamName);
        };
    var onPoint = function (team)
        {
            if(team == 'a')
            {
                a_points++;
            }
        }
    var onSubstitution = function (team, position, number)
        {
            
        };
    var onTimeout = function (team)
        {
            
        };
    var onPenalty = function ()
        {
            
        };
    var onSetFinished = function ()
        {
            
        };

    return {onStart, onPoint, onSubstitution, onTimeout, onPenalty, onSetFinished};
}
