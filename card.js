class Card {
    constructor(frontImage, parentObj){
        this.frontImage = frontImage;
        this.parent = parentObj;
        this.backImage = 'images/game/cards/back_card.svg';
        this.revealed = false;
        this.DomElement = null;
        this.cardBack = null

    }

    handleClick(){
        this.parent.handleChildClick(this);
    }

    checkFrontImage(){
        return this.frontImage
    }

    revealFront(){
        this.cardBack.hide();
    }

    hideFront(){
        this.cardBack.show();
    }

    render(){
        let card = $("<div>", {
            "class": "card",
        });
        card.click(this.handleClick.bind(this));
        let front = $(`<img src= ${this.frontImage}>`).addClass("front");
        let back = $(`<img src= ${this.backImage}>`).addClass("back");
        card.append(front, back);
        this.DomElement = card;
        this.cardBack = back;

        return card;
    }
}
