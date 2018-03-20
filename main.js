$(document).ready(main);

const cardBack = 'images/game/cards/back_card.svg';
const cardImages = [
    'images/game/cards/spinach.svg',
    'images/game/cards/mushroom.svg',
    'images/game/cards/olive.svg',
    'images/game/cards/bell_pepper.svg',
    'images/game/cards/sausage.svg',
    'images/game/cards/bacon.svg',
    'images/game/cards/pepperoni.svg',
    'images/game/cards/artichoke.svg',
    'images/game/cards/pineapple.svg'
];


function main(){
    newGame();
    $(".reset").on("click", resetGame);
}
 const newGame = () => {
     window.game = new MatchGame(cardImages, cardBack, document.querySelector(".game-board")).initializeGame();
     return game;
 };

function resetGame(){
    accuracy = 0;
    matchCounter = 0;
    attempts = 0;
    gamesPlayed++;
    $(".game-board").empty();
    // generateCards();
    displayStats();
}