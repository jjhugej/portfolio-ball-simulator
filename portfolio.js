// please check https://xkcd.com/323/ for the luls

document.addEventListener('DOMContentLoaded', function() {
    let canvas = document.getElementById('canvasele');
    let context = canvas.getContext('2d');
    let canvasWidth = (canvas.width = window.innerWidth);
    let canvasHeight = (canvas.height = window.innerHeight);
    //make simulator adjustments below
    let fps = 60;
    let drawInterval = 1000 / fps;
    const xVelMax = 4;
    const xVelMin = 1;
    const yVelMax = 4;
    const yVelMin = 1;
    const ballSizeMax = 50;
    const ballSizeMin = 10;
    const ballAmount = 20;

    const canvasMin = 0;
    const ballArr = [];

    let currentMousePos = {
        mouseX: 0,
        mouseY: 0,
    };

    function canvasChecker() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function logMovement(event) {
        currentMousePos = {
            mouseX: event.clientX,
            mouseY: event.clientY,
        };
    }

    window.addEventListener('resize', canvasChecker);
    window.addEventListener('mousemove', logMovement);

    function drawBackground() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    while (ballArr.length < ballAmount) {
        ballArr.push(makeBall());
    }

    function makeBall() {
        //creates and returns a random ball object (initialized with random variables).
        let myBall = {
            ballX: Math.floor(
                Math.random() * Math.floor(canvasWidth - ballSizeMax - (canvasMin + ballSizeMax)) +
                    (canvasMin + ballSizeMax)
            ),
            ballY: Math.floor(
                Math.random() * Math.floor(canvasHeight - ballSizeMax - (canvasMin + ballSizeMax)) +
                    (canvasMin + ballSizeMax)
            ),
            ballXVel: Math.floor(Math.random() * Math.floor(xVelMax - xVelMin) + xVelMin),
            ballYVel: Math.floor(Math.random() * Math.floor(yVelMax - yVelMin) + yVelMin),
            ballSize: Math.floor(Math.random() * Math.floor(ballSizeMax - ballSizeMin) + ballSizeMin),
            mouseCollision: false,
            ballCollisionArray: [],
        };
        return myBall;
    }
    function mouseCollision(ballObject) {
        if (
            Math.sqrt(
                (ballObject.ballX - currentMousePos.mouseX) * (ballObject.ballX - currentMousePos.mouseX) +
                    (ballObject.ballY - currentMousePos.mouseY) * (ballObject.ballY - currentMousePos.mouseY)
            ) <
            ballObject.ballSize + 10
        ) {
            if (ballObject.mouseCollision == false) {
                ballObject.mouseCollision = true;
                ballObject.ballXVel = -ballObject.ballXVel;
                ballObject.ballYVel = -ballObject.ballYVel;
            }
        } else {
            ballObject.mouseCollision = false;
        }
    }
    function ballCollision(ballObject) {
        for (let i = 0; i < ballArr.length; i++) {
            if (ballArr[i] != ballObject) {
                if (
                    Math.sqrt(
                        (ballObject.ballX - ballArr[i].ballX) * (ballObject.ballX - ballArr[i].ballX) +
                            (ballObject.ballY - ballArr[i].ballY) * (ballObject.ballY - ballArr[i].ballY)
                    ) <
                    ballObject.ballSize + ballArr[i].ballSize
                ) {
                    if (
                        ballObject.ballCollisionArray.includes(ballArr[i]) != true &&
                        ballArr[i].ballCollisionArray.includes(ballObject) != true
                    ) {
                        ballObject.ballCollisionArray.push(ballArr[i]);
                        ballArr[i].ballCollisionArray.push(ballObject);
                        ballAXInitialVel = ballObject.ballXVel;
                        ballAYInitialVel = ballObject.ballYVel;
                        ballBXInitialVel = ballArr[i].ballXVel;
                        ballBYInitialVel = ballArr[i].ballYVel;

                        ballObject.ballXVel =
                            ((ballObject.ballSize - ballArr[i].ballSize) /
                                (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballAXInitialVel +
                            ((2 * ballArr[i].ballSize) / (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballBXInitialVel;
                        ballObject.ballYVel =
                            ((ballObject.ballSize - ballArr[i].ballSize) /
                                (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballAYInitialVel +
                            ((2 * ballArr[i].ballSize) / (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballBYInitialVel;

                        ballArr[i].ballXVel =
                            ((2 * ballObject.ballSize) / (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballAXInitialVel +
                            ((ballArr[i].ballSize - ballObject.ballSize) /
                                (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballBXInitialVel;
                        ballArr[i].ballYVel =
                            ((2 * ballObject.ballSize) / (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballAYInitialVel +
                            ((ballArr[i].ballSize - ballObject.ballSize) /
                                (ballObject.ballSize + ballArr[i].ballSize)) *
                                ballBYInitialVel;
                    }
                    //shoutout to babagamingofficial for fixing the bug with balls not colliding properly. please refer to github to see previous failures
                } else {
                    for (let j = 0; j < ballObject.ballCollisionArray.length; j++) {
                        if (ballObject.ballCollisionArray[j] == ballArr[i]) {
                            ballObject.ballCollisionArray.splice(j - 1, 1);
                        }
                    }

                    for (let j = 0; j < ballArr[i].ballCollisionArray.length; j++) {
                        if (ballArr[i].ballCollisionArray[j] == ballObject) {
                            ballArr[j].ballCollisionArray.splice(j - 1, 1);
                        }
                    }
                }
            }
        }
    }
    function screenCollision(ballObject) {
        //checks for ball hitting sides of screen
        if (ballObject.ballX + ballObject.ballSize >= canvas.width || ballObject.ballX - ballObject.ballSize <= 0) {
            ballObject.ballXVel = -ballObject.ballXVel;
        }
        //checks for ball hitting top and bottom of screen
        if (ballObject.ballY + ballObject.ballSize >= canvas.height || ballObject.ballY - ballObject.ballSize <= 0) {
            ballObject.ballYVel = -ballObject.ballYVel;
        }
        //the following fixes the balls getting stuck to the edge screen
        //for the top and bottom
        if (ballObject.ballY - ballObject.ballSize < 0) {
            ballObject.ballY = ballObject.ballSize + 1;
        }
        if (ballObject.ballY + ballObject.ballSize > canvas.height) {
            ballObject.ballY = canvas.height - ballObject.ballSize - 1;
        }
        //for the sides
        if (ballObject.ballX - ballObject.ballSize < 0) {
            ballObject.ballX = ballObject.ballSize + 1;
        }
        if (ballObject.ballX + ballObject.ballSize > canvas.width) {
            ballObject.ballX = canvas.width - ballObject.ballSize - 1;
        }
    }

    function drawBall(ballObject) {
        context.beginPath();
        context.fillStyle = 'white';
        context.arc(ballObject.ballX, ballObject.ballY, ballObject.ballSize, 0, 2 * Math.PI);
        context.fill();
        screenCollision(ballObject);
        mouseCollision(ballObject);
        ballCollision(ballObject);
        ballObject.ballX += ballObject.ballXVel;
        ballObject.ballY += ballObject.ballYVel;
    }

    function drawMaster() {
        drawBackground();
        for (let i = 0; i < ballArr.length; i++) {
            drawBall(ballArr[i]);
        }
    }

    setInterval(() => {
        drawMaster();
    }, drawInterval);
});
