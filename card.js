class Card {
    constructor(frontImage, backImage, parentObj){
        this.frontImage = frontImage;
        this.backImage = backImage;
        this.parent = parentObj;
        this.cardBack = null;
        this.flipped = false;
    }

    handleClick(){
        if (this.flipped){
            return;
        }
        this.parent.handleChildClick(this);
    }

    checkFrontImage(){
        return this.frontImage
    }

    toggleCard(){
        this.cardBack.toggleClass("reveal");
        this.flipped = !this.flipped;
    }

    render(){
        let card = $("<div>").addClass("card");
        card.click(this.handleClick.bind(this));
        let front = $(`<img src= ${this.frontImage}>`).addClass("front");
        let back = $(`<img src= ${this.backImage}>`).addClass("back");
        card.append(front, back);
        this.cardBack = back;

        return card;
    }
}
