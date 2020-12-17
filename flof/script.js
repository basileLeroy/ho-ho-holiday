// TODO: import pause button (alert("your game is now paused") when you push 'p' or 'F3' key )
// TODO: import colour change on paddle hit (do +1 on array index)

    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    // ball variables
    let ballRadius = 3;
    let ballSpeed = 100000000000000000;

    // that's some paddlin'
    let paddleHeight = 3;
    let paddleWidth = 75;
    let paddleX = (canvas.width-paddleWidth) / 2;
    let paddleFloat = 0;
    let paddleY = canvas.height-paddleHeight- paddleFloat;
    let paddleSpeed = 6;

    // ball start position; x & y are coordinates in general
    let x = canvas.width/2;
    let y = canvas.height-25;

    //directions
    let dx = 2;
    let dy = 2;

    // key events
    let rightPressed = false;
    let leftPressed = false;

    //ballcolor
    let randomNumber = Math.floor(Math.random()*10)
    let colorArray = ["blue", "yellow", "indigo", "brown", "grey", "green", "orange", "lilac", "purple", "pink", "gold"];
    let randomColor = colorArray[randomNumber];console.log(randomColor);
    //draw ball interval
    
   

    //brick variables
    let brickRowCount =5;
    let brickColumnCount = 10;
    let brickWidth = 20;
    let brickHeight = 8;
    let brickPadding = 10;
    let brickOffsetTop = 10;
    let brickOffsetLeft = 30
    let bricks = [];

setInterval(draw, ballSpeed,);


function bricksArray(){
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = randomColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {  
console.log("wss nie")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(); 
    drawPaddle(); 
    drawBricks(); 
    collisionDetection(); 
    
   
    if (bricks.status == 0)
    { document.querySelector(".welcomeBanner").style.display = "none"; }

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
                dx = dx - 1.5

                //if bounce on center of paddle
        }if (x > paddleX + (paddleWidth*0.4) && x < paddleX + (paddleWidth*0.6)){
                dy= -dy;
                dx= 0;

                //if bounce on right side paddle
        }if (x >paddleX + (paddleWidth*0.6) && x < paddleX + paddleWidth){
                dy = -dy;
                dx = dx + 1.5
                 // game over
        }if (y + dy > canvas.height - ballRadius + paddleHeight){
           
                document.querySelector(".startButton").style.display = "inline";
                document.querySelector(".gameOverBanner").style.display = "inline";
                return
                
                // document.location.reload(); 
                // clearInterval(interval); 
        } 
    }
    x += dx;
    y += dy;

    //paddle inprenetratable borders
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

 document.querySelector(".homeButtonTwo").addEventListener("click", 
    function startBall() {
    ballSpeed = 25;
    console.log(ballSpeed)
    setInterval(draw, ballSpeed,);
    }
)

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
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

function keyDownHandler(any) {
    if(any.key == "Right" || any.key == "ArrowRight" || any.key == "d") {
        rightPressed = true
    }
    else if(any.key == "Left" || any.key == "ArrowLeft" || any.key == "a") {
        leftPressed = true;
    }
}

function keyUpHandler(any) {
    if(any.key == "Right" || any.key == "ArrowRight" || any.key == "d") {
        rightPressed = false;
    }
    else if(any.key == "Left" || any.key == "ArrowLeft"|| any.key == "a") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            // important line - check if bricks != 0, else bricks is just invis but collision  still happens
            if(bricks[c][r].status > 0){   
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
               
              
                //splice?

                //bricks[c][r] = { x: 0, y: 0, status: 0 };

                // for(let c=0; c<brickColumnCount; c++) {
                //     bricks[c] = [];
                //     for(let r=0; r<brickRowCount; r++) {
                //         bricks.splice({ x: 0, y: 0, status: 1 })
                //     }
                // }
        }
    }
}
}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

bricksArray();

