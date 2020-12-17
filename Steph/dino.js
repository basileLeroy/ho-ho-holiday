"use strict";

document.addEventListener("DOMContentLoaded", () => {
   const dino = document.querySelector(".dino");
   const grid = document.querySelector(".grid");
   const gameOver = document.getElementById("gameOver");
   const scorePlayer = document.querySelector(".scorePlayer");
   const currentScore = document.getElementById("currentScore");
   const jumpSound = document.querySelector("#jump-sound");
   const gameOverSound = document.querySelector("#game-over-sound");
   // const highScore = document.createElement('div');

   let isJumping = false;
   let positionDino = 0;
   let gravity = 0.9;
   let isGameOver = false;
   let score = 0;
   let highScore = 0;
   let startTime = new Date();

   function control (event) {
      if (event.keyCode === 32) {
         //when spacebar is pressed: if isJumping is false, set isJumping to true and let jump happen
         if (!isJumping) {
            isJumping = true;
            jump();
            jumpSound.play();
         }
      }
   }
   // execute control when the spacebar has been pressed
   document.addEventListener("keydown", control);

   function jump () {
      let count = 0;
      let timerID = setInterval(function(){
         // move down
         if (count === 18){
            clearInterval(timerID);
            let downTimerId = setInterval(function(){
               if (count === 6 ) {
                  clearInterval(downTimerId);
                  isJumping = false;
               }
               positionDino -= 5; 
               count --;
               positionDino = positionDino * gravity;
               dino.style.bottom = positionDino +'px';      
            },20); 
         } 
         // move up 
         console.log('up');
         count ++;
         positionDino += 30;
         positionDino = positionDino * gravity;
         dino.style.bottom = positionDino + 'px';
      },20)
   }

      
   function generateObstacles () { 

      let obstaclePosition = grid.clientWidth - 50; //length canvas
      // TODO make random blocks not too close to eachother
      let randomTime = Math.random()*6000;
      const obstacle = document.createElement('div');

      if (!isGameOver) {
         obstacle.classList.add("obstacle");
      }
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';

      let timerId = setInterval(function(){
         getScore();

         const collisionDino = obstaclePosition > 0 && obstaclePosition < 100 && positionDino < 100;
         if (collisionDino){
            gameOver.innerHTML = 'Game over';
            grid.style.backgroundImage = 'none';

            currentScore.innerHTML = score;

            isGameOver = true;
            gameOverSound.play();
            while (grid.firstChild) { 
               grid.removeChild(grid.lastChild);
            } 
            grid.appendChild(gameOver);
            // TODO set score after game
            const scoreAfterGame = document.createElement('p');
            grid.appendChild(scoreAfterGame);
            scoreAfterGame.classList.add("endScore");
            scoreAfterGame.innerHTML = 'score: '+ score;
            
            clearInterval(timerId);

         }    

         const obstaclePassed = obstaclePosition <= 0;
         if (obstaclePassed) {
            obstacle.remove();
         }
         obstaclePosition -= 10  ;
         obstacle.style.left = obstaclePosition + 'px';
         // TODO return isGameOver
      }, 20)
      console.log(isGameOver);

      if (!isGameOver){
         setTimeout(generateObstacles, randomTime);
      }
   }

generateObstacles();



   // get seconds from first game start
   function getScore () {  
      score += Math.round((new Date() - startTime)/1000);
      currentScore.innerHTML = score;
   }
// TODO when game over: clear score and log score to array for Highscore
if (isGameOver) {
   // TODO push to array for highscore
   highScoreValues.push(score);
   console.log(score)
}
}) 


