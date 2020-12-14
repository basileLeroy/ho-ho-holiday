class Vector {
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(w, h)
    {
        this.position = new Vector;
        this.size = new Vector(w, h);
    }
}

class Ball extends Rectangle {
    constructor()
    {
        super(5, 5);
        this.velocity = new Vector
    }
}

// Accessing canvas
const canvas = document.querySelector('#pongCanvas');
const canvasContext = canvas.getContext('2d');

const ball = new Ball
// console.log(ball);
ball.velocity.x = 100;
ball.velocity.y = 100;

let lastTime;

callbackTime = (milliseconds) => {
    if (lastTime) {
        Update((milliseconds - lastTime) / 1000);
    }
    lastTime = milliseconds;

    requestAnimationFrame(callbackTime)
}

Update = (updateTime) => {
    ball.position.x += ball.velocity.x * updateTime;
    ball.position.y += ball.velocity.y * updateTime;

    if (ball.position.x < 0 || ball.position.x > canvas.width) {
        ball.velocity.x = -ball.velocity.x;
    }
    if (ball.position.y < 0 || ball.position.y > canvas.height) {
        ball.velocity.y = -ball.velocity.y;
    }

    // Canvas color
    canvasContext.fillStyle = '#000';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Ball color
    canvasContext.fillStyle = '#fff';
    canvasContext.fillRect(ball.position.x, ball.position.y, ball.size.x, ball.size.y);
}

callbackTime();