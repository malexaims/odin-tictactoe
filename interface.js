import { Player, GameBoard, GameController } from './tictactoe.js';

const gameBoardElement = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const statusMessage = document.getElementById('statusMessage');

// Create players
const player1 = new Player('Bob', 'X');
const player2 = new Player('Sally', 'O');

// Initialize game board and controller
const gameBoard = new GameBoard(3, 3);
gameBoard.createStartingBoard();
const gameController = new GameController(player1, player2, gameBoard);

// Function to render the board
function renderBoard() {
    gameBoardElement.innerHTML = ''; // Clear the current board UI
    gameBoard.getBoard().forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = cell.getToken(); // Display the token in the cell
            cellDiv.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
            gameBoardElement.appendChild(cellDiv);
        });
    });
}

// Handle a cell being clicked
function handleCellClick(row, col) {
    if (gameController.gameOver) {
        statusMessage.textContent = "Game over. Restart to play again!";
        return;
    }

    // Play turn and update the board
    gameController.playTurn(row, col);
    renderBoard();

    // Check game status
    if (gameController.gameOver) {
        statusMessage.textContent = 
            gameController.turns === gameController.maxTurns 
                ? "It's a draw!" : `${gameController.currentPlayer.getName()} wins!`;
    } else {
        statusMessage.textContent = `Current Player: ${gameController.currentPlayer.getName()}`;
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    gameController.restartGame();
    renderBoard();
    statusMessage.textContent = `Current Player: ${gameController.currentPlayer.getName()}`;
});

// Initial render
renderBoard();
statusMessage.textContent = `Current Player: ${gameController.currentPlayer.getName()}`;
