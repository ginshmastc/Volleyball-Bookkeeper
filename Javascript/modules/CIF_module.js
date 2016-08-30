/*
This module contains functions and logic for the CIF volleyball book style.
*/


function getModule() {
	//define functions and set common functions names to their declarations contained here

    var ERROR_ILLEGALSUB = 1;
    var ERROR_NOMORESUBS = 2;

    var a_marker;
    var a_column;
    var b_marker;
    var b_column;
    var A_MARKER_START = .15;
    var A_MARKER_END = .47;
    var B_MARKER_START = .7;
    var B_MARKER_END = .98;
    var CIF_SUBCAP = 18;
    var CIF_TIMEOUTS = 2;
    var LINEUP_LEN = 6;
    var col;

    var a_scoreMarks;
    var b_scoreMarks;
    var MARK_CAP = 40;

    var a_subList;
    var b_subList;

    var SLASH = 0;
    var CIRCLE = 1;
    var TRIANGLE = 2;
    var SQUARE = 3;

    var onStart = function ()
        {

            var bgimage = "url('Images/CIF_image.png')";
            document.getElementById("myBook").style.backgroundImage = bgimage;

            a_points = 0;
            a_lineup = startingData.aLineup.slice(0);
            a_teamName = startingData.teamA;
            a_liberoServeRotation = -1;//libero has not served yet
            a_setsWon = 0;
            a_rotationPosition = 1;
            a_subs = 0;
            a_timeouts = 0;

//arrays of markers and columns
            a_markers = [A_MARKER_START, A_MARKER_START, A_MARKER_START, A_MARKER_START, A_MARKER_START, A_MARKER_START];
            a_columns = [0,0,0,0,0,0];
            b_markers = [B_MARKER_START, B_MARKER_START, B_MARKER_START, B_MARKER_START, B_MARKER_START, B_MARKER_START];
            b_columns = [0,0,0,0,0,0];

            b_points = 0;
            b_lineup = startingData.bLineup.slice(0);
            b_teamName = startingData.teamB;
            b_liberoServeRotation = -1;//libero has not served yet
            b_setsWon = 0;
            b_rotationPosition = 1;
            b_subs = 0;
            b_timeouts = 0;

            a_subList = [[1, a_lineup[0]], [2, a_lineup[1]], [3, a_lineup[2]], [4, a_lineup[3]], [5, a_lineup[4]], [6, a_lineup[5]]];
            b_subList = [[1, b_lineup[0]], [2, b_lineup[1]], [3, b_lineup[2]], [4, b_lineup[3]], [5, b_lineup[4]], [6, b_lineup[5]]];

            a_scoreMarks = new Array(MARK_CAP);
            b_scoreMarks = new Array(MARK_CAP);

            timeoutCap = CIF_TIMEOUTS;
            subCap = CIF_SUBCAP;
            aServe = startingData.aServe;
            comments = "";
            if(aServe)
                b_rotationPosition--;
            else
                a_rotationPosition--;

            //draw initial fields
            setFontSize(30);
            setFontColor("black");
            drawText(.15, .1, a_teamName);
            drawText(.7, .1, b_teamName);

            //fill in liberos
            setFontSize(18);
            
            drawText(.08, .11, a_lineup[6]);
            drawText(.63, .11, b_lineup[6]);
            drawLineups();

            col = "blue";
            setFontColor(col);
            
            drawScore();
        };

    var onPoint = function (team, libero)
        {
            setFontSize(18);
            if(team == 'a')
            {
                a_points++;
                if(aServe)//serving team scored
                {
                    drawAPoint(libero);
                }
                else//sideout
                {
                    drawBR(libero);
                    aServe = true;
                    rotateA();
                    drawAText(a_points);
                }

            }
            else//b team scored
            {
                b_points++;
                if(!aServe)//serving team scored
                {
                    drawBPoint(libero);
                }
                else//sideout
                {
                    drawAR(libero);
                    aServe = false;
                    rotateB();
                    drawBText(b_points);
                }

            }
            drawScore();
            if(libero)
                drawLiberoTriangles();

            if(a_points >= scoreCap)
                onSetFinished('a');
            if(b_points >= scoreCap)
                onSetFinished('b');

            if(a_points >= playTo && a_points - b_points >= 2)
                onSetFinished('a');
            if(b_points >= playTo && b_points - a_points >= 2)
                onSetFinished('b');
        };

function drawScore()
{
   setFontSize(20);
   clearRect(.45, .06, .50, .1);
   drawText(.465, .1, a_points+"");
   clearRect(.51, .06, .55, .1);
   drawText(.515, .1, b_points+"");
}

/*
Draw an "R" on the a marker position.
libero: true if libero served.
*/
    function drawAR(libero)
    {
        var textLen = (measureText("R_") / width) / scale;
        if((a_markers[a_rotationPosition - 1] + textLen) >= A_MARKER_END)
        {
            a_columns[a_rotationPosition - 1]++;
            a_markers[a_rotationPosition - 1] = A_MARKER_START;
        }
        if(!libero)
            circleText(a_markers[a_rotationPosition - 1], .18 + (.064 * (a_columns[a_rotationPosition - 1] + (a_rotationPosition - 1) * 2)), "R");
        else
        {
            triangleText(a_markers[a_rotationPosition - 1], .18 + (.064 * (a_columns[a_rotationPosition - 1] + (a_rotationPosition - 1) * 2)), "R");
            a_liberoServeRotation = a_rotationPosition;
        }

        a_markers[a_rotationPosition - 1] += textLen;
    }

/*
Draw an "R" on the b marker position.
*/
    function drawBR(libero)
    {
        var textLen = (measureText("R_") / width) / scale;
        if((b_markers[b_rotationPosition - 1] + textLen) >= B_MARKER_END)
        {
            b_columns[b_rotationPosition - 1]++;
            b_markers[b_rotationPosition - 1] = B_MARKER_START;
        }
        if(!libero)
            circleText(b_markers[b_rotationPosition - 1], .18 + (.064 * (b_columns[b_rotationPosition - 1] + (b_rotationPosition - 1) * 2)), "R");
        else
        {
            triangleText(b_markers[b_rotationPosition - 1], .18 + (.064 * (b_columns[b_rotationPosition - 1] + (b_rotationPosition - 1) * 2)), "R");
            b_liberoServeRotation = b_rotationPosition;
        }

        b_markers[b_rotationPosition - 1] += textLen;
    }

/*
Draw a point on the A marker position.
*/
    function drawAPoint(libero)
    {
        setFontSize(18);
        var textLen = (measureText(a_points+"_") / width) / scale;
        if((a_markers[a_rotationPosition - 1] + textLen) >= A_MARKER_END)
        {
            a_columns[a_rotationPosition - 1]++;
            a_markers[a_rotationPosition - 1] = A_MARKER_START;
        }

        if(!libero)
            circleText(a_markers[a_rotationPosition - 1], .18 + (.064 * (a_columns[a_rotationPosition - 1] + (a_rotationPosition - 1) * 2)), a_points);
        else
        {
            triangleText(a_markers[a_rotationPosition - 1], .18 + (.064 * (a_columns[a_rotationPosition - 1] + (a_rotationPosition - 1) * 2)), a_points);
            a_liberoServeRotation = a_rotationPosition;
        }

        a_markers[a_rotationPosition - 1] += textLen;
    }

/*
Draw a point on the B marker position.
libero: is libero served checked.
*/
    function drawBPoint(libero)
    {
        setFontSize(18);
        var textLen = (measureText(b_points+"_") / width) / scale;
        if((b_markers[b_rotationPosition - 1] + textLen) >= B_MARKER_END)
        {
            b_columns[b_rotationPosition - 1]++;
            b_markers[b_rotationPosition - 1] = B_MARKER_START;
        }
        if(!libero)
        {
            circleText(b_markers[b_rotationPosition - 1], .18 + (.064 * (b_columns[b_rotationPosition - 1] + (b_rotationPosition - 1) * 2)), b_points);
        }
        else
        {
            triangleText(b_markers[b_rotationPosition - 1], .18 + (.064 * (b_columns[b_rotationPosition - 1] + (b_rotationPosition - 1) * 2)), b_points);
            b_liberoServeRotation = b_rotationPosition;
        }

        b_markers[b_rotationPosition - 1] += textLen;
    }

/*
Draw a point on the A text.
*/
    function drawAText(text)
    {
        setFontSize(16);
        var textLen = (measureText(text+"_") / width) / scale;
        if((a_markers[a_rotationPosition - 1] + textLen) >= A_MARKER_END)
        {
            a_columns[a_rotationPosition - 1]++;
            a_markers[a_rotationPosition - 1] = A_MARKER_START;
        }
        drawText(a_markers[a_rotationPosition - 1], .18 + (.064 * (a_columns[a_rotationPosition - 1] + (a_rotationPosition - 1) * 2)), text);
        a_markers[a_rotationPosition - 1] += textLen;
    }


/*
Draw a point on the B marker position.
text: text being drawn
*/
    function drawBText(text)
    {
        setFontSize(16);
        var textLen = (measureText(text+"_") / width) / scale;
        if((b_markers[b_rotationPosition - 1] + textLen) >= B_MARKER_END)
        {
            b_columns[b_rotationPosition - 1]++;
            b_markers[b_rotationPosition - 1] = B_MARKER_START;
        }
        drawText(b_markers[b_rotationPosition - 1], .18 + (.064 * (b_columns[b_rotationPosition - 1] + (b_rotationPosition - 1) * 2)), text);
        b_markers[b_rotationPosition - 1] += textLen;
    }

/*
Rotate team A one position and change the color if the rotation resets to 1
*/
    function rotateA()
    {
        a_rotationPosition++;
        if(a_rotationPosition > LINEUP_LEN)
        {
            a_rotationPosition = 1;
            if(b_rotationPosition == LINEUP_LEN)
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
        if(b_rotationPosition > LINEUP_LEN)
         {
            b_rotationPosition = 1;
            if(a_rotationPosition == LINEUP_LEN)
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
Called when a substitution is made.
subs: list of input from substitution input fields.
team: which team made the subs.
*/
    var onSubstitution = function (subs, team)
        {
            for(i = 0; i < LINEUP_LEN; i++)
            {
                if(subs[i] != '')
                {
                    var err = sub(team, subs[i], i + 1);
                }
            }
        };

/*
Checks for sub legality and makes a substitution if possible.
team: which team is subbing.
sub: number of sub.
position: rotational position of sub.
*/
    function sub(team, sub, position)
    {
        if(team == 'a')
        {
            if(a_subs >= subCap)
                return ERROR_NOMORESUBS;
            if(sub == a_lineup[6])
                return ERROR_ILLEGALSUB;
            for(i = 0; i < a_subList.length; i++)
                if(a_subList[i][1] == sub)
                    if(a_subList[i][0] == position)
                    {
                        if(a_lineup[position - 1] == sub)
                            return ERROR_ILLEGALSUB;
                        break;
                    }
                    else
                        return ERROR_ILLEGALSUB;

            if(aServe)
                drawAText("S " + sub + "/" + a_lineup[position-1]);
            else
                drawBText("Sx" + sub + "/" + a_lineup[position-1]);

            a_subList.push([position, sub]);
            a_lineup[position - 1] = sub;
            a_subs++;

        }
        else if(team == 'b')
        {
            if(b_subs >= subCap)
                return ERROR_NOMORESUBS;
            if(sub == b_lineup[6])
                return ERROR_ILLEGALSUB;
            for(i = 0; i < b_subList.length; i++)
                if(b_subList[i][1] == sub)
                    if(b_subList[i][0] == position)
                    {
                        if(b_lineup[position - 1] == sub)
                            return ERROR_ILLEGALSUB;
                        break;
                    }
                    else
                        return ERROR_ILLEGALSUB;

            if(!aServe)
                drawBText("S " + sub + "/" + b_lineup[position-1]);
            else
                drawAText("Sx" + sub + "/" +  b_lineup[position-1]);

            b_subList.push([position, sub]);
            b_lineup[position - 1] = sub;
            b_subs++;

        }
        drawLineups();
        return 0;
    }

/*
draws lineups including previous substitutions.
*/
    function drawLineups()
    {
        setFontSize(18);
        setFontColor('black');
        clearRect(.035, .13, .14, .9);
        clearRect(.59, .13, .69, .9);
        clearRect(0, .9, .45, 1);
        clearRect(.55, .9, 1, 1);
        for(i=0; i < a_subs; i++)
            drawText(.016 + (.019 * i), .97, "\\");
        for(i=0; i < b_subs; i++)
            drawText(.57 + (.019 * i), .97, "\\");
        var pos_subs = [0, 0, 0, 0, 0, 0];//counters for number of subs in rotation
        for(j = 0; j < a_subList.length; j++)
        {
            var p = a_subList[j][0];//rotation position
            var s = a_subList[j][1];//sub number
            var multiplier = 0;
            var multiplier2 = 0;
            if(pos_subs[p-1] >= 4)//move down a line if more than 4 subs
                multiplier = 1;
            if(pos_subs[p-1] > 4)
                multiplier2 = 1;

            if(pos_subs[p-1] > 0)//if there is more than 1 sub, slash the previous sub
            {
                setFontSize(32);
                drawText(.0445 + (.025*((pos_subs[p-1]-1) % 4)), .052 + (p * .127) + (multiplier2 * .0635), "\\");
            }

            if(pos_subs[p-1] >= 8)//no space for more than 8 subs
                continue;
            setFontSize(18);
            drawText(.04 + (.025*(pos_subs[p-1] % 4)), .05 + (p * .127) + (multiplier * .0635), s);

            pos_subs[p-1]++;
        }

        pos_subs = [0, 0, 0, 0, 0, 0];//reset counters
        for(j = 0; j < b_subList.length; j++)
        {
            var p = b_subList[j][0];//rotation position
            var s = b_subList[j][1];//sub number
            var multiplier = 0;
            var multiplier2 = 0;
            if(pos_subs[p-1] >= 4)//move down a line if more than 4 subs
                multiplier = 1;
            if(pos_subs[p-1] > 4)
                multiplier2 = 1;

            if(pos_subs[p-1] > 0)//if there is more than 1 sub, slash the previous sub
            {
                setFontSize(32);
                drawText(.6 + (.025*((pos_subs[p-1]-1) % 4)), .052 + (p * .127) + (multiplier2 * .0635), "\\");
            }

            if(pos_subs[p-1] >= 8)//no space for more than 8 subs
                continue;
            setFontSize(18);
            drawText(.595 + (.025*(pos_subs[p-1] % 4)), .05 + (p * .127) + (multiplier * .0635), s);

            pos_subs[p-1]++;
        }

        setFontColor(col);
    }

function drawLiberoTriangles()
{
    if(a_liberoServeRotation > 0)
        triangleText(.01, .08 + (a_liberoServeRotation * .125), "   ");
    if(b_liberoServeRotation > 0)
        triangleText(.56, .08 + (b_liberoServeRotation * .125), "   ");

}

/*
Slash through point numbers.
*/
    function slashPoints()
    {
        
    }

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
                    drawText(.455, .90 + (.064 * a_timeouts), a_points + " - " + b_points);
                    a_timeouts++;
                
                    if(aServe)
                        drawAText("T ");
                    else
                        drawBText("Tx");
                }
            }
            else if(team == 'b')
            {
                if(b_timeouts < timeoutCap)
                {
                    drawText(.505, .90 + (.064 * b_timeouts), b_points + " - " + a_points);
                    b_timeouts++;
                
                    if(!aServe)
                        drawBText("T ");
                    else
                        drawAText("Tx");
                }
            }
        };

/*
Called when a penalty button is pressed.
team: which team is the penalty called on.
additionalComments: additional comments on the penalty.
award: true if a point is awarded, false if not
*/
    var onPenalty = function (team, additionalComments, award)
        {
            comments += additionalComments;
            if(!award)
                return;
            if(team == 'a')
            {
                b_points++;
                if(aServe)
                    rotateB();
                aServe = false;
                drawBText("P" + b_points);//need to squre text
            }
            else if(team == 'b')
            {
                a_points++;
                if(!aServe)
                    rotateA();
                aServe = true;
                drawAText("P" + a_points);//need to squre text
            }
        };

    var onUndo = function ()
        {
            clearRect(0,0,1,1);
            setLock(true);
            reset();

            initIterator();
            var cur = nextInput();
            while(cur != null)
            {
                var d = cur.data.split('\n');
                switch(d[0]) {
                    case 'p':
                      onPoint(d[1], d[2] === 'true');
                      break;
                    case 't':
                      onTimeout(d[1]);
                      break;
                    case 's':
                      sub(d[1], d[3], parseInt(d[2]));
                      break;
                    case 'e':
                      onPenalty(d[1], d[3], d[2] === 'true');
                      break;
                    default:
                } 
                cur = nextInput();
            }
            setLock(false);
        };

/*
Called when the set is finished.  Package any game data and send to device.
*/
    var onSetFinished = function (team)
        {
            
        };

    return {onStart, onPoint, onSubstitution, onTimeout, onPenalty, onSetFinished, onUndo};
}
