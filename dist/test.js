function foobar(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft) {
    checkIsCollidingLeft(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft);
    checkIsCollidingRight(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft);
    checkIsCollidingTop(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft);
    checkIsCollidingBottom(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft);
}

function checkIsCollidingLeft(ballX, ballY, ballSize, buttonTop, buttonBottom, buttonLeft) {
    //left wall
    if (
        ballY + ballSize >= buttonTop &&
        ballY - ballSize <= buttonBottom &&
        ballX + ballSize >= buttonLeft &&
        ballX + ballSize <= buttonLeft + 2
    ) {
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
        return true;
    }
}

function checkIsCollidingRight(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom) {
    //check right wall
    if (
        ballY + ballSize >= buttonTop &&
        ballY - ballSize <= buttonBottom &&
        ballX - ballSize <= buttonRight &&
        ballX - ballSize >= buttonRight - 2
    ) {
        console.log(
            'Right wall collision',
            'ballX:',
            ballX,
            'ballY:',
            ballY,
            'ballSize:',
            ballSize,
            'buttonTop:',
            buttonTop,
            'buttonBottom:',
            buttonBottom
        );
        return true;
    }
}

function checkIsCollidingTop(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft) {
    //check top
    if (
        ballX + ballSize >= buttonLeft &&
        ballX - ballSize <= buttonRight &&
        ballY + ballSize >= buttonTop &&
        ballY + ballSize <= buttonTop + 2
    ) {
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
}

function checkIsCollidingBottom(ballX, ballY, ballSize, buttonRight, buttonBottom, buttonLeft) {
    //check bottom
    if (
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
        return true;
    }
}

foobar(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft);
