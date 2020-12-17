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

      if (!isGameOver) {
         obstacle.classList.add("obstacle");
      }
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';

      let timerId = setInterval(function(){
         const collisionDino = obstaclePosition > 0 && obstaclePosition < 60 && positionDino < 60;
         const obstaclePassed = obstaclePosition <= 0;
         if (collisionDino){
            clearInterval(timerId);
            gameOver.innerHTML = 'Game over';
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
         if (obstaclePosition === 0){
            grid.removeChild(grid.firstChild);
         }
         return isGameOver
      }, 20)
   
      if (!isGameOver){
         setTimeout(generateObstacles, randomTime);
      }
   }

generateObstacles();

// TODO set score
   // TODO get seconds from first game start
   function getScore () {   
      score += (new Date() - startTime)/1000;

      if (isGameOver) {
         console.log(score/1000 + 'Seconds');
      }
      return score;
   }
   currentScore.innerHTML = score;
   console.log (getScore(score));
   getScore();
               // TODO when game over: clear score and log score to array for Highscore

}) 


