const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let currentGame = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "X";

const grilleMorpion = document.querySelector('.morpion');
const cases = document.querySelectorAll('[data-cell]');

cases.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-cell');
  
  if (currentGame[index] === '') {
    currentGame[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    const isWinner = checkWinningCondition();

    if (isWinner) {
      const player = document.getElementById("status");
      player.innerHTML = `Le joueur ${currentPlayer} a gagné ! <br><button onclick="reinitialiserJeu()">Rejouer</button>`;
      return;
    }
    
    if (currentGame.every(cell => cell !== '')) {
      const player = document.getElementById("status");
      player.innerHTML = "Match nul ! <br><button onclick=\"reinitialiserJeu()\">Rejouer</button>";
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const player = document.getElementById("status");
    player.innerHTML = `C'est au tour de ${currentPlayer}`;
  }
}

function checkWinningCondition() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      currentGame[a] !== '' &&
      currentGame[a] === currentGame[b] &&
      currentGame[b] === currentGame[c]
    );
  });
}

function reinitialiserJeu() {
  currentGame = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  const player = document.getElementById("status");
  player.innerHTML = `C'est au tour de ${currentPlayer}`;
  cases.forEach(cell => {
    cell.textContent = '';
  });
}
