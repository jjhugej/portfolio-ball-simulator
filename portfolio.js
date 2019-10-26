// please check https://xkcd.com/323/ this project was made like this

document.addEventListener("DOMContentLoaded", function () {

	let canvas = document.getElementById('canvasele');
	let context = canvas.getContext('2d');
	let canvasWidth=canvas.width = window.innerWidth;
	let canvasHeight=canvas.height = window.innerHeight;
	let fps = 60;
	let drawInterval = 1000 / fps;
	const xVelMax = 2;
	const xVelMin = 1;
	const yVelMax = 2;
	const yVelMin = 1;
	const ballSizeMax = 20;
	const ballSizeMin = 10;
	const ballAmount = 20;
    const canvasMin = 0;
	const ballArr = [];
	let currentMousePos = {
		mouseX : 0,
		mouseY: 0,
	};

	function canvasChecker() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};
	function logMovement(event){
		currentMousePos ={
			mouseX : event.clientX,
			mouseY : event.clientY,
		}
	}
	
	window.addEventListener('resize', canvasChecker);
	window.addEventListener('mousemove', logMovement)

	function drawBackground() {
		context.fillStyle = 'black'
		context.fillRect(0, 0, canvas.width, canvas.height)
	};


	function makeBall() {
		let myBall = {
			ballX: Math.floor(Math.random() * Math.floor(canvasWidth - canvasMin) + canvasMin),
			ballY: Math.floor(Math.random() * Math.floor(canvasHeight - canvasMin) + canvasMin),
			ballXVel: Math.floor(Math.random() * Math.floor(xVelMax - xVelMin) + xVelMin),
			ballYVel: Math.floor(Math.random() * Math.floor(yVelMax - yVelMin) + yVelMin),
			ballSize: Math.floor(Math.random() * Math.floor(ballSizeMax - ballSizeMin) + ballSizeMin),
			ballCollision : false,
		}
		return myBall
	}

	while (ballArr.length < ballAmount) {
		ballArr.push(makeBall())
	}

	function mouseCollision(ballObject){
		if(Math.sqrt((ballObject.ballX - currentMousePos.mouseX)*(ballObject.ballX - currentMousePos.mouseX) + (ballObject.ballY - currentMousePos.mouseY)*(ballObject.ballY - currentMousePos.mouseY)) < (ballObject.ballSize + 10)){
			if (ballObject.ballCollision == false){
				ballObject.ballCollision = true;
				ballObject.ballXVel = -ballObject.ballXVel;
				ballObject.ballYVel = -ballObject.ballYVel;
			}
			}else{
				ballObject.ballCollision = false;
			
		}
	}
	/*
	function ballCollision(ballObject){
		if(Math.sqrt(ballObject.ballX - ))
	}
	*/

	function drawBall(ballObject) {
		//draw the ball
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(ballObject.ballX, ballObject.ballY, ballObject.ballSize, 0, 2 * Math.PI)
		context.fill();
		//ball vs screen
		if (ballObject.ballX + ballObject.ballSize > canvas.width || ballObject.ballX - ballObject.ballSize < 0) {
			ballObject.ballXVel = -ballObject.ballXVel
		};
		if (ballObject.ballY + ballObject.ballSize > canvas.height || ballObject.ballY - ballObject.ballSize < 0) {
			ballObject.ballYVel = -ballObject.ballYVel
		};
		mouseCollision(ballObject);

		//ball velocity
		ballObject.ballX += ballObject.ballXVel
		ballObject.ballY += ballObject.ballYVel	

	}

	function drawMaster() {
		drawBackground()
		for (i = 0; i < ballArr.length; i++) {
			drawBall(ballArr[i])
		}

	};

	setInterval(() => {
		//console.log('mouseposX:' + currentMousePos.mouseX)
		//console.log('mouseposY:' + currentMousePos.mouseY)
		drawMaster();	
	}, drawInterval);	

});



//if (Math.sqrt( (ballObject.ballX - currentMousePos.mouseX)*(ballObject.ballX - currentMousePos.mouseX) + (ballObject.ballY - currentMousePos.mouseY) * (ballObject.ballY - currentMousePos.mouseY) )