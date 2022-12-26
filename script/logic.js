/* Created by Ying Tu */
/* Thanks for checking out my game */
/* Welcome to also visit my Linkedin and Github page */
/* Links are at the bottom of the game */

/* properties for the ball */
let x = 300;
let y = 150;
let rad = 50;
let color = "red";
let speed = speed_0 = 0;
let gravity = 1000;

/* properties for the score */
let score = -1;
let count_x = 20;
let count_y = 50;
let count_font = "bold 25px Arial";
let count_color = "black";

/* properties for the FPS */
let pastTime = 0;
let fps = 0;
let counter = 0;

/* control the flow of the game */
let pause = true;

window.onload = function() {
    /* reference for the elements on the webpage */
	let startBtn =	 document.getElementById("startBtn");
	let resetBtn = document.getElementById("resetBtn");

    const canvas = document.getElementById("canvas");
    width = canvas.width;
    height = canvas.height;
   
    let context =canvas.getContext("2d");
    context.font = count_font;
    
	/* key or touch event handler */
	document.onkeydown = function() {
		speed = -300;
    }
   
   
    document.ontouchstart = function() {
		speed = -300;
    }
 
    /* Click event handler */
    startBtn.onclick = function () {
   		if (pause) {
   			pause = false;
	   		window.requestAnimationFrame(draw);
   		}
    }
    resetBtn.onclick = function() {
		resetGame();
	  	pause = true;
   	}

    /* game logic */
	function drawCircle() {
  		context.beginPath();
   		context.arc(x, y, rad, 0, 2*Math.PI);
   		context.fillStyle=color;
   		context.fill();
	}

	function drawScore() {
		if (counter % 60 === 0){
			score += 1;
		}
		context.beginPath();
		context.fillStyle=count_color;
		context.fillText("Score: "+score,count_x,count_y);
	}
	
	function drawFPS(deltaTime=1000) {
		if (counter % 60 === 0) {
			fps = Math.round(1 / deltaTime);
		}
	   	context.beginPath();
		context.fillStyle=count_color;
		context.fillText("FPS: "+fps,500,50);
		
	}

	function moveBall(deltaTime) {
		speed_0 = speed;
		speed += gravity * deltaTime;
		y += (speed_0 + speed) * deltaTime * 0.5;
		if ((y <= -50)||(y>= 450)){
	   		resetGame();
	  		pause = true;
		}
	}
   
   function draw(currentTime) {
		context.clearRect(0,0,width,height);
		drawCircle();
   		
   		let deltaTime = (currentTime - pastTime) / 1000;
   		pastTime = currentTime;
   		
   		drawScore();
   		drawFPS(deltaTime);
		counter += 1;
   		
   		moveBall(deltaTime);
   		
   		if (!pause){
   		   window.requestAnimationFrame(draw);
   		}
   }
   
   /* functions for resetting the game */
   function resetBall() {
	   x = 300;
	   y = 150;
	   speed = speed_0 = 0;
	   score = 0;
   }
   
   function resetGame() {
	   resetBall();
	   context.clearRect(0,0,width,height);
	   drawCircle();
	   drawScore();
	   drawFPS();
   }
   resetGame();
   	
}
