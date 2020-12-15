"use strict";

document.addEventListener("DOMContentLoaded", ()=>{

const dino = document.querySelector("#dino");
let isJumping = false;
let gravity = 0.9;

   function control (event) {
      if (event.keyCode === 32){
         console.log('pressed');
         if (!isJumping){
            isJumping = true;
            jump();
         }
      }
   }
   document.addEventListener("keyup", control)
   let position = 0;

   function jump (){
      let count = 0;
      let timerID = setInterval(function(){
         // move down
         if (count === 15){
            clearInterval(timerID);
            console.log ('down');
            let downTimerId = setInterval(function(){
               if (count === 0) {
                  clearInterval(downTimerId);
                  isJumping = false;
               }
               position -= 5;
               count --;
               position = position *gravity;
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
      const obstacle = document.createElement('div');
      obstacle.classList.add("obstacle")
   }
}) 
