$(document).ready(() => {
    const cardBack = 'images/game/cards/back_card.svg';
    const cardImages = [
        'images/game/cards/spinach.png',
        'images/game/cards/mushroom.png',
        'images/game/cards/olive.png',
        'images/game/cards/bell_pepper.png',
        'images/game/cards/sausage.png',
        'images/game/cards/bacon.png',
        'images/game/cards/pepperoni.png',
        'images/game/cards/artichoke.png',
        'images/game/cards/pineapple.png'
    ];
    newGame(cardImages, cardBack);
});


 const newGame = (cardImages, cardBack) => {
     window.game = new MatchGame(cardImages, cardBack).initializeGame();
     return game;
 };
