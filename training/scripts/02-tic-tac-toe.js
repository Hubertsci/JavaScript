let game = JSON.parse(localStorage.getItem('game')) || {
  moves: ['','','','','','','','',''],
  moveCounter: 0,
  player1: {
    id: 1,
    name: '',
    score: 0
  },
  player2: {
    id: 2,
    name: '',
    score: 0
  },
  activePlayer: {},
  firstPlayer: {},
  gameOn: true,
  draw: false,
};
let {moves, moveCounter, player1, player2, activePlayer, firstPlayer, gameOn, draw} = game;
if (Object.keys(activePlayer).length === 0) {
  activePlayer = player1;
};
if (Object.keys(firstPlayer).length === 0) {
  firstPlayer = player1;
};

let timeoutId;
const gameContainer = document.querySelector('.js-game-container');

function preGame() {
  gameContainer.innerHTML = '<div><h3>Player 1:</h3><input placeholder="Enter name..." maxlength="10" class="js-name-input" onkeydown="handleInput1Keydown(event);" /> <button class="submit-button js-submit-name1-button">Submit</button></div>';
  document.querySelector('.js-name-input').focus();

  const submitButton1 = document.querySelector('.js-submit-name1-button');
  
  submitButton1.addEventListener('click', () => {
    player1Submit();
  })
}

function player1Submit() {
  const inputValue = document.querySelector('.js-name-input').value;
    
  if (inputValue) {
    player1.name = inputValue;
    gameContainer.innerHTML = '<div><h3>Player 2:</h3><input placeholder="Enter name..." maxlength="10" class="js-name-input" onkeydown="handleInput2Keydown(event);" /> <button class="submit-button js-submit-name2-button">Submit</button></div>';
    document.querySelector('.js-name-input').focus();

    const submitButton2 = document.querySelector('.js-submit-name2-button');
    
    submitButton2.addEventListener('click', () => {
      player2Submit();
    })
  }
}

function player2Submit() {
  const inputValue2 = document.querySelector('.js-name-input').value;
  
  if (inputValue2) {
    player2.name = inputValue2;
    displayGame();
  }
}

function handleInput1Keydown(event) {
  if (event.key === 'Enter') {
    player1Submit();
  }
}

function handleInput2Keydown(event) {
  if (event.key === 'Enter') {
    player2Submit();
  }
}

function playAgain() {
  moves = ['','','','','','','','',''];
  moveCounter = 0;
  gameOn = true;
  draw = false;
  document.querySelector('.js-play-again-button').disabled = true;
  if (firstPlayer === player1) {
    activePlayer = player2;
    firstPlayer = player2;
  } else {
    activePlayer = player1;
    firstPlayer = player1;
  }
  score1Display();
  score2Display();
  ticTacToe();
}

function resetGame() {
  localStorage.removeItem('game');
  moves = ['','','','','','','','',''];
  moveCounter = 0;
  player1.score = 0;
  player2.score = 0;
  firstPlayer = player1;
  activePlayer = player1;
  gameOn = true;
  draw = false;
  preGame();
}

function drawGameField() {
  gameContainer.innerHTML = '<div class="move-info-container js-move-info"></div><div class="game-field-container js-game-field-container"></div><div class="messages-container"><div class="js-player1-score player1-score-container"></div><div class="js-disappear-message disappear-message-container"></div><div class="js-player2-score player2-score-container"></div></div><div><button class="js-play-again-button game-button">Play again</button><button class="js-reset-button game-button">Reset game</button></div>';
}

function displayGame() {
  drawGameField();
  const playAgainButton = document.querySelector('.js-play-again-button');
  const resetButton = document.querySelector('.js-reset-button');

  playAgainButton.disabled = true;
  playAgainButton.addEventListener('click', () => {
    playAgain();
  })
  resetButton.addEventListener('click', () => {
    resetGame();
  })
  score1Display();
  score2Display();
  ticTacToe();
}

function popMessage(message, time) {
  const messageField = document.querySelector('.js-disappear-message');
  messageField.innerHTML = `<p>${message}</p>`;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    if (messageField) {
      messageField.innerHTML = '';
    }
  }, time);
}

function score1Display() {
  document.querySelector('.js-player1-score').innerHTML = `<p class="score">${player1.name}: ${player1.score}</p>`;
}

function score2Display() {
  document.querySelector('.js-player2-score').innerHTML = `<p class="score">${player2.name}: ${player2.score}</p>`;
}

function refreshButtons() {
  const field = document.querySelector('.js-game-field-container');
  field.innerHTML = '';
  moves.forEach((move, index) => {
    if (move==='') {
      field.innerHTML += '<button class="move-button js-move-button"></button>'
    } else if (move==='x') {
      field.innerHTML += '<button class="moved-button js-move-button">x</button>'
    } else if (move==='o') {
      field.innerHTML += '<button class="moved-button js-move-button">o</button>'
    }
  });
}

function displayActivePlayer() {
  document.querySelector('.js-move-info').innerHTML = `<p>Move: ${activePlayer.name}</p>`;
}

function handleMoves() {
  document.querySelectorAll('.js-move-button').forEach((moveButton, index) => {
    moveButton.addEventListener('click', () => {
      if (activePlayer.id === 1 && moves[index] === '') {
        moves[index] = 'x';
        activePlayer = player2;
        moveCounter++;
        ticTacToe();
      } else if (activePlayer.id === 2 && moves[index] === '') {
        moves[index] = 'o';
        activePlayer = player1;
        moveCounter++;
        ticTacToe();
      } else {
        popMessage('Incorrect move!', 1000);
      }
    })
  });
}

function checkResult() {
  if (moves[0]!=='' && moves[0]===moves[1] && moves[1]===moves[2]) {
    gameOn = false;
  } else if (moves[3]!=='' && moves[3]===moves[4] && moves[4]===moves[5]) {
    gameOn = false;
  } else if (moves[6]!=='' && moves[6]===moves[7] && moves[7]===moves[8]) {
    gameOn = false;
  } else if (moves[0]!=='' && moves[0]===moves[3] && moves[3]===moves[6]) {
    gameOn = false;
  } else if (moves[1]!=='' && moves[1]===moves[4] && moves[4]===moves[7]) {
    gameOn = false;
  } else if (moves[2]!=='' && moves[2]===moves[5] && moves[5]===moves[8]) {
    gameOn = false;
  } else if (moves[0]!=='' && moves[0]===moves[4] && moves[4]===moves[8]) {
    gameOn = false;
  } else if (moves[2]!=='' && moves[2]===moves[4] && moves[4]===moves[6]) {
    gameOn = false;
  } else if (moveCounter === 9) {
    gameOn = false;
    draw = true;
  }
}

function ticTacToe() {
  refreshButtons();
  if (moveCounter >= 5) {
    checkResult();
  };
  game = {
    moves,
    moveCounter,
    player1,
    player2,
    activePlayer,
    firstPlayer,
    gameOn,
    draw,
  };
  localStorage.setItem('game', JSON.stringify(game));
  if (gameOn) {
    displayActivePlayer();
    handleMoves();
  } else if (draw) {
    popMessage(`Game over! Draw.`, 5000);
    document.querySelector('.js-play-again-button').disabled = false;
  } else {
    const winner = (activePlayer.id === 1) ? player2 : player1;
    popMessage(`Game over! <br>Winner: ${winner.name}`, 5000);
    winner.score++;
    score1Display();
    score2Display();
    document.querySelector('.js-play-again-button').disabled = false;
  }
}

if (player2.name) {
  displayGame();
} else {
  preGame();
}
