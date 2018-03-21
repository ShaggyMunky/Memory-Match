class MatchGame {
    constructor(cardImages, cardBack){
        this.cards = [];
        this.matchCounter = 0;
        this.clickedCards = [];
        this.timeout = 750;
        this.accuracy = 0;
        this.attempts = 0;
        this.gamesPlayed = 0;
        this.modalPopup = $(".modal");
        this.gameBoard =$(".game-board");
        this.cardImages = cardImages;
        this.cardBack = cardBack;

    }

    initializeGame(){
        const imageList = this.cardImages.concat(this.cardImages);
        this.shuffleCardArray(imageList);
        this.cards = this.createCards(imageList);
    }

    shuffleCardArray(array){
        let currentIndex = array.length;
        while (currentIndex) {
            let indexRandom = Math.floor(Math.random() * currentIndex--);
            let indexHolder = array[currentIndex];
            array[currentIndex] = array[indexRandom];
            array[indexRandom] = indexHolder;
        }
        return array;
    }

    createCards(imageArray){
        const cardList = new Array(imageArray.length);
        for (let index = 0; index < imageArray.length; index++){
            const newCard = new Card(imageArray[index], this.cardBack, this);
            cardList[index] = newCard;
            $(this.gameBoard).append(newCard.render());
        }
        return cardList;
    }

    handleChildClick(cardChild){
        if (this.clickedCards.length < 2){
            this.clickedCards.push(cardChild);
            cardChild.toggleCard();

            if (this.clickedCards.length === 2){
                if (this.clickedCards[0].checkFrontImage() === this.clickedCards[1].checkFrontImage()){
                    this.resetClickedCards();
                    this.matchCounter += 1;
                    this.attempts += 1;
                    this.calculateAccuracy();
                    this.renderStats();
                    if (this.cards.length / this.matchCounter === 2){
                        setTimeout(this.playerWin(), this.timeout);
                    }
                } else {
                    this.attempts += 1;
                    this.calculateAccuracy();
                    this.renderStats();
                    setTimeout(this.hideClickedCards.bind(this), this.timeout);
                }
            }
        }
    }

    calculateAccuracy() {
        this.accuracy = (this.matchCounter / this.attempts * 100).toFixed(0);
        console.log(this.accuracy);
    }

    playerWin(){
        $(this.modalPopup).css("display", "block");
        $(".modal-content p").text("That's-a nice-a pizza pie!");
        $(".reset").click(this.resetGame.bind(this));
    }

    hideClickedCards(){
        let index = 2;
        while (index){
            this.clickedCards[index - 1].toggleCard();
            index--;
        }
        this.resetClickedCards();
    }

    resetClickedCards(){
        this.clickedCards = [];
    }

    resetGame() {
        $(this.gameBoard).empty();
        this.matchCounter = 0;
        this.clickedCards = [];
        this.accuracy = 0;
        this.attempts = 0;
        this.gamesPlayed++;
        this.renderStats();
        this.initializeGame();
        $(this.modalPopup).css("display", "none");
    }

    renderStats(){
        $(".games-played .value").text(this.gamesPlayed);
        $(".attempts .value").text(this.attempts);
        const accuracyPercent = this.accuracy + "%";
        $(".accuracy .value").text(accuracyPercent);
    }
}