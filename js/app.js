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
            score: 1,
        },
        stoneCircle: {
            progress: 0,
            complete: 5,
            completed: false,
            score: 2,
        },
        temple: {
            progress: 0,
            complete: 7,
            completed: false,
            score: 4,
        },
        obelisk: {
            progress: 0,
            complete: 9,
            completed: false,
            score: 6,
        },
        hangingGarden: {
            progress: 0,
            complete: 11,
            completed: false,
            score: 8,
        },
        greatWall: {
            progress: 0,
            complete: 13,
            completed: false,
            score: 10,
        },
        greatPyramid: {
            progress: 0,
            complete: 15,
            completed: false,
            score: 12,
        }
    }


    // calculateGoods(){
    //     // console.log(`player collects goods`)
    // }
    calculateFood(){
        this.food = this.food + game.foodRolled - this.citiesBuilt;
        if (this.food < 0){
            this.score.disaster += this.food;
            this.food = 0;
        }
         
    }
    calculateWorkers(){
        this.availableWorkers = game.workersRolled;
        
    }
    calculateDisaster(){
        if (game.disastersRolled === 1){
            // no results
        } else if(game.disastersRolled === 3){
            // results effect other players
        } else {
            this.score.disaster -= game.disastersRolled;
        }
    }
    calculateScore(){
    
    }
    // developmentModifiers(){
    // }

};

const players = [];
// player 1 to be replaced with current player variable later

// game object
const game = {
    newPlayer(){
        setName = prompt('Name your civilization');
        const player1 = new Player(setName);
        players.push(player1)
        // console.log(player1);
    },

    diceResults: 
    [
        {
            result: 'disaster',
            amount: 1,
            image: 'images/disaster.png'
        }, 
        {
            result: 'food',
            amount: 3,
            image: 'images/food3.png'
        }, 
        {
            result: 'worker',
            amount: 3,
            image: 'images/workers3.png'
        }, 
        {
            result: 'food',
            amount: 2,
            image: 'images/food2.png'
        }, 
        {
            result: 'worker',
            amount: 2,
            image: 'images/workers2.png'
        }, 
        {
            result: 'both',
            amount: 2,
            image: 'images/both.png'
        }, 
    ],
    
    firstResult: [],
    rerollResult: [],
    finalResult: [],

    // initial dice roll
    rollDice(){
        for (let i = 0; i < players[0].citiesBuilt; i++){
            const randomResult = Math.floor(Math.random() * this.diceResults.length);
            if (randomResult === 0){
                this.finalResult.push(this.diceResults[randomResult]);
            } else {
                this.firstResult.push(this.diceResults[randomResult]);
            }
        };
        this.finalResult.map(item => {
            $('#finalResult').append(`<img src="${item.image}">`);
        });
        this.firstResult.map(item =>{
            $('#firstResults').append(`<img src="${item.image}">`)
        });

        // skip rerolls and assign results
        $('.rolls').append('<div id="keepRoll">keep results</div>');
        $('#keepRoll').on('click', () => {
            $('#keepRoll').off('click').text('');
            $('#rerollDice').off('click').text('');
            for (let i = 0; i < this.firstResult.length; i++){
                this.finalResult.push(this.firstResult[i]);
                $('#firstResults').text('');
            }
            $('#finalResult').text('');
            this.finalResult.map(item => {
                $('#finalResult').append(`<img src="${item.image}">`);
            });
            this.assignResults();
        });

         // call the first reroll method
         $('.rolls').append('<div id="rerollDice">reroll results</div>');
         $('#rerollDice').on('click', () => {
            $('#keepRoll').off('click').text('');
            $('#rerollDice').off('click').text('');
            $('#firstResults').text('');
            this.firstReroll();
         });
    },

    // first reroll method ** eventually expand to allow selective rerolls **
    firstReroll(){
        // generate reroll results
        for (let i = 0; i < this.firstResult.length; i++){
            const randomResult = Math.floor(Math.random() * this.diceResults.length);
            if (randomResult === 0){  
                this.finalResult.push(this.diceResults[randomResult]);
            } else {
                this.rerollResult.push(this.diceResults[randomResult]);   
            }
        }
        $('#finalResult').text('');
        this.finalResult.map(item => {
            $('#finalResult').append(`<img src="${item.image}">`);
        });
        this.rerollResult.map(item =>{
            $('#rerollResults').append(`<img src="${item.image}">`)
        });

        // skip second reroll and assign results
        $('.rolls').append('<div id="keepReroll">keep results</div>');
        $('#keepReroll').on('click', () => {
            $('#keepReroll').off('click').text('');
            $('#rerollAgain').off('click').text('');
            for (let i = 0; i < this.rerollResult.length; i++){
                this.finalResult.push(this.rerollResult[i]);
                $('#rerollResults').text('');
            }
            $('#finalResult').text('');
            this.finalResult.map(item => {
                $('#finalResult').append(`<img src="${item.image}">`);
            });
            this.assignResults();
        });

        // call second reroll 
        $('.rolls').append('<div id="rerollAgain">reroll results</div>');
        $('#rerollAgain').on('click', () => {
            $('#keepReroll').off('click').text('');
            $('#rerollAgain').off('click').text('');
            $('#firstResults').text('');
            this.secondReroll();
        });        
    },

    secondReroll(){
        for (let i = 0; i < this.rerollResult.length; i++){
            const randomResult = Math.floor(Math.random() * this.diceResults.length);
            this.finalResult.push(this.diceResults[randomResult]);
            $('#rerollResults').text('');
        }
        $('#finalResult').text('');
        this.finalResult.map(item => {
            $('#finalResult').append(`<img src="${item.image}">`);
        });
        this.assignResults();
    },

    // rolled values
        foodRolled: 0,
        workersRolled: 0,
        // goodsRolled: 0,
        // coinsRolled: 0,
        disastersRolled: 0,

    //collect food function
    assignResults(){
        for (let i = 0; i < this.finalResult.length; i++){
            if (this.finalResult[i].result === 'disaster'){
                this.disastersRolled = this.disastersRolled + this.finalResult[i].amount;
            } else if (this.finalResult[i].result === 'food'){
                this.foodRolled = this.foodRolled + this.finalResult[i].amount;
            } else if (this.finalResult[i].result === 'worker'){
                this.workersRolled = this.workersRolled + this.finalResult[i].amount;
            } else if (this.finalResult[i].result === 'both'){
                this.workersRolled = this.workersRolled + this.finalResult[i].amount;
                this.foodRolled = this.foodRolled + this.finalResult[i].amount;
            }
        }

        // players[0].calculateGoods();
        players[0].calculateFood();
        players[0].calculateWorkers();
        players[0].calculateDisaster();
        // console.log(players);
        // console.log(players[0]);

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
    $('#start').off('click').text('');
});

$('#rollDice').on('click', () => {
    game.rollDice();
    $('#rollDice').off('click').text('');
});
