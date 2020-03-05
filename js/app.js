/*
    Attribution to the following reference sites:
    http://stackoverflow.com/a/2450976 - for the shuffle function(already in the udacity project starter code.)
    https://developer.mozilla.org/en-US/docs/Web/API/Window/alert - for base learning of the alert message method.
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden - for the exact syntax(udacity course content - just advised that hidden is good to reduce DOM reflows).
    https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals - for base learning on how to create a timer using setTimeout.
    https://css-tricks.com/considerations-styling-modal/ - for base learning on how to create a simple modal box.
*/

const CARDS = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
const DECK = document.querySelector('.deck');
const MOVES_TOTAL = document.querySelector('.moves');
const TIMER = document.querySelector('.clock');
const STARS = document.querySelector('.stars');
const RESTART = document.querySelector('.restart-mid-game');
const CONGRATS_MODAL = document.querySelector('.congrats-modal');
const PLAY_AGAIN = document.querySelector('.play-again');
const STAR_TOTAL = document.querySelector('.stars-total');
const GAME_TIME = document.querySelector('.game-time');

let cardList1 = [];
let cardList2 = [];
let cardPosition1 = 0;
let cardPosition2 = 0;
let moveNum = Number();
let secondCount;
let setTimer;
let hours;
let minutes;
let seconds;

function startGame() {
  secondCount = 0;
  showTimer();
  shuffle(CARDS);
  layoutCards();
}

function showTimer() {
  // Calculate current hours, minutes, and seconds and display a timer
  let h = Math.floor(secondCount/3600);
  let m = Math.floor((secondCount % 3600)/60);
  let s = Math.floor(secondCount % 60)
  // Add a leading zero if the values are less than ten
  hours = (h < 10) ? '0' + h : h;
  minutes = (m < 10) ? '0' + m : m;
  seconds = (s < 10) ? '0' + s : s;
  // Add the timer into the score panel area
  TIMER.innerHTML = hours + ':' + minutes + ':' + seconds;
  // Increment the second counter by one and set the timer going.
  secondCount++;
  setTimer = setTimeout(showTimer, 1000);
}

function shuffle(CARDS) {
    let currentIndex = CARDS.length, temporaryValue, randomIndex;

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
    cardPosition1 = evt.target;
    evt.target.classList.add('open','show');
    let CARD1 = evt.target.firstChild.className;
    DECK.removeEventListener('click', lastTurn);
    cardList1.push(CARD1);
    DECK.addEventListener('click', nextTurn);
  } else {alert('Please choose an unturned card!');
};
}

function nextTurn(evt) {
  if (evt.target.className === 'card') {
    cardPosition2 = evt.target;
    evt.target.classList.add('open','show');
    moveNum += 1;
    MOVES_TOTAL.innerHTML = moveNum;
    starRating();
    let CARD2 = evt.target.firstChild.className;
    DECK.removeEventListener('click', nextTurn);
    cardList2.push(CARD2);
    compareCards();
  } else {alert('Please choose an unturned card!');
};
}

function starRating() {
  if (moveNum === 14) {
    STARS.firstElementChild.remove();
  } if (moveNum === 17) {STARS.firstElementChild.remove();
  } if (moveNum === 20) {STARS.firstElementChild.remove();
  } else {
};
}

function compareCards() {
  if (cardList1[0] === cardList2[0]) {
    cardPosition1.classList.add('match');
    cardPosition2.classList.add('match');
    cardList1.pop(cardList1[0]);
    cardList2.pop(cardList2[0]);
    endGame();
  } else {
    cardPosition1.classList.remove('open','show');
    setTimeout(function delayedRemove() {
    cardPosition2.classList.remove('open','show');
  }, 500);
  cardList1.pop(cardList1[0]);
  cardList2.pop(cardList2[0]);
  DECK.addEventListener('click', lastTurn);
};
}

function endGame() {
  const GAME_STATE = document.querySelectorAll('.match');
  if (GAME_STATE.length === 4) {
    clearTimeout(setTimer);
    congratsScreen();} else {
  DECK.addEventListener('click', lastTurn);
}
}

function congratsScreen() {
// open the congratulations screen(modal).
CONGRATS_MODAL.style.display = "block";
let STAR_NUMBER = document.querySelectorAll('.fa-star').length;
STAR_TOTAL.innerHTML = ("    " + STAR_NUMBER);
GAME_TIME.innerHTML = "    " + hours + " Hours, " + minutes + " Minutes and " + seconds + " Seconds.";
// click the restart button, to close the modal and start the game again.
PLAY_AGAIN.addEventListener('click', function() {
  CONGRATS_MODAL.style.display = "none";
  clearDeck();
});
}

function clearDeck() {
  if (cardPosition1.className === 'card open show') {
    cardPosition1.classList.remove('open','show');
    cardList1.pop(cardList1[0]);
    DECK.removeEventListener('click', nextTurn);
  };
  clearTimeout(setTimer);
  DECK.hidden = true;
  while (DECK.firstChild) {
  DECK.removeChild(DECK.firstChild);
} DECK.hidden = false;
  clearStars();
}

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
  moveNum = 0;
  MOVES_TOTAL.innerHTML = moveNum;
  startGame();
}

startGame();
