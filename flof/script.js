
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let ballRadius = 10;
    let ballSpeed = 50;

    // that's some paddlin'!
    let paddleHeight = 5;
    let paddleWidth = 75;
    let paddleX = (canvas.width-paddleWidth) / 2;

    // ball start position 
    let x = canvas.width/2;
    let y = canvas.height-30;

    //directions
    let dx = 2;
    let dy = 2;

    // key events
    let rightPressed = false;
    let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    } if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;}

}

function drawPaddle() {
    
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    drawPaddle();
    y += dy;
    x += dx;

    if(rightPressed) {
        paddleX += 7;
    }
    else if(leftPressed) {
        paddleX -= 7;
    }
}

    function keyDownHandler(any) {
        if(any.key == "Right" || any.key == "ArrowRight") {
            rightPressed = true
        }
        else if(any.key == "Left" || any.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(any) {
        if(any.key == "Right" || any.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(any.key == "Left" || any.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, ballSpeed,);
