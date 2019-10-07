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

    calculateGoods(){
        console.log(`player collects goods`)
    }
    calculateFood(){
        this.food = this.food + game.foodRolled - this.citiesBuilt;
         
    }
    calculateWorkers(){
        this.availableWorkers = this.availableWorkers + game.workersRolled;
         
    }
    calculateDisaster(){

    }
    calculateScore(){
    
    }
    developmentModifiers(){
    
    }
};

const players = [];

// game object
const game = {
    newPlayer(){
        setName = prompt('Name your civilization');
        const player1 = new Player(setName);
        players.push(player1)
        console.log(player1);
    },
    
    dicePool(){
        console.log(`player rolls ${this.citiesBuilt} dice`)
    },

    // temp values space holder
    foodRolled: 5,
    workersRolled: 3,
    goodsRolled: 2,
    coinsRolled: 7,
    disastersRolled: 1,

    //collect food function
    assignResults(){
        players[0].calculateGoods();
        players[0].calculateFood();
        players[0].calculateWorkers();
        console.log(players);
    },

};

 
$('#start').on('click', () => {
    game.newPlayer();
});

$('#rollDice').on('click', () => {
    game.assignResults();
});
