// player class
class Player {
    constructor(){
        this.name = name;
        this.isStartPlayer = true;
        this.citiesBuilt = 3;
        this.monumentsBuilt = [];
        this.developmentsCompleted = [];
        this.food = 3;
        this.availableWorkers = 0;
        this.monumentScore = 0;
        this.developmentScore = 0;
        this.bonusScore = 0;
        this.disasterScore = 0;
        this.totalScore = 0;
        this.totalGoods = 0;
        this.goods = {
            wood = [1, 3, 6, 10, 15, 21, 28, 36],
            Stone: [2, 6, 12, 20, 30, 42, 56,],
            Pottery: [3, 9, 18, 30, 45, 63],
            Textiles: [4, 12, 24, 40, 60],
            Weapons: [5, 15, 30, 50]
        };
    }
    dicePool(){
        console.log(`player rolls ${this.citiesBuilt} dice`)
    }
    goodsCollected(){
        console.log(`player collects goods`)
    }
    Calculate Food
    Calculate Disaster Score
    Calculate Score

};