const RestartGame = document.querySelector('#GameResult');
const RestartButton = document.querySelector('.START-BUTTON');
const PressStart = document.querySelector('#pressStart');

class Vector {
    constructor(x = 0, y = 0) {

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

// Creating the player (shown as a rectangle bar)
class Player extends Rectangle {
    constructor() {
        super(7, 40);
        this.score = 0;
    }
}

// Making pong into a class
class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._canvasContext = canvas.getContext('2d');

        this.ball = new Ball
        // console.log(ball);

        // Adding players to the game:
        this.Players = [
            new Player,
            new Player,
        ];

        this.Players[0].position.x = 20;
        this.Players[1].position.x = this._canvas.width - 20;
        this.Players.forEach(player => {
            player.position.y = this._canvas.height / 2;
        })

        PressStart.style.left = this._canvas.width / 2;
        PressStart.style.top = this._canvas.height / 2;

        let lastTime;
        const callbackTime = (milliseconds) => {
            if (lastTime) {
                this.Update((milliseconds - lastTime) / 1000);
            }
            lastTime = milliseconds;
            requestAnimationFrame(callbackTime)
        }
        callbackTime();

        this.numberPixel = 5;
        this.scoreNumbers = [
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111',
        ].map(String => {
            const canvas = document.createElement('canvas');
            canvas.height = this.numberPixel * 5;
            canvas.width = this.numberPixel * 3;
            const canvasContext = canvas.getContext('2d');
            canvasContext.fillStyle = '#fff';

            String.split('').forEach((fill, i) => {
                if (fill === '1') {
                    canvasContext.fillRect(
                        (i % 3) * this.numberPixel, 
                        (i / 3 | 0) * this.numberPixel, 
                        this.numberPixel, 
                        this.numberPixel
                    )
                };
            });
            return canvas
        })
        this.Reset();
    }

    collide(Player, ball) {
        if (Player.left < ball.right && Player.right > ball.left && Player.top < ball.bottom && Player.bottom > ball.top) {
            ball.velocity.x = -ball.velocity.x;
        }
    }

    draw() {
        // Canvas color
        this._canvasContext.fillStyle = '#0707F4';
        this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
    
        // Telling drawRectangle to draw the ball here:
        this.drawRectangle(this.ball)

        this.drawScore();

        // Drawing the players:
        this.Players.forEach(player => this.drawRectangle(player));
    }

    drawScore = () => {
        const alignScores = this._canvas.width / 3;
        const numberWidth = this.numberPixel * 4;

        this.Players.forEach((player, index) => {
            const numbers = player.score.toString().split('');
            const offsetLeft = alignScores * (index + 1) - (numberWidth * numbers.length / 2) + this.numberPixel / 2;
            numbers.forEach((number, position) => {
                this._canvasContext.drawImage(this.scoreNumbers[number|0], offsetLeft + position * numberWidth, 20);
            });
        });
    }

    drawRectangle(Rectangle) {
        this._canvasContext.fillStyle = '#fff';
        this._canvasContext.fillRect(Rectangle.left, Rectangle.top, Rectangle.size.x, Rectangle.size.y);
    }

    // When called upon, it will reset the ball to the starting point
    Reset = () => {
        this.ball.position.x = this._canvas.width / 2;
        this.ball.position.y = this._canvas.height / 2;

        this.ball.velocity.x = 0;
        this.ball.velocity.y = 0;

        if (this.Players[1].score >= 5 ) {
            RestartGame.style.display = "block"

            RestartButton.addEventListener('click', () => {
                location.reload();
            })
            console.log("Game Over!");
        }
    }

    StartBall = () => {

        // "If the ball doesn't move"
        if (this.ball.velocity.x === 0 && this.ball.velocity.y === 0) {

            this.ball.velocity.x = 250 * (Math.random() > .5 ? 1 : -1);
            this.ball.velocity.y = 50 * (Math.random() * 2) + 150;
        }
        console.log(this.ball.velocity.y);
    }

    Update = (updateTime) => {
        this.ball.position.x += this.ball.velocity.x * updateTime;
        this.ball.position.y += this.ball.velocity.y * updateTime;
    
        // when the position of the ball goes over the x value of 0, the movement will go negative. idem dito with the Y-axis
        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            const playerID = this.ball.velocity.x < 0 | 0;
            this.Players[playerID].score++;
            console.log(playerID);

            // Calling the reset if the ball touches the left or right side
            this.Reset(); 
        }
        

        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.velocity.y = -this.ball.velocity.y;
        }

        // Making the AI follow the ball (y-axis):
        this.Players[1].position.y = this.ball.position.y;

        this.Players.forEach(player => this.collide(player, this.ball));

        // Calling draw into the updating function
        this.draw();
    }
}

// Accessing canvas
const canvas = document.querySelector('#pongCanvas');
const pong = new Pong(canvas);

const spaceBar = (space) => {
    if (space.keyCode == 32) {
        pong.StartBall();
        PressStart.style.display = 'none';
    }
};

// Adding eventListeners to move the player on the canvas:
canvas.addEventListener('mousemove', action => {
    const scaleMouse = action.offsetY / action.target.getBoundingClientRect().height

    pong.Players[0].position.y = canvas.height * scaleMouse
});

// Keypress is not part of canvas nessessairly, better to use document instead
document.addEventListener('keypress', spaceBar);