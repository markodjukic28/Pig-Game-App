// Selecting elements
const players = [document.querySelector('.player--0'), document.querySelector('.player--1')];
const scoresEl = [document.getElementById('score--0'), document.getElementById('score--1')];
const currentsEl = [document.getElementById('current--0'), document.getElementById('current--1')];
const diceEl = document.querySelector('.dice');
const [btnNew, btnRoll, btnHold] = document.querySelectorAll('.btn');

// Game variables
let scores, currentScore, activePlayer, playing;

// Initialize game state
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoresEl.forEach(el => (el.textContent = 0));
  currentsEl.forEach(el => (el.textContent = 0));

  diceEl.classList.add('hidden');
  players.forEach(player => player.classList.remove('player--winner', 'player--active'));
  players[0].classList.add('player--active');
};
init();

const switchPlayer = function () {
  currentsEl[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  players.forEach(player => player.classList.toggle('player--active'));
};

// Roll dice event
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      currentsEl[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold score event
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    scoresEl[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      players[activePlayer].classList.add('player--winner');
      players[activePlayer].classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// New game reset event
btnNew.addEventListener('click', init);
