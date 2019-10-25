function makeBall(xmax, ymax,  min, xVelMax, xVelMin,  yVelMax, yVelMin){
    let myBall = {
        ballX : Math.floor(Math.random() * Math.floor(xmax - min) + min), 
        ballY: Math.floor(Math.random() * Math.floor(ymax - min) + min), 
        ballXVel: Math.floor(Math.random() * Math.floor(xVelMax - xVelMin) + xVelMin),
        ballYVel: Math.floor(Math.random() * Math.floor(yVelMax - yVelMin) + yVelMin)
        
    }
}



for (i=0; i<100; i++){
    makeBall(canvas.width,canvas.height, 0, 10, 1, 10, 1)  
}