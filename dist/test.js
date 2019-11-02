function foobar(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft) {
    //left wall
    if (
        ballY + ballSize >= buttonTop &&
        ballY - ballSize <= buttonBottom &&
        ballX + ballSize >= buttonLeft &&
        ballX + ballSize <= buttonLeft + 2
    ) {
        ballXVel = -ballXVel;
        buttonCollision = true;
        console.log(
            'left wall collision',
            'ballX:',
            ballX,
            'ballY:',
            ballY,
            'ballSize:',
            ballSize,
            'buttonLeft:',
            buttonLeft,
            'buttonTop:',
            buttonTop,
            'buttonBottom:',
            buttonBottom
        );
    }

    //check top
    else if (
        ballX + ballSize >= buttonLeft &&
        ballX - ballSize <= buttonRight &&
        ballY + ballSize >= buttonTop &&
        ballY + ballSize <= buttonTop + 2
    ) {
        ballYVel = -ballYVel;
        buttonCollision = true;
        console.log(
            'top wall collision',
            'ballX:',
            ballX,
            'ballY:',
            ballY,
            'ballSize:',
            ballSize,
            'buttonLeft:',
            buttonLeft,
            'buttonTop:',
            buttonTop,
            'buttonBottom:',
            buttonBottom
        );
    }

    //check right wall
    else if (
        ballY + ballSize >= buttonTop &&
        ballY - ballSize <= buttonBottom &&
        ballX - ballSize <= buttonRight &&
        ballX - ballSize >= buttonRight - 2
    ) {
        ballXVel = -ballXVel;
        buttonCollision = true;
        console.log(
            'Right wall collision',
            'ballX:',
            ballX,
            'ballY:',
            ballY,
            'ballSize:',
            ballSize,
            'buttonLeft:',
            buttonLeft,
            'buttonTop:',
            buttonTop,
            'buttonBottom:',
            buttonBottom
        );
    }

    //check bottom
    else if (
        ballX + ballSize >= buttonLeft &&
        ballX - ballSize <= buttonRight &&
        ballY - ballSize <= buttonBottom &&
        ballY - ballSize >= buttonBottom - 2
    ) {
        ballYVel = -ballYVel;
        buttonCollision = true;
        console.log(
            'bottom wall collision',
            'ballX:',
            ballX,
            'ballY:',
            ballY,
            'ballSize:',
            ballSize,
            'buttonLeft:',
            buttonLeft,
            'buttonTop:',
            buttonTop,
            'buttonBottom:',
            buttonBottom
        );
    }
}
