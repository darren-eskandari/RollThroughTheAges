// player class
class Player {
    constructor(name){
        this.name = name;
        this.isStartPlayer = true;
        this.citiesBuilt = 3;
        this.monumentsBuilt = [];
        this.food = 3;
        this.availableWorkers = 0;
        this.score = {
            monuments: 0,
            disaster: 0,
            total: 0
                // developments: 0,
                // bonus: 0, 
        };
            // this.developmentsCompleted = [];
            // this.totalGoods = 0;
            // this.goods = {
            //     wood: [1, 3, 6, 10, 15, 21, 28, 36],
            //     stone: [2, 6, 12, 20, 30, 42, 56,],
            //     pottery: [3, 9, 18, 30, 45, 63],
            //     textiles: [4, 12, 24, 40, 60],
            //     weapons: [5, 15, 30, 50]
            // };
    }

    works =  {
        city1: {
            // progress: 0,
            // complete: 0,
            completed: true,
            score: 0,
            image: 'images/city1.png',
        },
        city2: {
            // progress: 0,
            // complete: 0,
            completed: true,
            score: 0,
            image: 'images/city2.png',
        },
        city3: {
            // progress: 0,
            // complete: 0,
            completed: true,
            score: 0,
            image: 'images/city3.png',
        },
        city4: {
            progress: 0,
            complete: 3,
            completed: false,
            score: 0,
            cityBuilt: 1,
            image: 'images/city4.png',
        },
        city5: {
            progress: 0,
            complete: 4,
            completed: false,
            score: 0,
            cityBuilt: 1,
            image: 'images/city5.png',
        },
        city6: {
            progress: 0,
            complete: 5,
            completed: false,
            score: 0,
            cityBuilt: 1,
            image: 'images/city6.png',
        },
        city7: {
            progress: 0,
            complete: 6,
            completed: false,
            score: 0,
            cityBuilt: 1,
            image: 'images/city7.png',
        },
        stepPyramid: {
            progress: 0,
            complete: 3,
            completed: false,
            score: 1,
            cityBuilt: 0,
            image: 'images/stepPyramid.png',
        },
        stoneCircle: {
            progress: 0,
            complete: 5,
            completed: false,
            score: 2,
            cityBuilt: 0,
            image: 'images/stoneCircle.png',
        },
        temple: {
            progress: 0,
            complete: 7,
            completed: false,
            score: 4,
            cityBuilt: 0,
            image: 'images/temple.png',
        },
        obelisk: {
            progress: 0,
            complete: 9,
            completed: false,
            score: 6,
            cityBuilt: 0,
            image: 'images/obelisk.png',
        },
        hangingGarden: {
            progress: 0,
            complete: 11,
            completed: false,
            score: 8,
            cityBuilt: 0,
            image: 'images/hangingGarden.png',
        },
        greatWall: {
            progress: 0,
            complete: 13,
            completed: false,
            score: 10,
            cityBuilt: 0,
            image: 'images/greatWall.png',
        },
        greatPyramid: {
            progress: 0,
            complete: 15,
            completed: false,
            score: 12,
            cityBuilt: 0,
            image: 'images/greatPyramid.png',
        }
    }
    
    calculateDisaster(){
        if (game.val.disasters === 1){
            // no results on 1 disaster
        } else if(game.val.disasters === 3){
            // results effect other players on 3 disasters
        } else {
            this.score.disaster -= game.val.disasters;
        }
    }
    calculateFood(){
        this.food = this.food + game.val.food - this.citiesBuilt;
        if (this.food < 0){
            this.score.disaster += this.food;
            this.food = 0;
        }
    }
    calculateWorkers(){
        this.availableWorkers = game.val.workers;
    }
    calculateScore(){
        this.score.total = this.score.monuments + this.score.disaster
    }
        // calculateGoods(){
        //  console.log(`player collects goods`)
        // }
        // developmentModifiers(){
        //    
        // }
};
    
const players = [];
// player[0] to be replaced with currentPlayer variable later

// game object
const game = {
    newPlayer(){
        setName = prompt('Name your civilization');
        const player1 = new Player(setName);
        players.push(player1)
        this.render();
        this.startRound();
    },

    currentRound: 1,
    phases: ['rollDicePhase', 'assignResultsPhase', 'buildWorkPhase', 'cleanUpPhase'],    
    currentPhase: null,

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

    startRound(){
        $('#rollDice').text(`Roll Dice`)
    },

    // initial dice roll
    rollDice(){
        this.currentPhase = this.phases[0];
        console.log(this.currentPhase);
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
            $('#keepRoll').remove();
            $('#rerollDice').remove();
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
            $('#keepRoll').remove();
            $('#rerollDice').remove();
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
            $('#keepReroll').remove();
            $('#rerollAgain').remove();
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
            $('#keepReroll').remove();
            $('#rerollAgain').remove();
            $('#firstResults').text('');
            this.secondReroll();
        });        
    },

    // generate final reroll 
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
    val: {
        disasters: 0,
        food: 0,
        workers: 0,
        // goods: 0,
        // coins: 0,
    },

    // assign roll results
    assignResults(){
        this.currentPhase = this.phases[1]
        console.log(this.currentPhase);
        for (let i = 0; i < this.finalResult.length; i++){
            if (this.finalResult[i].result === 'disaster'){
                this.val.disasters = this.val.disasters + this.finalResult[i].amount;
            } else if (this.finalResult[i].result === 'food'){
                this.val.food = this.val.food + this.finalResult[i].amount;
            } else if (this.finalResult[i].result === 'worker'){
                this.val.workers = this.val.workers + this.finalResult[i].amount;
            } else if (this.finalResult[i].result === 'both'){
                this.val.workers = this.val.workers + this.finalResult[i].amount;
                this.val.food = this.val.food + this.finalResult[i].amount;
            }
        }

        players[0].calculateFood();
        players[0].calculateWorkers();
        players[0].calculateDisaster();
        // players[0].calculateGoods();
        players[0].calculateScore();

        this.render();
        this.buildWorks();
    },

    // build works by assigning available workers
    buildWorks(){
        this.currentPhase = this.phases[2]
        console.log(this.currentPhase);
        $('.rolls').append('<div id="endTurn">End Turn</div>');
        $('#endTurn').on('click', () => {
            $('#endTurn').remove();
            this.endTurn();
        });

        $('.incomplete').on('click', e => {
            if(e.target.nodeName !== 'SELECT') {
                $('.numOfWork').detach();
                const $parent = $(`#${$(e.target).parent().attr('id')}`);
                const work = players[0].works[$(e.target).parent().attr('id')] || 0;
                if(!work.completed) {
                    const dropDown = createDropDown(players[0].availableWorkers, work.complete - work.progress);
                    $parent.append(dropDown)
                }
                // $('select').on('change', (e) => console.log(e.target.value));
                // $('select').on('change', (e) => console.log(e.target.parentNode.id));
                $('select').change((e) => { 
                    // const targetProgress = players[0].works[`${e.target.parentNode.id}`].progress;
                    // console.log(targetProgress, 'target progress')
                    players[0].availableWorkers -= e.target.value;
                    players[0].works[`${e.target.parentNode.id}`].progress += Number(e.target.value);
                    if (players[0].works[`${e.target.parentNode.id}`].progress === players[0].works[`${e.target.parentNode.id}`].complete){
                        players[0].works[`${e.target.parentNode.id}`].completed = true;
                        players[0].score.monuments += players[0].works[`${e.target.parentNode.id}`].score;
                        players[0].citiesBuilt += players[0].works[`${e.target.parentNode.id}`].cityBuilt;
                        players[0].works[`${e.target.parentNode.id}`].image = 'completed/' + players[0].works[`${e.target.parentNode.id}`].image;
                        $(e.target).parent().removeClass('incomplete');
                        players[0].calculateScore();
                    }
                    this.render();
                    // if (players[0].availableWorkers === 0) {
                    //     $('#endTurn').remove();
                    //     this.endTurn();
                    // }
                });
            }
        });
        
        const createDropDown = (numOfWorkers, maxNum) => {
            if (this.currentPhase === 'buildWorkPhase') {  
                const $select = $("<select class='numOfWork'></select>");
                const max = numOfWorkers < maxNum ? numOfWorkers : maxNum;
                for(let i = 0; i <= max; i++) {
                    $select.append(`<option value=${i}>${i}</option>`);
                }
                return $select;
            }
        };
    },

        // // sell goods and use coins to build developments
        // purchaseDevelopments(){
        //     // allow player to sell goods, add coins, and purchase a single development
        //     // call the discard goods function when purchase confirmed ** optional
        // },

        // // discard goods in excess of 6 ** optional
        // discardGoods(){
        //     // prompt the player to discard 
        //     // confirmation calls the end of turn
        // },

    // all functions that occur at end of turn
    endTurn(){
        // calls score calculation functions and checks for end of game triggers.
        this.currentPhase = this.phases[3]
        console.log(this.currentPhase);
        this.firstResult = [];
        this.rerollResult = [];
        this.finalResult = [];
        $('#finalResult').text('');

        this.val.disasters = 0;
        this.val.food = 0;
        this.val.workers = 0;
        this.currentRound++

        this.render();
        const nextRound = alert('Ready for the next round?')
        this.startRound();
    },

    // render game state
    render(){
        // player info
        $('#name').text(`Player: ${players[0].name}`);
        $('#round').text(`Round: ${game.currentRound}`);
        $('#food').text(`Food: ${players[0].food}`);
        $('#workers').text(`Workers: ${players[0].availableWorkers}`);
        
        // works - cities
        $('#city1').html(`<img src="${players[0].works.city1.image}"><br>`);
        $('#city2').html(`<img src="${players[0].works.city2.image}"><br>`);
        $('#city3').html(`<img src="${players[0].works.city3.image}"><br>`);
        $('#city4').html(`<img src="${players[0].works.city4.image}"><br>${players[0].works.city4.progress}/${players[0].works.city4.complete}`);
        $('#city5').html(`<img src="${players[0].works.city5.image}"><br>${players[0].works.city5.progress}/${players[0].works.city5.complete}`);
        $('#city6').html(`<img src="${players[0].works.city6.image}"><br>${players[0].works.city6.progress}/${players[0].works.city6.complete}`);
        $('#city7').html(`<img src="${players[0].works.city7.image}"><br>${players[0].works.city7.progress}/${players[0].works.city7.complete}`);
        
        // works - monuments
        $('#stepPyramid').html(`<img src="${players[0].works.stepPyramid.image}"><br>Step Pyramid<br>${players[0].works.stepPyramid.progress}/${players[0].works.stepPyramid.complete}`);
        $('#stoneCircle').html(`<img src="${players[0].works.stoneCircle.image}"><br>Stone Circle ${players[0].works.stoneCircle.progress}/${players[0].works.stoneCircle.complete}<br>`);
        $('#temple').html(`<img src="${players[0].works.temple.image}"><br>Temple ${players[0].works.temple.progress}/${players[0].works.temple.complete}<br>`);
        $('#obelisk').html(`<img src="${players[0].works.obelisk.image}"><br>Obelisk ${players[0].works.obelisk.progress}/${players[0].works.obelisk.complete}<br>`);
        $('#hangingGarden').html(`<img src="${players[0].works.hangingGarden.image}"><br>Hanging Garden ${players[0].works.hangingGarden.progress}/${players[0].works.hangingGarden.complete}<br>`);
        $('#greatWall').html(`<img src="${players[0].works.greatWall.image}"><br>Great Wall ${players[0].works.greatWall.progress}/${players[0].works.greatWall.complete}<br>`)
        $('#greatPyramid').html(`<img src="${players[0].works.greatPyramid.image}"><br>Great Pyramid ${players[0].works.greatPyramid.progress}/${players[0].works.greatPyramid.complete}<br>`)

        // score
        $('score').prepend('<div/>').text('Score');
        $('#monumentScore').text(`Monuments: ${players[0].score.monuments}`);
        $('#disasterScore').text(`Disasters: ${players[0].score.disaster}`);
        $('#totalScore').text(`Total: ${players[0].score.total}`);
    },

};
 
// call the start of game function
// when adding additional player functionality, create a conditional that limits maximum number of players
$('#start').on('click', () => {
    game.newPlayer();
    $('#start').off('click').text('');
});

$('#rollDice').on('click', () => {
    game.rollDice();
    $('#rollDice').text('');
});


