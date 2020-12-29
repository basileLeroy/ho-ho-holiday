"use strict";

document.addEventListener("DOMContentLoaded", () => {
   const dino = document.querySelector(".dino");
   const grid = document.querySelector(".grid");
   const gameOver = document.getElementById("gameOver");
   const currentScore = document.getElementById("currentScore");
   const jumpSound = document.querySelector("#jump-sound");
   const gameOverSound = document.querySelector("#game-over-sound");
   const RestartButton = document.querySelector('.restart');
   const scoreStorage = window.localStorage;
   // const highScore = document.createElement('div');

   let isJumping = false;
   let positionDino = 0;
   let gravity = 0.9;
   let isGameOver = false;
   let score = 0;
   let highscore = 0; //TODO display highscore
   let startTime = new Date();

   // highscore from local storage, when there is a highscore
   if (localStorage.getItem('highscore')) {
      highscore = localStorage.getItem('highscore');
    }

   const control = (event) => {
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

   const jump = () => {
      let count = 0;
      let timerID = setInterval(() => {
         // move down
         if (count === 18){
            clearInterval(timerID);
            let downTimerId = setInterval(() => {
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
         count ++;
         positionDino += 30;
         positionDino = positionDino * gravity;
         dino.style.bottom = positionDino + 'px';
      },20)
   }

      
   const generateObstacles = () => { 

      let obstaclePosition = grid.clientWidth - 50; //length canvas
      // TODO make random blocks not too close to eachother (add minimum time and have random on top of this value)
      let randomTime = Math.random()*6000;
      const obstacle = document.createElement('div');

      if (!isGameOver) {
         obstacle.classList.add("obstacle");
      }
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';

      let timerId = setInterval(() => {
         getScore();

         const collisionDino = obstaclePosition > 0 && obstaclePosition < 100 && positionDino < 100;
         if (collisionDino){
            gameOver.innerHTML = 'Game over';
            grid.style.backgroundImage = 'none';

            currentScore.innerHTML = score;

            isGameOver = true;
            gameOverSound.play();
            while (grid.firstChild) { 
               // grid.removeChild(grid.firstChild);
               grid.innerHTML = '';
            } 

            grid.appendChild(gameOver);
            // TODO set highscore 
            const highscoreAfterGame = document.createElement('p');
            grid.appendChild(highscoreAfterGame);
            highscoreAfterGame.classList.add("endHighscore");
            highscoreAfterGame.innerHTML = 'highscore: '+ highscore;

            // set score after game
            const scoreAfterGame = document.createElement('p');
            grid.appendChild(scoreAfterGame);
            scoreAfterGame.classList.add("endScore");
            scoreAfterGame.innerHTML = 'score: '+ score;
            scoreStorage.setItem('highscore', score);
            console.log(scoreStorage);

            clearInterval(timerId);

         }    

         const obstaclePassed = obstaclePosition <= 0;
         if (obstaclePassed) {
            obstacle.remove();
         }
         obstaclePosition -= 10  ;
         obstacle.style.left = obstaclePosition + 'px';
         //TODO doesnt work
         return isGameOver
      }, 20)
      // console.log(isGameOver);

      if (!isGameOver){
         setTimeout(generateObstacles, randomTime);
      }

      if (isGameOver = true) {
         RestartButton.style.display = 'block';

         RestartButton.addEventListener("click", () =>{
            location.reload();
         });
      }
      
   }
   generateObstacles();
      // console.log(isGameOver);
// TODO restart button
   // get seconds from first game start
   const getScore = () => {  
      score += Math.round((new Date() - startTime)/1000);
      currentScore.innerHTML = score;
    }



})  
