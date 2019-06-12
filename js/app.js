// List of cards
let cards = ['fa-diamond',
             'fa-paper-plane-o',
             'fa-anchor',
             'fa-bolt',
             'fa-cube',
             'fa-leaf',
             'fa-bicycle',
             'fa-bomb',
            ];

//Duplicate cards            
cards = cards.concat(cards);

const moves = document.querySelector('.moves');
    timer = document.querySelector('.timer');
    deck = document.querySelector('.deck');
    stars = document.querySelector('.stars');

let allCards = document.querySelectorAll('.card');
    openCards = [];
    matchCards = [];
    movesCounter = 0;
    starCounter = 3;

    sec = 0;
    min = 0;
    hour = 0;


/** - Generate the cards
 *  - Shuffle the list of cards
 *  - Display the cards on the page
*/
 function generateCards()
 {
    let index = 0;
    let cardHTML = shuffle(cards.map(function(card){
        index++;
        return generateCard(card, index);
    }));

    deck.innerHTML = cardHTML.join('');
 }

 /**
  * - Generate each cards
  * - Attach a unique id for each card
*/
 function generateCard(card, index)
 {
     return  `<li class="card" id="card${index.toString()}"><i class="fa ${card}"></i></li>`;
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Start the logic of the game
function startGame(){
    openCards = [];
    matchCards = [];
    movesCounter = 0;
    allCards = document.querySelectorAll('.card');
  
    allCards.forEach(function(card){

        //Attach click event on each card
        card.addEventListener('click', function(event){

            //Check if the card already exist on the list of matching cards to prevent double entry.
            if(!matchCards.includes(card)){

                //Add the card to a list of open cards array
                addToOpenCardsList(card);   

                if (openCards.length <= 2){
                    //Display the selected card
                    displayCard(card);
                    
                    //Check if two cards are selected, if not do nothing
                    if(openCards.length == 2){

                        //Set the moves counter   
                        movesCounter++;         
                        setMovesCounter(movesCounter);
                                
                        //Set the star counter
                        setStarCounter();
        
                        //Set timeout to flip back the unmatched cards
                        setTimeout(() => {
        
                            //Compare the open cards. If matched, display the cards or else hide it
                            if(isOpenCardsMatched(openCards)){
                                openCards.forEach(function(openCard){
                                    displayMatchedCard(openCard);
                                })
                                
                                //Check if all the cards have matched
                                if(isAllCardsHaveMatched()){
                                    displayVictoryMessage();
                                    restartGame();
                                }
                            }
                            else{
                                openCards.forEach(function(openCard){
                                    hideCard(openCard);
                                })
                            }
        
                            //Clear the list of open cards array to make a new set of selection
                            openCards = [];
                        }, 200);
                    }
                }
            }
        });
    });
}

// Display the selected card
function displayCard(card){
    card.classList.add('open', 'show');
}

//Hide the selected card
function hideCard(card){
    card.classList.remove('open', 'show')
}

//Add selected card to array list of open cards
function addToOpenCardsList(card){

    if(openCards.length > 0){
        //Check if selected card already exist to prevent same item on the list
        if(openCards[0].id == card.id){
            return;
        }
    }
    openCards.push(card);
}

//Compare the two selected cards and return a boolean value
function isOpenCardsMatched(openCards) {
    let isOpenCardsMatched = false;

    if (openCards.length == 2) {
        isOpenCardsMatched = openCards[0].innerHTML == openCards[1].innerHTML;

        //If the two cards are the same, add to list of matching cards
        if(isOpenCardsMatched){
            matchCards.push(openCards[0]);
            matchCards.push(openCards[1]);
        }
    }

    return isOpenCardsMatched;
}

//Display the selected cards that matches
function displayMatchedCard(card){
    card.classList.add('match');
    card.classList.remove('show', 'open');
}

//Check if all the cards have matched
function isAllCardsHaveMatched()
{
    let isAllCardsHaveMatched = false;
    let totalCount = 0;
    
    allCards.forEach(function(card){
        //Check if the css class of each card has a *match* value then increment the total count
        if(card.classList.contains('match')){
            totalCount++;
        }
    })

    //Set the return value to true if the total count is equivalent to total number of cards generated
    isAllCardsHaveMatched = totalCount == cards.length;

    return isAllCardsHaveMatched;
}

//Restart the game
function restartGame()
{
    //Set the moves count to zero
    setMovesCounter(0);

    //Generates all the cards
    generateCards();

    //Start the logic of the game
    startGame(); 

    //Reset the timer
    resetTimer();

    //Reset the star counter and display the stars
    starCounter = 3;
    stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
}

//Set the value of moves counter
function setMovesCounter(count)
{
    moves.innerText = count <= 1 ? count.toString() + ' Move' :  count.toString() + ' Moves';
}

//Display the victory message with the star rating and the time consumed to finish the game
function displayVictoryMessage(){
    alert(`Congratulations! It took you ${getTime()} to finish the game and you have a ${getStarRating()}-star rating!`);
}

//Set the timer of the game
function setTimer(){
    sec++;

    if(sec >= 60){
        sec = 0;
        min++;
        
        if(min >= 60){
            min = 0;
            hour++;
        }
    }

    timer.innerText = `${hour > 9 ? hour : '0' + hour} : ${min > 9 ? min : '0' + min} : ${sec > 9 ? sec : '0' + sec}`;

    setTimeout(() => {
        setTimer();
    }, 1000);
}

//Reset the timer
function resetTimer(){
    sec = 0;
    min = 0;
    hour = 0;
    timer.innerText = '00 : 00 : 00';
}

//Get how much time the player took to finish the game
function getTime(){
    let h = '';
    let m = '';
    let s = '';
  
    //set value for hour(s)
    if (hour > 0){
        h = hour + ' hour(s)';
    }

    //set value for minute(s)
    if(hour > 0 && min > 0 && sec == 0){
        m = ' and ' + min + ' minute(s)';
    }
    else if(hour > 0 && min > 0){
        m = ', ' + min + ' minute(s)';
    }
    else if(min > 0 ){
        m = min + ' minute(s)';
    }

    //set value for second(s)
    if(min >  0 && sec > 0 || hour > 0 && sec > 0){
        s = ' and ' + sec + ' second(s)';
    }
    else if(sec > 0){
        s = sec + ' second(s)';
    }

    return h + m + s;
}

//Get the number of stars
function getStarRating(){
    return starCounter;
}

//Set the star rating.
function setStarCounter(){
    if(movesCounter == 12){
        stars.children[0].innerHTML = '';
        starCounter = 2;
    }
    else if(movesCounter == 24){
        stars.children[1].innerHTML = '';
        starCounter = 1
    }
}

//Initialize the memory game
function initGame()
 { 
    //Generates all the cards
    generateCards();

    //Attach click event to Restart button
    document.querySelector('.restart').addEventListener('click', restartGame);

    //Start the logic of the game
    startGame();    

    //Set the timer of the game, wait 1 sec before the timer starts
    setTimeout(setTimer, 1000);
 }

 //Call the initialize method to start the game
 initGame();