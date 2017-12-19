$(document).ready(main);
var firstCard = null;
var secondCard = null;
var matchCounter = 0;
var possibleMatches = 2;
var attempts = 0;
var accuracy = 0;
var gamesPlayed = 0;


function main(){
    $(".game-board").on("click", ".hidden",getClickedCard);
    generateCards();
    $(".reset").on("click", resetGame)



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
    var accuracyPercent = accuracy + "%";
    $(".accuracy .value").text(accuracyPercent);
}
function resetGame(){
    accuracy = 0;
    matchCounter = 0;
    attempts = 0;
    gamesPlayed++;
    $(".game-board").empty();
    generateCards();
    displayStats();
}

function generateCards(){
    var backImage = 'images/game/cards/back_card.svg';
    var cardLibrary = [ 'images/game/cards/spinach.svg',
                        'images/game/cards/mushroom.svg',
                        'images/game/cards/olive.svg',
                        'images/game/cards/bell_pepper.svg',
                        'images/game/cards/sausage.svg',
                        'images/game/cards/bacon.svg',
                        'images/game/cards/pepperoni.svg',
                        'images/game/cards/artichoke.svg',
                        'images/game/cards/pineapple.svg'];


    var cardDuplicate = [];
    for (var increment = 0; increment < cardLibrary.length; increment++){
        cardDuplicate.push(cardLibrary[increment]);
    }

    var fullCards = cardLibrary.concat(cardDuplicate);

    shuffleArray(fullCards);

    for (increment = 0; increment < fullCards.length; increment++){
        var cardHolder = $("<div>").addClass("card hidden");
        var cardBack = $("<img>").attr("src", backImage).addClass("back");
        var cardFront = $("<img>").attr("src", fullCards[increment]).addClass("front");
        var completeCard = cardHolder.append(cardFront).append(cardBack);

        $(".game-board").append(completeCard);
    }
}

function shuffleArray(array){
    var currentIndex = array.length;
    var indexHolder;
    var indexRandom;

    while (currentIndex) {
        indexRandom = Math.floor(Math.random() * currentIndex--);
        indexHolder = array[currentIndex];
        array[currentIndex] = array[indexRandom];
        array[indexRandom] = indexHolder;
    }
    return array;
}