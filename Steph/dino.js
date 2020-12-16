"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
   // TODO create game canvas
   const canvas = document.querySelector("canvas");
   const context = canvas.getContext('2d');
   const dino = document.querySelector(".dino");
   const grid = document.querySelector(".grid");
   const alert = document.getElementById("alert");
   let isJumping = false;
   let position = 0;
   let gravity = 0.9;
   let isGameOver = false;

   // TODO create game canvas
   function draw () {
      context.beginPath();
   }

   function control (event) {
      if (event.keyCode === 32){
         // console.log('pressed');
         if (!isJumping){
            isJumping = true;
            jump();
         }
      }
   }

   document.addEventListener("keyup", control);

   function jump (){
      let count = 0;
      let timerID = setInterval(function(){
         // move down
         if (count === 15){
            clearInterval(timerID);
            // console.log ('down');
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
            alert.innerHTML = 'Game over';
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

