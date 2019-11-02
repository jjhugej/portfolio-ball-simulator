// please check https://xkcd.com/323/ for the luls

document.addEventListener('DOMContentLoaded', function() {
    //Simulator options below - some amounts are changed based on screen width see below.
    //If you want to set the settings mark mediaQueryOveride = true;
    const mediaQueryOveride = true;
    const testBallBoolean = true;
    let fps = 60;
    let drawInterval = 1000 / fps;
    let xVelMax = 3;
    const xVelMin = 1;
    let yVelMax = 3;
    const yVelMin = 1;
    let ballSizeMax = 20;
    let ballSizeMin = 20;
    let ballAmount = 1;
    //End simulator options

    let canvas = document.getElementById('canvasele');
    let context = canvas.getContext('2d');
    let canvasWidth = (canvas.width = window.innerWidth);
    let canvasHeight = (canvas.height = window.innerHeight);
    const canvasMin = 0;
    const ballArr = [];
    let currentMousePos = {
        mouseX: 0,
        mouseY: 0,
    };
    if (mediaQueryOveride == false) {
        if (canvas.width <= 430) {
            ballSizeMin = 5;
            ballSizeMax = 15;
            ballAmount = 15;
        } else if (431 >= canvas.width <= 810) {
            ballSizeMin = 10;
            ballSizeMax = 35;
            ballAmount = 25;
        } else if (811 >= canvas.width <= 1100) {
            ballSizeMin = 15;
            ballSizeMax = 40;
            ballAmount = 35;
        } else {
            ballSizeMin = 25;
            ballSizeMax = 60;
            ballAmount = 45;
            xVelMax = 6;
            yVelMax = 6;
        }
    }

    window.addEventListener('resize', canvasChecker);
    window.addEventListener('mousemove', logMovement);
    window.addEventListener('scroll', logScroll);

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
    function logScroll(event) {
        scrollPos = event.path[1].scrollY;
    }

    function drawBackground() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    function makeBall() {
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
            buttonCollision: false,
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

                        //formula for elastic collision pulled from https://www.khanacademy.org/science/physics/linear-momentum/elastic-and-inelastic-collisions/a/what-are-elastic-and-inelastic-collisions
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
    const buttonelement = document.getElementById('startBtn');
    const button = buttonelement.getBoundingClientRect();
    const buttonTop = button.top;
    const buttonBottom = buttonTop + buttonelement.offsetHeight;
    const buttonRight = button.x + buttonelement.offsetWidth;
    const buttonLeft = button.x;
    console.log(
        'button object: ',
        button,
        'buttonTop',
        buttonTop,
        'buttonBottom',
        buttonBottom,
        'buttonRight',
        buttonRight,
        'buttonLeft',
        buttonLeft
    );
    function buttonCollision(ballObject) {
        //check standard collision to enter additional collision checks
        if (ballObject.buttonCollision == false) {
            //check wall collisions
            //check left wall
            // MAKE VARIABLES FOR BALLOBJECT.BALLY + BALLSIZE = BOTOFBALL- STUPID
            if (
                ballObject.ballY + ballObject.ballSize >= buttonTop &&
                ballObject.ballY - ballObject.ballSize <= buttonBottom &&
                ballObject.ballX + ballObject.ballSize >= buttonLeft &&
                ballObject.ballX + ballObject.ballSize < buttonRight
            ) {
                ballObject.ballXVel = -ballObject.ballXVel;
                ballObject.buttonCollision = true;
                console.log('Left Wall Collison', ballObject);
            }

            //check top
            else if (
                ballObject.ballX + ballObject.ballSize >= buttonLeft &&
                ballObject.ballX - ballObject.ballSize <= buttonRight &&
                ballObject.ballY + ballObject.ballSize >= buttonTop &&
                ballObject.ballY + ballObject.ballSize < buttonBottom
            ) {
                ballObject.ballYVel = -ballObject.ballYVel;
                ballObject.buttonCollision = true;
                console.log('Top Wall Collison', buttonTop, ballObject);
            }

            //check right wall
            else if (
                ballObject.ballY + ballObject.ballSize >= buttonTop &&
                ballObject.ballY - ballObject.ballSize <= buttonBottom &&
                ballObject.ballX - ballObject.ballSize <= buttonRight &&
                ballObject.ballX - ballObject.ballSize > buttonLeft
            ) {
                ballObject.ballXVel = -ballObject.ballXVel;
                ballObject.buttonCollision = true;
                console.log('Right Wall Collison', ballObject);
            }

            //check bottom
            else if (
                ballObject.ballX + ballObject.ballSize >= buttonLeft &&
                ballObject.ballX - ballObject.ballSize <= buttonRight &&
                ballObject.ballY - ballObject.ballSize <= buttonBottom &&
                ballObject.ballY - ballObject.ballSize > buttonTop
            ) {
                ballObject.ballYVel = -ballObject.ballYVel;
                ballObject.buttonCollision = true;
                console.log('Bottom Wall Collison', ballObject);
            }
        } else {
            ballObject.buttonCollision = false;
        }

        /* 
         else {
            ballObject.buttonCollision = false;

        The following uses the same elastic collision equation as above in the ball vs ball collision. 
        Due to the formula requiring a mass and velocity for both entities (because: physics)--
         the formula does not work as intended here.     
        btnMass and btnVel are required for the formula to work properly, despite the btn having neither. These are theoretical.
        
        btnMass = 10000;
        btnVel = 0.001;
        ballXInitialVel = ballObject.ballXVel;
        ballYInitialVel = ballObject.ballYVel;
        if (
            ballObject.ballX + ballObject.ballSize >= button.left &&
            ballObject.ballX - ballObject.ballSize <= button.right &&
            ballObject.ballY + ballObject.ballSize >= button.top + scrollPos - (1 / 2) * button.height - 10 &&
            ballObject.ballY - ballObject.ballSize <= button.bottom + scrollPos - (1 / 2) * button.height - 10
        ) {
            if (ballObject.buttonCollision == false) {
                ballObject.ballXVel =
                    ((ballObject.ballSize - btnMass) / (ballObject.ballSize + btnMass)) * ballXInitialVel +
                    ((2 * btnMass) / (ballObject.ballSize + btnMass)) * btnVel;
                ballObject.ballYVel =
                    ((ballObject.ballSize - btnMass) / (ballObject.ballSize + btnMass)) * ballYInitialVel +
                    ((2 * btnMass) / (ballObject.ballSize + btnMass)) * btnVel;
                //--rudimentary ball vs button collision
                //ballObject.ballXVel = -ballObject.ballXVel;
                //ballObject.ballYVel = -ballObject.ballYVel;
                

                ballObject.buttonCollision = true;
            }
        } else {
            ballObject.buttonCollision = false;
        }*/
    }
    function drawTestBall() {
        context.beginPath();
        context.fillStyle = 'white';
        context.arc(ballObject.ballX, ballObject.ballY, ballObject.ballSize, 0, 2 * Math.PI);
        context.fill();
        screenCollision(ballObject);
        mouseCollision(ballObject);
        ballCollision(ballObject);
        buttonCollision(ballObject);
    }
    function drawBall(ballObject) {
        context.beginPath();
        context.fillStyle = 'white';
        context.arc(ballObject.ballX, ballObject.ballY, ballObject.ballSize, 0, 2 * Math.PI);
        context.fill();
        screenCollision(ballObject);
        mouseCollision(ballObject);
        ballCollision(ballObject);
        buttonCollision(ballObject);
        ballObject.ballX += ballObject.ballXVel;
        ballObject.ballY += ballObject.ballYVel;
    }

    function drawMaster() {
        drawBackground();
        for (let i = 0; i < ballArr.length; i++) {
            drawBall(ballArr[i]);
        }
    }

    while (ballArr.length < ballAmount) {
        ballArr.push(makeBall());
    }
    setInterval(() => {
        drawMaster();
    }, drawInterval);
});
