class Vector {
    constructor(x = 2, y = 12) {

        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(w, h) {

        this.position = new Vector;
        this.size = new Vector(w, h);
    }

    get left() {
        return this.position.x - this.size.x / 2;
    }
    get right() {
        return this.position.x + this.size.x / 2;
    }
    get top() {
        return this.position.y - this.size.y / 2;
    }
    get bottom() {
        return this.position.y + this.size.y / 2;
    }
}

class Ball extends Rectangle {
    constructor() {

        super(5, 5);
        this.velocity = new Vector
    }
}

// Making pong into a class
class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._canvasContext = canvas.getContext('2d');

        this.ball = new Ball
        // console.log(ball);
        this.ball.position.x = 100;
        this.ball.position.y = 20;

        this.ball.velocity.x = 100;
        this.ball.velocity.y = 100;

        let lastTime;
        const callbackTime = (milliseconds) => {
            if (lastTime) {
                this.Update((milliseconds - lastTime) / 1000);
            }
            lastTime = milliseconds;
            requestAnimationFrame(callbackTime)
        }
        callbackTime();
    }

    draw() {
        // Canvas color
        this._canvasContext.fillStyle = '#000';
        this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
    
        // Telling drawRectangle to draw the ball here:
        this.drawRectangle(this.ball)
    }

    drawRectangle(Rectangle) {
        this._canvasContext.fillStyle = '#fff';
        this._canvasContext.fillRect(Rectangle.position.x, Rectangle.position.y, Rectangle.size.x, Rectangle.size.y);
    }

    Update = (updateTime) => {
        this.ball.position.x += this.ball.velocity.x * updateTime;
        this.ball.position.y += this.ball.velocity.y * updateTime;
    
        // when the position of the ball goes over the x value of 0, the movement will go negative. idem dito with the Y-axis
        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            this.ball.velocity.x = -this.ball.velocity.x;
        }
        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.velocity.y = -this.ball.velocity.y;
        }

        // Calling draw into the updating function
        this.draw();
    }
}

// Accessing canvas
const canvas = document.querySelector('#pongCanvas');
const pong = new Pong(canvas);