const makedonut = document.getElementsByClassName("donut")[0];
const buyBaker = document.getElementsByClassName("baker")[0];
const buyNewOven = document.getElementsByClassName("newOven")[0];
const numberOfDonutsDisplay = document.getElementsByClassName("numberOfDonutsDisplay")[0];
const currentNumberOfBakers = document.getElementsByClassName("currentNumberOfBakers")[0];
const currentNumberOfOvens = document.getElementsByClassName("currentNumberOfOvens")[0];
const currentBakerPrice = document.getElementsByClassName("currentBakerPrice")[0];
const currentNewOvenPrice = document.getElementsByClassName("currentNewOvenPrice")[0];
const newGame = document.getElementById("newGame");

let refreshPageIntervalID = setInterval(update, 500);

const myDonut = new DonutShop();

    makedonut.addEventListener("click", function(){
          
    myDonut.donutOnClick();
    playDonutDing();
    if(!myDonut.spoilHasRun && myDonut.getDonutCount() >= 100){
        on();
        myDonut.spoilHasRun = true;
    }
    myDonut.spoilDonut();
    numberOfDonutsDisplay.innerText = myDonut.getDonutCount();
        
    });

    buyBaker.addEventListener("click", function(){  
    myDonut.buyBakerOnClick();
    playMeow();
    currentNumberOfBakers.innerText = myDonut.getBakerCount();
    currentBakerPrice.innerText = myDonut.priceForBaker();
    myDonut.startBakerInterval();
    });

    buyNewOven.addEventListener("click", function(){
    myDonut.buyNewOvenOnClick();
    playOvenDing();
    currentNumberOfOvens.innerText = myDonut.getNewOvenCount();
    currentNewOvenPrice.innerText= myDonut.priceForNewOven();
   
    });
   
    newGame.addEventListener("click", function(){
        myDonut.resetGame();
    });


    

 function changeImg()
 {
     var image= document.getElementById('donutImg');
     if (image.src.match("/images/DonutBeforeClick.png")){
         image.src="/images/DonutOnClick.png";  
    }
    else{
        image.src="/images/DonutBeforeClick.png"
     } 
 }

 var timer1 = setInterval(changeImg(), 1000);

    //  function stop(){
//         clearInterval(timer1);
    //      } 
    //setTImeout(,2000)      potentially

let bakerAnim = false;
let bakerTimer = null;
function changeImg2()
{
    var image = document.getElementById('bakerGif');
    if(!bakerAnim){ // animation is not playing
        image.src="/images/CatClickNoLoop.gif";
        bakerAnim = true;
        bakerTimer = setTimeout(changeImg2, 2000);  
    } else {
        image.src="/images/catBakerGif.gif"
        bakerAnim = false;
        bakerTimer = null;
    }
}

let ovenAnim = false;
let ovenTimer = null;
function changeImg3()
{
    var image = document.getElementById('newOvenImg');
    if(!ovenAnim){ // animation is not playing
        image.src="/images/NewOvenClickNoLoop.gif";
        ovenAnim = true;
        ovenTimer = setTimeout(changeImg3, 2000);  
    } else {
        image.src="/images/NewOven.png"
        ovenAnim = false;
        ovenTimer = null;
    }
}

function update()
{
    currentNumberOfOvens.innerText = myDonut.getNewOvenCount();
    numberOfDonutsDisplay.innerText = myDonut.getDonutCount();
    currentNumberOfBakers.innerText = myDonut.getBakerCount();
    currentNewOvenPrice.innerText= myDonut.priceForNewOven;
    currentBakerPrice.innerText = myDonut.priceForBaker;
    checkBakerButton();
    checkOvenButton();
}

function checkBakerButton()
{
if (myDonut.donutCount >= myDonut.priceForBaker){
    buyBaker.disabled = false;
}
else{
    buyBaker.disabled = true;
}
}
function checkOvenButton()
{
if (myDonut.donutCount >= myDonut.priceForNewOven){
    buyNewOven.disabled = false;
}
else{
    buyNewOven.disabled = true;
}
}

function catAudio(url){
    new Audio(url).play();
}

function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }

    
    var ding = new Audio();
    ding.src="/images/ding.mp3";
    var donutDing = new Audio();
    donutDing.src = "/images/donutDing.flac"

    function bakerBtnSound(){
        meow.volume = 0.1;
        meow.play();
    }
    function ovenBtnSound(){
        ding.volume = 0.1;
        ding.play();
    }
    function donutBtnSound(){
        donutDing.volume = 0.1;
        donutDing.play();
    }

    var meow = document.getElementById("bakerClickAudio");

    function playMeow(){
        meow.play();
    }

    var ding = document.getElementById("ovenClickAudio");

    function playOvenDing(){
        ding.play();
    }

    var donutDing = document.getElementById("donutClickAudio");

    function playDonutDing(){
        donutDing.play();
    }




