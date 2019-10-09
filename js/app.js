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
            image: 'images/city4.png',
        },
        city5: {
            progress: 0,
            complete: 4,
            completed: false,
            score: 0,
            image: 'images/city5.png',
        },
        city6: {
            progress: 0,
            complete: 5,
            completed: false,
            score: 0,
            image: 'images/city6.png',
        },
        city7: {
            progress: 0,
            complete: 6,
            completed: false,
            score: 0,
            image: 'images/city7.png',
        },
        stepPyramid: {
            progress: 0,
            complete: 3,
            completed: false,
            score: 1,
            image: 'images/step_pyramid.png',
        },
        stoneCircle: {
            progress: 0,
            complete: 5,
            completed: false,
            score: 2,
            image: 'images/stone_circle.png',
        },
        temple: {
            progress: 0,
            complete: 7,
            completed: false,
            score: 4,
            image: 'images/temple.png',
        },
        obelisk: {
            progress: 0,
            complete: 9,
            completed: false,
            score: 6,
            image: 'images/obelisk.png',
        },
        hangingGarden: {
            progress: 0,
            complete: 11,
            completed: false,
            score: 8,
            image: 'images/hanging_garden.png',
        },
        greatWall: {
            progress: 0,
            complete: 13,
            completed: false,
            score: 10,
            image: 'images/great_wall.png',
        },
        greatPyramid: {
            progress: 0,
            complete: 15,
            completed: false,
            score: 12,
            image: 'images/great_pyramid.png',
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
// player 1 to be replaced with current player variable later

// game object
const game = {
    newPlayer(){
        setName = prompt('Name your civilization');
        const player1 = new Player(setName);
        players.push(player1)
        $('#rollDice').text(`Roll Dice`)
        this.render();
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
    val: {
        disasters: 0,
        food: 0,
        workers: 0,
        // goods: 0,
        // coins: 0,
    },

    //collect food function
    assignResults(){
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
        // assign workers from available pool to works and check for completion
            // $('.works').on('click', (e) => {
            //     console.log(e.target);
            // });
        // $('.work').hover( () {

        // });

        $('.works').on('click', e => {
    
            if(e.target.nodeName !== 'SELECT') {
                $('.numOfWork').detach()
                const $parent = $(`#${$(e.target).parent().attr('id')}`)
                const work = players[0].works[$(e.target).parent().attr('id')] || 0
                const dropDown = createDropDown(players[0].availableWorkers, work.complete)
                $parent.append(dropDown)
                $('select').on('change', (e) => console.log(e.target.value))
            }
        })
        
        const createDropDown = (numOfWorkers, maxNum) => {
            const $select = $("<select class='numOfWork'></select>")
            const max = numOfWorkers < maxNum ? numOfWorkers : maxNum
            for(let i = 0; i < max; i++) {
                $select.append(`<option value=${i+1}>${i + 1}</option>`)
            }
            return $select
        }

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
    },

    // render game state
    render(){
        // player info
        $('#name').text(`Player: ${players[0].name}`);
        $('#food').text(`Food: ${players[0].food}`);
        $('#workers').text(`Available Workers: ${players[0].availableWorkers}`);
        
        // works - cities
        $('#city1').html(`<img src="${players[0].works.city1.image}">`);
        $('#city2').html(`<img src="${players[0].works.city2.image}">`);
        $('#city3').html(`<img src="${players[0].works.city3.image}">`);
        $('#city4').html(`<img src="${players[0].works.city4.image}"><br>${players[0].works.city4.progress}/${players[0].works.city4.complete}`);
        $('#city5').html(`<img src="${players[0].works.city5.image}"><br>${players[0].works.city5.progress}/${players[0].works.city5.complete}`);
        $('#city6').html(`<img src="${players[0].works.city6.image}"><br>${players[0].works.city6.progress}/${players[0].works.city6.complete}`);
        $('#city7').html(`<img src="${players[0].works.city7.image}"><br>${players[0].works.city7.progress}/${players[0].works.city7.complete}`);
        
        // works - monuments
        $('#stepPyramid').html(`<img src="${players[0].works.stepPyramid.image}"> ${players[0].works.stepPyramid.progress}/${players[0].works.stepPyramid.complete}`)
        $('#stoneCircle').html(`<img src="${players[0].works.stoneCircle.image}"> ${players[0].works.stoneCircle.progress}/${players[0].works.stoneCircle.complete}`)
        $('#temple').html(`<img src="${players[0].works.temple.image}"> ${players[0].works.temple.progress}/${players[0].works.temple.complete}`)
        $('#obelisk').html(`<img src="${players[0].works.obelisk.image}"> ${players[0].works.obelisk.progress}/${players[0].works.obelisk.complete}`)
        $('#hangingGarden').html(`<img src="${players[0].works.hangingGarden.image}"> ${players[0].works.hangingGarden.progress}/${players[0].works.hangingGarden.complete}`)
        $('#greatWall').html(`<img src="${players[0].works.greatWall.image}"> ${players[0].works.greatWall.progress}/${players[0].works.greatWall.complete}`)
        $('#greatPyramid').html(`<img src="${players[0].works.greatPyramid.image}"> ${players[0].works.greatPyramid.progress}/${players[0].works.greatPyramid.complete}`)

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
    $('#rollDice').off('click').text('');
});
