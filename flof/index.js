
// TODO: add new levels

// export {draw};
// export {drawPaddle};
// export {drawBricks};
// export {collisionDetection};
// export {drawScore};
// export {nextLevel};

    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    // ball variables
    let ballRadius = 3;
    

    // that's some paddlin'
    let paddleHeight = 3;
    let paddleWidth = 100;
   
    let paddleX = (canvas.width-paddleWidth) / 2 + 20;
    let paddleFloat = 0;
    let paddleY = canvas.height-paddleHeight- paddleFloat;
    let paddleSpeed = 6;

    // ball start position; x & y are coordinates in general
    let x = canvas.width/2;
    let y = canvas.height-25;
    let xballtwo = canvas.width/2;
    let yballtwo = canvas.height-25;

    //directions
    let dx = 2;
    let dy = 2;
    let dxballtwo = 2;
    let dyballtwo = 2;

    // key events
    let rightPressed = false;
    let leftPressed = false;

    //ballcolor
    let randomNumber = Math.floor(Math.random()*10)
    let colorArray = ["blue", "yellow", "indigo", "brown", "grey", "green", "orange", "lilac", "purple", "pink", "gold"];
    let randomColor = colorArray[randomNumber];
  
    //scoreboard
    let score = 0;

    //brick variables
    let brickRowCount = 5;
    let brickColumnCount = 10;
    let brickWidth = 20;
    let brickHeight = 8;
    let brickPadding = 10;
    let brickOffsetTop = 10;
    let brickOffsetLeft = 30
    let bricks = [];


    // variables to point out what level the player is at  
    let level = 1;
    let gameOverCriteria = 1;

//functions
const draw = () => {  
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     
    drawPaddle(); 
    drawBricks(); 
    collisionDetection(); 
    drawScore();
    nextLevel();
   
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }  
        // gameover $$ bounce on paddle   
    else if(y + dy > canvas.height - ballRadius) { 
        
                //if bounce on left side paddle
        if(x > paddleX && x < paddleX + (paddleWidth*0.4)) {
                dy = -dy;
                dx = dx - 1.2

                //if bounce on center of paddle
        }if (x > paddleX + (paddleWidth*0.4) && x < paddleX + (paddleWidth*0.6)){
                dy= -dy;
                dx= 0;

                //if bounce on right side paddle
        }if (x >paddleX + (paddleWidth*0.6) && x < paddleX + paddleWidth){
                dy = -dy;
                dx = dx + 1.2
                 // game over   
        }if (y + dy > canvas.height - ballRadius + paddleHeight){
            gameOverCriteria-- 
                if (gameOverCriteria == 0){
                    gameOver();
                }
        } 
    }
    x += dx;
    y += dy;

    //paddle movement
    if(rightPressed) {
        paddleX += paddleSpeed;
        if (paddleX + paddleWidth > canvas.width){
            paddleX= canvas.width-paddleWidth
        }
    } else if(leftPressed) {
        paddleX -= paddleSpeed;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    

}

const drawBall = () => {
    requestAnimationFrame(drawBall);
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = randomColor;
    ctx.fill();
    ctx.closePath();
}

const drawBallTwo = () => {
   
    requestAnimationFrame(drawBallTwo);
    
    gameOverCriteria = 2;

    ctx.beginPath();
    ctx.arc(xballtwo, yballtwo, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    collisionDetection();
    gameWin();

    if (xballtwo + dxballtwo > canvas.width - ballRadius || xballtwo + dxballtwo < ballRadius) {
        dxballtwo = -dxballtwo;
    }
    if (yballtwo + dy < ballRadius) {
        dyballtwo = -dyballtwo;
    }  
        // gameover $$ bounce on paddle   
    else if(yballtwo + dyballtwo > canvas.height - ballRadius) { 
        
                //if bounce on left side paddle
        if(xballtwo > paddleX && xballtwo < paddleX + (paddleWidth*0.4)) {
                dyballtwo = -dyballtwo;
                dxballtwo = dxballtwo - 1.2

                //if bounce on center of paddle
        }if (xballtwo > paddleX + (paddleWidth*0.4) && xballtwo < paddleX + (paddleWidth*0.6)){
                dyballtwo= -dyballtwo;
                dxballtwo= 0;

                //if bounce on right side paddle
        }if (xballtwo > paddleX + (paddleWidth*0.6) && xballtwo < paddleX + paddleWidth){
                dyballtwo = -dyballtwo;
                dxballtwo = dxballtwo + 1.2
                 // game over   
        }if (yballtwo + dyballtwo > canvas.height - ballRadius + paddleHeight){
                gameOverCriteria-- 
                if (gameOverCriteria == 0){
                    gameOver();
                }
        } 

    }
    xballtwo += dxballtwo;
    yballtwo += dyballtwo;

}

const collisionDetection = () => {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            // important line - check if bricks != 0, else bricks is just invis but collision  still happens
            if(bricks[c][r].status > 0){   

                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }   if (xballtwo > b.x && xballtwo < b.x+brickWidth && yballtwo > b.y && yballtwo < b.y+brickHeight) {
                    dyballtwo = -dyballtwo;
                    b.status = 0;  
                    score++;
                }
        }
    }
}
}

const bricksArray = () =>{
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

const drawBricks = () => {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = randomColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

const nextLevel = () => {
        if (score > 30 && level == 1) {
            drawChallenge();
            setTimeout(() => {
                paddleWidth = 60 ;
            }, 1000);
            
    } 
}

const gameOver = () => {
                document.querySelector(".startButton").style.display = "inline";
                document.querySelector(".gameOverBanner").style.display = "inline";
                document.querySelector(".homeButtonTwo").style.display = "none";
                document.querySelector("#myCanvas").style.opacity="0.0001";
}

const gameWin = () => {
    if (score == brickRowCount * brickColumnCount){
        let level = 2
        if (level == 2) {
                level = 2;
                alert("You.. you actually did it.. Not bad for a rookie!");
        } 
    }
}

const keyDownHandler = (any) => {
    if(any.key == "Right" || any.key == "ArrowRight" || any.key == "d") {
        rightPressed = true
    }
    else if(any.key == "Left" || any.key == "ArrowLeft" || any.key == "a") {
        leftPressed = true;
    }
    else if (any.key== "p") {
        alert("Take a break, Bricker.")
        
    }
}

const keyUpHandler = (any) => {
    if(any.key == "Right" || any.key == "ArrowRight" || any.key == "d") {
        rightPressed = false;
    }
    else if(any.key == "Left" || any.key == "ArrowLeft"|| any.key == "a") {
        leftPressed = false;
    }
}

const drawScore = () => {
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 5, 145);
}

const drawChallenge = () => {
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(" It would be a shame if your paddle got smaller...", 5, 100)
}

instructions = () => {
ctx.font = "12px Arial";
ctx.fillStyle = "white";
ctx.fillText("press 'play' to start" , 50, 45);

ctx.font = "12px Arial";
ctx.fillStyle = "white";
ctx.fillText("press 'p' to pause" , 50, 70);

ctx.font = "12px Arial";
ctx.fillStyle = "white";
ctx.fillText("press 'arrow keys' to move paddle" , 50, 95);    
}

document.querySelector(".homeButtonTwo").addEventListener("click", 
    start = () => { 
window.requestAnimationFrame(draw);
window.requestAnimationFrame(drawBall);
window.requestAnimationFrame(drawBallTwo)

    }
)

// functions that need to be called before draw
bricksArray();
instructions();

//event listeners controls
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//const reset = () => {
//    location.reload();
//}