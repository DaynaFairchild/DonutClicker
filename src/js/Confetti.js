const canvas = document.getElementById('canvas'); 
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let donutBlue = new Image();
donutBlue.src = '/images/DonutBlue.png';
let donutCream = new Image();
donutCream.src = '/images/DonutCream.png';
let donutGlaze = new Image();
donutBlue.src = '/images/DonutGlaze.png';
let donutRainbow = new Image();
donutRainbow.src = '/images/DonutRainbow.png';
let donut = new Image();
donut.src = '/images/DonutBeforeClick.png';

let srcArray = ['/images/DonutBlue.png','/images/DonutCream.png','/images/DonutGlaze.png','/images/DonutRainbow.png','/images/DonutBeforeClick.png']

const maxSize = 200;

const gravity = -2;

let keepSpawning = false;

function randomIntFromInterval(min, max) {  
     return Math.floor(Math.random() * (max - min + 1) + min) 
    }

    
 class Particle{
     constructor(){
             this.x = Math.random() * canvas.width; // randomize this
             this.y = 0; 
             this.xMomentum = randomIntFromInterval(-3, 3) * Math.random(); 
             this.yMomentum = gravity;
             this.Image = srcArray[randomIntFromInterval(0,srcArray.length -1)]
             this.size = 3 * Math.max(Math.random(), .3);
        // opacity
     }
     draw(){
         context.globalAlpha = 1;
         donut.src = this.Image;
         context.drawImage(donut,this.x, this.y, this.size*30, this.size*30);
     }
     update(i){
         this.y -= this.yMomentum;
         this.x -= this.xMomentum;
         this.yMomentum -= .2;
         if(this.y - donut.height > canvas.height || this.x > canvas.width || this.x < 0 - donut.width){ // if donut is off the screen, remove it from the array
             particleArray.splice(i, 1);
         } else {
             this.draw();
         }
         console.log(particleArray.length);
     }
 }

 class BurstParticle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = randomIntFromInterval(-0, 0);
        this.yMomentum = randomIntFromInterval(-5,15) * Math.random();
        this.xMomentum = randomIntFromInterval(-10, 10) * Math.random(); 
        this.opacity = 1;
    }
    draw(){
        context.globalAlpha = this.opacity;
        this.opacity -= .01;
        this.opacity = Math.max(0, this.opacity);
        context.globalCompositeOperation = "destination-over";
        context.drawImage(altDonut, this.x, this.y, 40, 40);
    }
    update(i){
        this.y -= this.yMomentum;
        this.yMomentum -= Math.random()*.2;
        this.x += this.xMomentum;
        this.draw();
        if(this.y - donut.height - 100 > canvas.height || this.opacity == 0 || this.x > canvas.width || this.x < 0 - donut.width){
            //console.log("Off Screen!");
            particleArray.splice(i, 1)
        }
    }
}


 function init(){
     particleArray = [];
 }

 function animate(){
     requestAnimationFrame(animate);
     canvas.width = window.innerWidth - 44; // dynamically changes the width of the canvas
     canvas.height = window.innerHeight;
     //canvas.top = window.pageYOffset;
     context.clearRect(0,0,innerWidth, innerHeight);
     if(keepSpawning && particleArray.length < maxSize){
         particleArray.push(new Particle());
     }
     for(let i = 0; i < particleArray.length; i++){
         particleArray[i].update(i);
     }
 }

 
 function spawnManyParticles(){
         keepSpawning = !keepSpawning; 
  }    
  
function resetStyle(){
    canvas.style.zIndex = -1;
}

let styleInterval = null;

 function spawnBurst()
 {
     confettiYay();
         if(keepSpawning){
             keepSpawning = false;
             spawnInterval = null;
             styleInterval = null;
         }
         else{
             keepSpawning = true;
             canvas.style.zIndex = 3;
             spawnInterval = setTimeout(spawnManyParticles, 2000);
             styleInterval = setTimeout(resetStyle, 5000);
         }
 
 }
//creepy "yay" to play with confetti
 var yay = document.getElementById("yayAudio");

function confettiYay(){
    console.log("Played the yay audio!")
    yay.volume = 0.2;
    yay.play();
}

 init();
 animate();