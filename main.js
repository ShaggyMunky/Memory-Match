$(document).ready(main);
let game = null;
let firstCard = null;
let secondCard = null;
let matchCounter = 0;
let possibleMatches = 2;
let attempts = 0;
let accuracy = 0;
let gamesPlayed = 0;


function main(){
    game = new MatchGame();
    game.initializeGame();
    $(".game-board").on("click", ".hidden", getClickedCard);
    // generateCards();
    $(".reset").on("click", resetGame);
}

function getClickedCard(){
    flipCard(this);

    console.log("I am clicked");

    if (!firstCard) {
        firstCard = this;
        $(firstCard).toggleClass("hidden");
        return;
    }
    else{
        attempts += 1;
        secondCard = this;
        $(secondCard).toggleClass("hidden");
        if ($(firstCard).find(".front").attr("src") === $(secondCard).find(".front").attr("src")){
            matchCounter += 1;
            resetCardSelect();
            calculateAccuracy();
            displayStats();
            if (matchCounter === possibleMatches){
                console.log("win");
            }
            else{
                console.log("Card Matched");
                return;
            }
        }
        else{
            $(".game-board").off("click");
            calculateAccuracy();
            setTimeout(function(){
                toggleClicker(firstCard);
                toggleClicker(secondCard);
                flipCard(firstCard);
                flipCard(secondCard);
                resetCardSelect();
                $(".game-board").on("click", ".hidden", getClickedCard);
            }, 750);

        }
    }
    displayStats();
}

function resetCardSelect(){
    firstCard = null;
    secondCard = null;
}

function flipCard(element){
    $(element).find(".back").toggleClass("reveal");
}

function toggleClicker(card){
    $(card).toggleClass("hidden");
}

function calculateAccuracy() {
    // accuracy = (matchCounter / attempts * 100).toFixed(2);  //with decimals
    accuracy = (matchCounter / attempts * 100).toFixed(0);     //no decimals
}

function displayStats(){
    $(".games-played .value").text(gamesPlayed);
    $(".attempts .value").text(attempts);
    const accuracyPercent = accuracy + "%";
    $(".accuracy .value").text(accuracyPercent);
}
function resetGame(){
    accuracy = 0;
    matchCounter = 0;
    attempts = 0;
    gamesPlayed++;
    $(".game-board").empty();
    // generateCards();
    displayStats();
}

function generateCards(){
    const backImage = 'images/game/cards/back_card.svg';
    const cardImages = [ 'images/game/cards/spinach.svg',
                        'images/game/cards/mushroom.svg',
                        'images/game/cards/olive.svg',
                        'images/game/cards/bell_pepper.svg',
                        'images/game/cards/sausage.svg',
                        'images/game/cards/bacon.svg',
                        'images/game/cards/pepperoni.svg',
                        'images/game/cards/artichoke.svg',
                        'images/game/cards/pineapple.svg'];

    const cardList = cardImages.concat(cardImages);
    shuffleCardArray(cardList);

    for (let index = 0; index < cardList.length; index++){
        const cardHolder = $("<div>").addClass("card hidden");
        const cardBack = $(`<img src="${backImage}">`).addClass("back");
        const cardFront = $(`<img src="${cardList[index]}">`).addClass("front");
        const completeCard = cardHolder.append(cardFront).append(cardBack);

        $(".game-board").append(completeCard);
    }
}

function shuffleCardArray(array){
    let currentIndex = array.length;
    let indexHolder;
    let indexRandom;

    while (currentIndex) {
        indexRandom = Math.floor(Math.random() * currentIndex--);
        indexHolder = array[currentIndex];
        array[currentIndex] = array[indexRandom];
        array[indexRandom] = indexHolder;
    }
    return array;
}