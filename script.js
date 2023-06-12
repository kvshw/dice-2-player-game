'use strict';

const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const currentPlayerEL0 = document.querySelector('.player--0');
const currentPlayerEL1 = document.querySelector('.player--1');
const scores = [0, 0];

let curScore = 0;
let activePlayer = 0;

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const changeActivePlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentPlayerEL0.classList.toggle('player--active');
  currentPlayerEL1.classList.toggle('player--active');
};

//Rolling button functionality
btnRoll.addEventListener('click', () => {
  //1) generate random dice
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2) display dice
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${dice}.png`;
  //3) check for rolled and if it's 1 reset score and switch to next player.
  if (dice !== 1) {
    curScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = curScore;
  } else {
    changeActivePlayer();
  }
});

// Hold button functionality

btnHold.addEventListener('click', () => {
  //add current score to active player's score
  scores[activePlayer] += curScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //check if the score of the player >= 100
  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    changeActivePlayer();
  }
  //end the game

  //switch player
});
