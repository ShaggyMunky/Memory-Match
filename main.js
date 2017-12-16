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
    accuracy = (matchCounter / attempts).toFixed(2) * 100;     //no decimals
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
    // var cardHolder = $("<div>").addClass("card hidden");
    // var cardHolder1 = $("<div>").addClass("card hidden");
    // var cardHolder2 = $("<div>").addClass("card hidden");
    // var cardBack = $("<img src='images/game/cards/back_card.svg'>").addClass("back")
    // var cardGreen = $("<img src='images/game/cards/green_card.svg'>").addClass("front");
    // var cardRed = $("<img src='images/game/cards/red_card.svg'>").addClass("front");
    // var redGroup = cardHolder.append(cardRed).append(cardBack);
    // var greenGroup = cardHolder1.append(cardGreen).append(cardBack);
    // // var someGroup = cardHolder2.append(cardGreen).append(cardBack);
    // $(".game-board").append(redGroup);
    // $(".game-board").append(greenGroup);
    // // $(".game-board").append(someGroup);
    generateCards();
    displayStats();
}

function generateCards(){
    var cardLibrary = ['images/game/cards/back_card.svg',
                       'images/game/cards/green_card.svg',
                       'images/game/cards/red_card.svg',
                       'images/game/cards/green_card.svg',
                       'images/game/cards/red_card.svg'];

    for (var increment = 1; increment < 5; increment++){
        var cardHolder = $("<div>").addClass("card hidden");
        var cardBack = $("<img>").attr("src", cardLibrary[0]).addClass("back");
        var cardFront = $("<img>").attr("src", cardLibrary[increment]).addClass("front");
        var completeCard = cardHolder.append(cardFront).append(cardBack);

        $(".game-board").append(completeCard);
    }
}