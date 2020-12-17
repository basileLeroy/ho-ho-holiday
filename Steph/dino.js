"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
   const dino = document.querySelector(".dino");
   const grid = document.querySelector(".grid");
   const gameOver = document.getElementById("gameOver");
   const scorePlayer = document.querySelector(".scorePlayer");
   const currentScore = document.getElementById("currentScore");
   let isJumping = false;
   let positionDino = 0;
   let gravity = 0.9;
   let isGameOver = false;
   let score = 0;
   let highScoreValues = [];
   let startTime = new Date();
// console.log(startTime);

   grid.appendChild(scorePlayer);

   function control (event) {
      if (event.keyCode === 32){
         //when spacebar is pressed: if isJumping is false, set isJumping to true and let jump happen
         if (!isJumping){ 
            isJumping = true;
            jump();
         }
      }
   }
   // execute control when the spacebar has been pressed
   document.addEventListener("keydown", control);

   function jump (){
      let count = 0;
      let timerID = setInterval(function(){
         // move down
         if (count === 15){
            clearInterval(timerID);
            let downTimerId = setInterval(function(){
               if (count === 0) {
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
      const highScore = document.createElement('div');

      if (!isGameOver) {
         obstacle.classList.add("obstacle");
      }
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';

      let timerId = setInterval(function(){
         getScore();
         const collisionDino = obstaclePosition > 0 && obstaclePosition < 60 && positionDino < 60;
         const obstaclePassed = obstaclePosition <= 0;
         if (collisionDino){
            clearInterval(timerId);
            // highScore.classList.add("highscore");
            gameOver.innerHTML = 'Game over';
            grid.style.backgroundImage = 'none';
            // grid.appendChild(highScore);

            currentScore.innerHTML = Math.round(score);

            isGameOver = true;
            while (grid.firstChild) { 
               grid.removeChild(grid.lastChild);
            } 
            grid.appendChild(gameOver);
         }    
         if (obstaclePassed) {
            obstacle.remove();
         }
         obstaclePosition -= 10  ;
         obstacle.style.left = obstaclePosition + 'px';
         // TODO return isGameOver
      }, 20)
   
      if (!isGameOver){
         setTimeout(generateObstacles, randomTime);
      }
   }

generateObstacles();

// TODO set score
   // get seconds from first game start
   function getScore () {   
      score += (new Date() - startTime)/1000;
      currentScore.innerHTML = Math.round(score);
   
      if (isGameOver) {
         // TODO push to array for highscore
         highScoreValues.push(score);
         console.log(highScoreValues);
      }
   }
// TODO when game over: clear score and log score to array for Highscore

}) 


