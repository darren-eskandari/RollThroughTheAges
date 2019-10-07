// player class
class Player {
    constructor(name){
        this.name = name;
        this.isStartPlayer = true;
        this.citiesBuilt = 3;
        this.monumentsBuilt = [];
        this.developmentsCompleted = [];
        this.food = 3;
        this.availableWorkers = 0;
        this.totalGoods = 0;
        this.goods = {
            wood: [1, 3, 6, 10, 15, 21, 28, 36],
            stone: [2, 6, 12, 20, 30, 42, 56,],
            pottery: [3, 9, 18, 30, 45, 63],
            textiles: [4, 12, 24, 40, 60],
            weapons: [5, 15, 30, 50]
        };
        this.score = {
            monuments: 0,
            developments: 0,
            bonus: 0, 
            disaster: 0,
            total: 0
        };
    }
    dicePool(){
        console.log(`player rolls ${this.citiesBuilt} dice`)
    }
    goodsCollected(){
        console.log(`player collects goods`)
    }
    calculateFood(){
        
    }
    calculateDisaster(){

    }
    calculateScore(){
    
    }
    developmentModifiers(){
    
    }
};

const game = {
    newPlayer(){
        setName = prompt('Name your civilization');
        const player1 = new Player(setName);
        console.log(player1);
    },
    
};

 
$('#start').on('click', () => {
    game.newPlayer();
});