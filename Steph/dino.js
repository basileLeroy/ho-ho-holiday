"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
   const dino = document.querySelector(".dino");
   const grid = document.querySelector(".grid");
   const gameOver = document.getElementById("alert");
   let isJumping = false;
   let position = 0;
   let gravity = 0.9;
   let isGameOver = false;



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
               position -= 5;
               count --;
               position = position * gravity;
               dino.style.bottom = position +'px';      

            },20);
         }
         // move up 
         console.log('up');
         count ++;
         position += 30;
         position = position * gravity;
         dino.style.bottom = position + 'px';
      },20)
   }

   function generateObstacles () {
      let obstaclePosition = 1000;
      let randomTime = Math.random()*4000;
      const obstacle = document.createElement('div');

      if (!isGameOver) {
         obstacle.classList.add("obstacle");
      }
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';

      let timerId = setInterval(function(){
         if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
            clearInterval(timerId);
            gameOver.innerHTML = 'Game over';
            isGameOver = true;
            // while (grid.firstChild) {
            //    grid.removeChild(grid.lastChild);
            // }
         }    
         obstaclePosition -= 10;
         obstacle.style.left = obstaclePosition + 'px';
      }, 20)

      if (!isGameOver){
         setTimeout(generateObstacles, randomTime);
      }
   }

generateObstacles();

}) 

