/*
    Attribution to:
    http://stackoverflow.com/a/2450976 for the shuffle function(already in the udacity project starter code).
*/

const CARDS = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"]

const DECK = document.querySelector('.deck');

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
}

function flipCards() {
  DECK.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'li'); {
      evt.target.classList.add('open','show');
    }
  });
}

shuffle(CARDS);
layoutCards();
flipCards();
