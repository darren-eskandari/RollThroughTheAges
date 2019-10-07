// player class
class Player {
    constructor(name){
        this.name = name;
        this.isStartPlayer = true;
        this.citiesBuilt = 3;
        this.monumentsBuilt = [];
        // this.developmentsCompleted = [];
        this.food = 3;
        this.availableWorkers = 0;
        // this.totalGoods = 0;
        // this.goods = {
        //     wood: [1, 3, 6, 10, 15, 21, 28, 36],
        //     stone: [2, 6, 12, 20, 30, 42, 56,],
        //     pottery: [3, 9, 18, 30, 45, 63],
        //     textiles: [4, 12, 24, 40, 60],
        //     weapons: [5, 15, 30, 50]
        // };
        this.score = {
            monuments: 0,
            // developments: 0,
            // bonus: 0, 
            disaster: 0,
            total: 0
        };
    }

    works =  {
        city4: {
            progress: 0,
            complete: 3,
            completed: false,
        },
        city5: {
            progress: 0,
            complete: 4,
            completed: false,
        },
        city6: {
            progress: 0,
            complete: 5,
            completed: false,
        },
        city7: {
            progress: 0,
            complete: 6,
            completed: false,
        },
        stepPyramid: {
            progress: 0,
            complete: 3,
            completed: false,
        },
        stoneCircle: {
            progress: 0,
            complete: 5,
            completed: false,
        },
        temple: {
            progress: 0,
            complete: 7,
            completed: false,
        },
        obelisk: {
            progress: 0,
            complete: 9,
            completed: false,
        },
        hangingGarden: {
            progress: 0,
            complete: 11,
            completed: false,
        },
        greatWall: {
            progress: 0,
            complete: 13,
            completed: false,
        },
        greatPyramid: {
            progress: 0,
            complete: 15,
            completed: false,
        }
    }


    // calculateGoods(){
    //     // console.log(`player collects goods`)
    // }
    calculateFood(){
        this.food = this.food + game.foodRolled - this.citiesBuilt;
         
    }
    calculateWorkers(){
        this.availableWorkers = game.workersRolled;
         
    }
    calculateDisaster(){

    }
    calculateScore(){
    
    }
    // developmentModifiers(){
    // }

};

const players = [];

// game object
const game = {
    newPlayer(){
        setName = prompt('Name your civilization');
        const player1 = new Player(setName);
        players.push(player1)
        // console.log(player1);
    },
    
    // dice roll function
    dicePool(){
        console.log(`player rolls ${this.citiesBuilt} dice`)
    },

    // temp values space holder waiting for random dice roll functions
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
        players[0].calculateDisaster();
        // console.log(players);
        console.log(players[0]);

    },

    // build works by assigning available workers
    buildWorks(){
        // assign workers from available pool to works and check for completion
    },
    
    // sell goods and use coins to build developments
    purchaseDevelopments(){
        // allow player to sell goods, add coins, and purchase a single development
        // call the discard goods function when purchase confirmed ** optional
    },

    // discard goods in excess of 6 ** optional
    discardGoods(){
        // prompt the player to discard 
        // confirmation calls the end of turn
    },

    // all functions that occur at end of turn
    endTurn(){
        // calls score calculation functions and checks for end of game triggers.
    },

};

 
$('#start').on('click', () => {
    // when adding additional player functionality, create a conditional that limits maximum number of players
    game.newPlayer();
});

$('#rollDice').on('click', () => {
    game.assignResults();
});
