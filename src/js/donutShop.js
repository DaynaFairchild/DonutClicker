class DonutShop {
    constructor(){
        this.resetGame();
    }

resetGame(){
        this.donutCount= 0;
        this.newOvenCount= 0;
        this.bakerCount= 0;
        this.donutsEarned= 1;
        clearInterval(this.bakerIntervalID);
        this.bakerIntervalID = undefined;
        clearInterval(this.spoilIntervalID);
        this.spoilIntervalID = undefined;
        this.priceForBaker= 50;
        this.priceForNewOven= 100;
        this.spoilHasRun = false;
    }

    getDonutCount(){
        
      return Math.round(this.donutCount);

    }
    donutOnClick(){
        this.donutCount += this.donutsEarned;
    }
    getBakerCount(){
        return this.bakerCount;
    }
    buyBakerOnClick(){
        if(this.donutCount >= this.priceForBaker) 
        {
            this.donutCount -= this.priceForBaker;
            this.bakerPriceIncrease();
            this.bakerCount += 1;
            if (this.bakerIntervalID == undefined){
            this.bakerIntervalID = self.setInterval(this.bakerAutoClick, 1000);
            }
        }
        //Add a popup warning informing the player that they do not have enough donuts
    }
    bakerAutoClick = () => {
        this.donutCount += this.donutsEarned * this.bakerCount;
    }

    runSpoilDonut = () => {
        if(this.donutCount < 100)
        {
            clearInterval(this.spoilIntervalID);
            this.spoilIntervalID = undefined;
        }
        else{
            this.donutCount -= this.donutCount *.2;
        }
         //20% removed/go bad
    }
    
    spoilDonut()
    {
       
        if(this.donutCount >= 100 && this.spoilIntervalID == undefined){
            this.spoilIntervalID = self.setInterval (this.runSpoilDonut, 5000); 
        }  
    }
   

    bakerPriceIncrease(){
        this.priceForBaker *= 1.1;
        this.priceForBaker = this.priceForBaker.toFixed(2);
    }

   
    getNewOvenCount(){
    return this.newOvenCount;
    }
    buyNewOvenOnClick(){
        if(this.donutCount >= this.priceForNewOven)
        {
            this.donutCount -= this.priceForNewOven;
            this.newOvenPriceIncrease();
            this.newOvenCount += 1;
            this.donutsEarned = Math.round(Math.pow(2, this.newOvenCount)*100)/100;
        } 
    }

    newOvenPriceIncrease(){
        this.priceForNewOven *= 1.1;
        this.priceForNewOven = this.priceForNewOven.toFixed(2);
    }
}