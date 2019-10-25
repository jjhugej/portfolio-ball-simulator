// please check https://xkcd.com/323/ this project was made like this

document.addEventListener("DOMContentLoaded", function () {

	let canvas = document.getElementById('canvasele');
	let context = canvas.getContext('2d');
	let canvasWidth=canvas.width = window.innerWidth;
	let canvasHeight=canvas.height = window.innerHeight;
	let fps = 60;
	let drawInterval = 1000 / fps;
	const xVelMax = 5;
	const xVelMin = 1;
	const yVelMax = 5;
	const yVelMin = 1;
	const ballSizeMax = 20;
	const ballSizeMin = 10;
	const ballAmount = 20;
    const canvasMin = 0;
	const ballArr = []

	function canvasChecker() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};
	function logMovement(event){
		console.log(event.clientX, event.clientY)
	}
	window.addEventListener('resize', canvasChecker);
	window.addEventListener('mousemove', logMovement)

	console.log(MouseEvent.clientX)


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
		}
		return myBall
	}

	while (ballArr.length < ballAmount) {
		ballArr.push(makeBall())
	}
	console.log(ballArr)


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
		//ball vs mouse


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
		drawMaster();
	}, drawInterval);

});