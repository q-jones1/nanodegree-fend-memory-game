/*
    Attribution to:
    http://stackoverflow.com/a/2450976 for the shuffle function(already in the udacity project starter code).
*/

const CARDS = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"]

const DECK = document.querySelector('.deck');

let LIST1 = [];
let LIST2 = [];
let POSITION1;
let POSITION2;
let MOVES = Number();
let DISPLAY_MOVES = document.querySelector('.moves');
let STARS = document.querySelector('.stars');

function shuffle(CARDS) {
    var currentIndex = CARDS.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = CARDS[currentIndex];
        CARDS[currentIndex] = CARDS[randomIndex];
        CARDS[randomIndex] = temporaryValue;
    }

    return CARDS;
}

function layoutCards() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < CARDS.length; i++) {
    const LIST_ITEM = document.createElement('li');
    LIST_ITEM.classList.add('card');
    const CARDICON = document.createElement('i');
    let SELECTED_CARD = CARDS[i];
    CARDICON.setAttribute('class', SELECTED_CARD);

    LIST_ITEM.appendChild(CARDICON);
    fragment.appendChild(LIST_ITEM);
  };
  DECK.appendChild(fragment);
  DECK.addEventListener('click', lastTurn);
}

function lastTurn(evt) {
  if (evt.target.nodeName === 'li'); {
    POSITION1 = evt.target;
    evt.target.classList.add('open','show');
    MOVES += 1;
    DISPLAY_MOVES.innerHTML = MOVES;
    starRating();
    let CARD1 = evt.target.firstChild.className;
    DECK.removeEventListener('click', lastTurn);
    LIST1.push(CARD1);
    DECK.addEventListener('click', nextTurn);
  };
}

function nextTurn(evt) {
  if (evt.target.className === 'card'); {
    POSITION2 = evt.target;
    evt.target.classList.add('open','show');
    MOVES += 1;
    DISPLAY_MOVES.innerHTML = MOVES;
    starRating();
    let CARD2 = evt.target.firstChild.className;
    DECK.removeEventListener('click', nextTurn);
    LIST2.push(CARD2);
    compareCards();
  }
}

function compareCards() {
  if (LIST1[0] === LIST2[0]) {
    POSITION1.classList.add('match');
    POSITION2.classList.add('match');
    LIST1.pop(LIST1[0]);
    LIST2.pop(LIST2[0]);
    DECK.addEventListener('click', lastTurn);
  } else {
    POSITION1.classList.remove('open','show');
    setTimeout(function delayedRemove() {
    POSITION2.classList.remove('open','show');
  }, 500);
  LIST1.pop(LIST1[0]);
  LIST2.pop(LIST2[0]);
  DECK.addEventListener('click', lastTurn);
};
}

function starRating() {
  if (MOVES > 6 && MOVES < 9) {
    STARS.firstElementChild.firstElementChild.classList.remove('fa-star');
  } if (MOVES > 9 && MOVES < 12) {STARS.firstElementChild.firstElementChild.classList.add('fa-star');}
  else {
    console.log("Howdy");
};
}

shuffle(CARDS);
layoutCards();
