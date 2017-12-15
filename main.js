$(document).ready(main);
var firstCard = null;
var secondCard = null;
var matchCounter = 0;
var possibleMatches = 2;

function main(){
    $(".game-board").on("click", ".hidden",getClickedCard);



}

function getClickedCard(){
    flipCard(this);

    console.log("I am clicked");

    if (!firstCard) {
        firstCard = this;
        $(firstCard).removeClass("hidden");
        return;
    }
    else{
        secondCard = this;
        $(secondCard).removeClass("hidden");
        if ($(firstCard).find(".front").attr("src") === $(secondCard).find(".front").attr("src")){
            matchCounter++;
            resetCardSelect();
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
            setTimeout(function(){
                $(firstCard).addClass("hidden");
                $(secondCard).addClass("hidden");
                flipCard(firstCard);
                flipCard(secondCard)
                resetCardSelect();
                $(".game-board").on("click", ".hidden", getClickedCard);
            }, 750);

        }
    }
    return;
}

function resetCardSelect(){
    firstCard = null;
    secondCard = null;
}

function flipCard(element){
    $(element).find(".back").toggleClass("reveal");
}