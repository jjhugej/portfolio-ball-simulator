function foobar(ballX, ballY, ballSize, buttonTop, buttonRight, buttonBottom, buttonLeft) {
    if (
        ballY + ballSize >= buttonTop &&
        ballY - ballSize <= buttonBottom &&
        ballX + ballSize >= buttonLeft &&
        ballX + ballSize <= buttonLeft + 2
    ) {
        ballXVel = -ballXVel;
        buttonCollision = true;
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
    }
}
