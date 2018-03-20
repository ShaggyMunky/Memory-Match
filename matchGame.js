class MatchGame {
    constructor(){
        this.cards = [];
        this.matchCounter = 0;
        this.clickedCards = [];
        this.timeout = 750;
        this.cardImages = [
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
    }

    initializeGame(){
        const imageList = this.cardImages.concat(this.cardImages);
        this.cards = this.createCards(imageList);
        console.log("Constructor cards", this.cards);
    }

    createCards(imageArray){
        let cardList;
        return cardList = imageArray.map(image => {
            const newCard = new Card(image, this);
            $(".game-board").append(newCard.render());
            return newCard;
        });
    }

    handleChildClick(cardChild){
        console.log(cardChild);
        if (this.clickedCards.length < 2){
            this.clickedCards.push(cardChild);
            cardChild.revealFront();

            if (this.clickedCards.length === 2){
                    if (this.clickedCards[0].checkFrontImage() === this.clickedCards[1].checkFrontImage()){
                        console.log("match");
                        this.clickedCards = [];
                    } else {
                        setTimeout(this.hideClickedCards.bind(this), this.timeout)
                    }
            }
        }
    }

    hideClickedCards(){
        while (this.clickedCards.length){
            this.clickedCards[0].hideFront();
            this.clickedCards.splice(0, 1);
        }
    }
}