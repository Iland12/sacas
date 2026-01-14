/* --- STATE --- */
let squares = Array(9).fill(null);
let xIsNext = true;

/* --- DOM ELEMENTS --- */
const squareElements = document.querySelectorAll(".square");
const statusElement = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const bigTurnDisplay = document.getElementById("bigTurnDisplay");

/* --- LOGIC --- */
function handleClick(index) {
  const winnerInfo = calculateWinner(squares);
  if (winnerInfo || squares[index]) return;

  squares[index] = xIsNext ? "X" : "O";
  xIsNext = !xIsNext;
  render();
}

function handleReset() {
  squares = Array(9).fill(null);
  xIsNext = true;
  render();
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/* --- RENDER FUNCTION --- */
function render() {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];
  const isDraw = !winner && squares.every((sq) => sq !== null);

  // 1. Update Board
  squareElements.forEach((sq, index) => {
    sq.textContent = squares[index];
    sq.classList.remove("square--winning");
    if (winningLine.includes(index)) {
      sq.classList.add("square--winning");
    }
  });

  // 2. Update BIG HEADER & STATUS
  if (winner) {
    // Winner State
    bigTurnDisplay.textContent = `VICTORY: ${winner}!`;
    bigTurnDisplay.className = "turn-display turn-winner";

    statusElement.textContent = "GAME OVER";
    statusElement.classList.add("status-visible");
    statusElement.style.color = "#fbbf24"; // Gold
  } else if (isDraw) {
    // Draw State
    bigTurnDisplay.textContent = "DRAW GAME";
    bigTurnDisplay.className = "turn-display";
    bigTurnDisplay.style.color = "#94a3b8";

    statusElement.textContent = "NO WINNER DETECTED";
    statusElement.classList.add("status-visible");
    statusElement.style.color = "#94a3b8";
  } else {
    // Active State
    const player = xIsNext ? "X" : "O";
    bigTurnDisplay.textContent = `PLAYER ${player}'S TURN`;
    bigTurnDisplay.className = `turn-display turn-${player.toLowerCase()}`;
    bigTurnDisplay.style.color = ""; // Reset inline color

    statusElement.classList.remove("status-visible"); // Hide "Game Over" text while playing
  }
}

/* --- INIT --- */
squareElements.forEach((sq) => {
  sq.addEventListener("click", () => {
    const index = parseInt(sq.getAttribute("data-index"));
    handleClick(index);
  });
});
resetBtn.addEventListener("click", handleReset);
render();
