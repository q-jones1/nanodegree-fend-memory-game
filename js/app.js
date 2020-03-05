/*
    Attribution to:
    http://stackoverflow.com/a/2450976 for the shuffle function(already in the udacity project starter code). https://developer.mozilla.org/en-US/docs/Web/API/Window/alert - for base learning of the alert message method.
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden - for the exact syntax(udacity course content - just advised that hidden is good to reduce DOM reflows).
    https://css-tricks.com/considerations-styling-modal/ - for base learning on how to create a simple modal box.
*/

const CARDS = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
const DECK = document.querySelector('.deck');
const DISPLAY_MOVES = document.querySelector('.moves');
const STARS = document.querySelector('.stars');
const RESTART = document.querySelector('.restart-mid-game');
const CONGRATS_MODAL = document.querySelector('.congrats-modal');
const PLAY_AGAIN = document.querySelector('.play-again');
const STAR_TOTAL = document.querySelector('.stars-total');

let LIST1 = [];
let LIST2 = [];
let POSITION1;
let POSITION2;
let MOVES = Number();

function startGame() {
  shuffle(CARDS);
  layoutCards();
}

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
  RESTART.addEventListener('click', clearDeck);
  DECK.addEventListener('click', lastTurn);
}

function lastTurn(evt) {
  if (evt.target.className === 'card') {
    POSITION1 = evt.target;
    evt.target.classList.add('open','show');
    let CARD1 = evt.target.firstChild.className;
    DECK.removeEventListener('click', lastTurn);
    LIST1.push(CARD1);
    DECK.addEventListener('click', nextTurn);
  } else {alert('Please choose an unturned card!');
};
}

function nextTurn(evt) {
  if (evt.target.className === 'card') {
    POSITION2 = evt.target;
    evt.target.classList.add('open','show');
    MOVES += 1;
    DISPLAY_MOVES.innerHTML = MOVES;
    starRating();
    let CARD2 = evt.target.firstChild.className;
    DECK.removeEventListener('click', nextTurn);
    LIST2.push(CARD2);
    compareCards();
  } else {alert('Please choose an unturned card!');
};
}

function compareCards() {
  if (LIST1[0] === LIST2[0]) {
    POSITION1.classList.add('match');
    POSITION2.classList.add('match');
    LIST1.pop(LIST1[0]);
    LIST2.pop(LIST2[0]);
    endGame();
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

function endGame() {
  let GAME_STATE = document.querySelectorAll('.match');
  if (GAME_STATE.length === 2) {
  congratsScreen()} else {
  DECK.addEventListener('click', lastTurn);
}
}

function congratsScreen() {
let STAR_NUMBER = document.querySelectorAll('.fa-star').length;
// open the congratulations screen(modal).
CONGRATS_MODAL.style.display = "block";
STAR_TOTAL.innerHTML = ('     ' + STAR_NUMBER);
// click the restart button, to close the modal and start the game again.
PLAY_AGAIN.addEventListener('click', function() {
CONGRATS_MODAL.style.display = 'none';
  clearDeck();
});
}

function clearDeck() {
  DECK.hidden = true;
  while (DECK.firstChild) {
  DECK.removeChild(DECK.firstChild);
} DECK.hidden = false;
  clearStars();
};

function clearStars() {
  STARS.hidden = true;
  while (STARS.firstChild) {
  STARS.removeChild(STARS.firstChild);
} STARS.hidden = false;
  newStars();
};

function newStars() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 3; i++) {
    const LIST_ITEM = document.createElement('li');
    LIST_ITEM.classList.add('card');
    const STARICON = document.createElement('i');
    STARICON.setAttribute('class', 'fa fa-star');

    LIST_ITEM.appendChild(STARICON);
    fragment.appendChild(LIST_ITEM);
  };
  STARS.appendChild(fragment);
  MOVES = 0;
  DISPLAY_MOVES.innerHTML = MOVES;
  startGame();
}

function starRating() {
  if (MOVES === 14) {
    STARS.firstElementChild.remove();
  } if (MOVES === 17) {STARS.firstElementChild.remove();
  } if (MOVES === 20) {STARS.firstElementChild.remove();
  } else {
};
}

startGame();
