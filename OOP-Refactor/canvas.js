import Ball from 'ball.js';

class BallCanvas {
    constructor(id, width, height, context, ballAmount) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.context = context;
        this.ballArr = this.createBallArr(ballAmount);
        this.ballAmount = ballAmount;
    }
    drawBackground() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    makeBall() {
        const ball = new Ball(1, 2, 3, 4, 5);
        return ball;
    }
    drawBall(ball) {
        this.context.beginPath();
        this.context.fillStyle = 'white';
        this.context.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
        this.context.fill();
    }
    createBallArr(ballAmount) {
        const tempArr = [];
        for (i = 0; i < ballAmount; i++) {
            tempArr.push(makeBall());
        }
        return tempArr;
    }
    setsBallArr(ballAmount) {
        this.ballArr = this.createBallArr(ballAmount);
    }
}
const canvas1 = new BallCanvas('canvasele', window.innerWidth, window.innerHeight, '2d', 50);
console.log(canvas1);
