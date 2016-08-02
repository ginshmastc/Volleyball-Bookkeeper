/*
This module contains functions and logic for the CIF volleyball book style.
*/


function getModule() {
	//define functions and set common functions names to their declarations contained here

    var a_marker;
    var a_column;
    var b_marker;
    var b_column;
    var A_MARKER_START = .15;
    var A_MARKER_END = .48;
    var B_MARKER_START = .7;
    var B_MARKER_END = .98;
    var col;

    var onStart = function (startingData)
        {

            var bgimage = "url('Images/CIF_image.png')";
            document.getElementById("myBook").style.backgroundImage = bgimage;

            a_points = 0;
            a_teamName = startingData.teamA;
            a_liberoServeRotation = -1;//libero has not served yet
            a_setsWon = 0;
            a_rotationPosition = 1;
            a_subs = 0;
            a_timeouts = 0;

//arrays of markers and columns
            a_markers = [A_MARKER_START, A_MARKER_START, A_MARKER_START, A_MARKER_START, A_MARKER_START, A_MARKER_START];
            a_columns = [0, 0, 0, 0, 0, 0];
            b_markers = [B_MARKER_START, B_MARKER_START, B_MARKER_START, B_MARKER_START, B_MARKER_START, B_MARKER_START];
            b_columns = [0, 0, 0, 0, 0, 0];

            b_points = 0;
            b_teamName = startingData.teamB;
            b_liberoServeRotation = -1;//libero has not served yet
            b_setsWon = 0;
            b_rotationPosition = 1;
            b_subs = 0;
            b_timeouts = 0;

            timeoutCap = startingData.timeoutCap;
            aServe = startingData.aServe;
            if(aServe)
                b_rotationPosition--;
            else
                a_rotationPosition--;

            //draw initial fields
            setFontSize(30);

            drawText(.15, .1, a_teamName);
            drawText(.7, .1, b_teamName);

            col = "blue";
            setFontColor(col);
            
            setFontSize(20);
            drawText(.47, .1, a_points);
            drawText(.52, .1, b_points);
        };

    var onPoint = function (team)
        {
            setFontSize(18);
            if(team == 'a')
            {
                a_points++;
                if(aServe)//serving team scored
                {
                    drawAPoint();
                }
                else//sideout
                {
                    drawBR();
                    aServe = true;
                    rotateA();
                    drawAPoint();
                }

            }
            else//b team scored
            {
                b_points++;
                if(!aServe)//serving team scored
                {
                    drawBPoint();
                }
                else//sideout
                {
                    drawAR();
                    aServe = false;
                    rotateB();
                    drawBPoint();
                }

            }

            //update score
            setFontSize(20);
            clearRect(.46, .06, .50, .1);
            drawText(.47, .1, a_points+"");
            clearRect(.51, .06, .55, .1);
            drawText(.52, .1, b_points+"");
        };

/*
Draw an "R" on the a marker position
*/
    function drawAR()
    {
        var textLen = (measureText("R_") / width) / scale;
        if((a_markers[a_rotationPosition - 1] + textLen) >= A_MARKER_END)
        {
            a_columns[a_rotationPosition - 1]++;
            a_markers[a_rotationPosition - 1] = A_MARKER_START;
        }
        circleText(a_markers[a_rotationPosition - 1], .18 + (.063 * (a_columns[a_rotationPosition - 1] + (a_rotationPosition - 1) * 2)), "R");
        a_markers[a_rotationPosition - 1] += textLen;
    }

/*
Draw an "R" on the b marker position
*/
    function drawBR()
    {
        var textLen = (measureText("R_") / width) / scale;
        if((b_markers[b_rotationPosition - 1] + textLen) >= B_MARKER_END)
        {
            b_columns[b_rotationPosition - 1]++;
            b_markers[b_rotationPosition - 1] = B_MARKER_START;
        }
        circleText(b_markers[b_rotationPosition - 1], .18 + (.063 * (b_columns[a_rotationPosition - 1] + (b_rotationPosition - 1) * 2)), "R");
        b_markers[b_rotationPosition - 1] += textLen;
    }

/*
Draw a point on the A marker position
*/
    function drawAPoint()
    {
        var textLen = (measureText(a_points+"_") / width) / scale;
        if((a_markers[a_rotationPosition - 1] + textLen) >= A_MARKER_END)
        {
            a_columns[a_rotationPosition - 1]++;
            a_markers[a_rotationPosition - 1] = A_MARKER_START;
        }
        circleText(a_markers[a_rotationPosition - 1], .18 + (.063 * (a_columns[a_rotationPosition - 1] + (a_rotationPosition - 1) * 2)), a_points);
        a_markers[a_rotationPosition - 1] += textLen;
    }

/*
Draw a point on the B marker position
*/
    function drawBPoint()
    {
        var textLen = (measureText(b_points+"_") / width) / scale;
        if((b_markers[b_rotationPosition - 1] + textLen) >= B_MARKER_END)
        {
            b_columns[b_rotationPosition - 1]++;
            b_markers[b_rotationPosition - 1] = B_MARKER_START;
        }
        circleText(b_markers[b_rotationPosition - 1], .18 + (.063 * (b_columns[b_rotationPosition - 1] + (b_rotationPosition - 1) * 2)), b_points);
        b_markers[b_rotationPosition - 1] += textLen;
    }

/*
Rotate team A one position and change the color if the rotation resets to 1
*/
    function rotateA()
    {
        a_rotationPosition++;
        if(a_rotationPosition > 6)
        {
            a_rotationPosition = 1;
            if(b_rotationPosition == 6)
            {
                if(col === "blue")
                {
                    col = "green"
                    setFontColor(col);
                }
                else
                {
                    col = "blue"
                    setFontColor(col);
                }
            }
        }
    }

/*
Rotate team B one position and change the color if the rotation resets to 1
*/
    function rotateB()
    {
        b_rotationPosition++;
        if(b_rotationPosition > 6)
         {
            b_rotationPosition = 1;
            if(a_rotationPosition == 6)
            {
                if(col === "blue")
                {
                    col = "green"
                    setFontColor(col);
                }
                else
                {
                    col = "blue"
                    setFontColor(col);
                }
            }
        }
    }


    var onSubstitution = function (team, position, number)
        {
            
        };
/*
Called when one of the timeout buttons is pressed.
team: a or b depending on which timeout button was pressed.
*/
    var onTimeout = function (team)
        {
            setFontSize(12);
            if(team == 'a')
            {
                if(a_timeouts < timeoutCap)
                {
                    drawText(.45, .90 + (.065 * a_timeouts), a_points + " - " + b_points);
                    a_timeouts++;
                }
            }
            else if(team == 'b')
            {
                if(b_timeouts < timeoutCap)
                {
                    drawText(.5, .90 + (.065 * b_timeouts), a_points + " - " + b_points);
                    b_timeouts++;
                }
            }
        };

    var onPenalty = function ()
        {
            
        };
    var onSetFinished = function ()
        {
            
        };

    return {onStart, onPoint, onSubstitution, onTimeout, onPenalty, onSetFinished};
}
