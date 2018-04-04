$(document).ready(() => {
    const cardBack = 'images/game/cards/back_card.svg';
    const cardImages = [
        'images/game/cards/onion.svg',
        'images/game/cards/mushroom.svg',
        'images/game/cards/olive.svg',
        'images/game/cards/bell_pepper.svg',
        'images/game/cards/sausage.svg',
        'images/game/cards/bacon.svg',
        'images/game/cards/pepperoni.svg',
        'images/game/cards/cheese.svg',
        'images/game/cards/pineapple.svg'
    ];
    newGame(cardImages, cardBack);
});


 const newGame = (cardImages, cardBack) => {
     window.game = new MatchGame(cardImages, cardBack).initializeGame();
     return game;
 };
