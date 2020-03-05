/*
    Attribution to:
    http://stackoverflow.com/a/2450976 for the shuffle function(already in the udacity project starter code).
*/

const CARDS = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"]

function shuffle(CARDS) {
    var currentIndex = CARDS.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = CARDS[currentIndex];
        CARDS[currentIndex] = CARDS[randomIndex];
        CARDS[randomIndex] = temporaryValue;
    }

    console.log(CARDS);
}

shuffle(CARDS);
