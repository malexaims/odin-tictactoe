import { Player, GameBoard, Cell, GameController } from './tictactoe.js';

// Test function to initialize the game
function initializeGame() {
    let testBoard = new GameBoard(3, 3);
    testBoard.createStartingBoard();
    let player1 = new Player("Bob", "X");
    let player2 = new Player("Sally", "O");
    let game = new GameController(player1, player2, testBoard);
    return { testBoard, player1, player2, game };
}

// Test 1: Initial game state (empty board, no winner)
function testInitialGameState() {
    const { game } = initializeGame();
    console.assert(game.checkWin() === false, "Test 1 Failed: Initial board should have no winner.");
    console.log("Test 1 Passed: Initial game state has no winner.");
}

// Test 2: Place token on the board
function testPlaceToken() {
    const { game } = initializeGame();
    game.playTurn(0, 0); // Player 1 places "X" at (0,0)
    console.assert(game.gameboard.accessCell(0, 0).getToken() === "X", "Test 2 Failed: Token not placed correctly.");
    console.log("Test 2 Passed: Player token placed successfully.");
}

// Test 3: Win on a row
function testWinOnRow() {
    const { game } = initializeGame();
    game.playTurn(0, 0); // Player 1
    game.playTurn(1, 0); // Player 2
    game.playTurn(0, 1); // Player 1
    game.playTurn(1, 1); // Player 2
    game.playTurn(0, 2); // Player 1 wins with row 0
    console.assert(game.checkWin() === true, "Test 3 Failed: Player 1 should have won with a row.");
    console.log("Test 3 Passed: Player 1 wins with a row.");
}

// Test 4: Win on a column
function testWinOnColumn() {
    const { game } = initializeGame();
    game.playTurn(0, 0); // Player 1
    game.playTurn(0, 1); // Player 2
    game.playTurn(1, 0); // Player 1
    game.playTurn(1, 1); // Player 2
    game.playTurn(2, 0); // Player 1 wins with column 0
    console.assert(game.checkWin() === true, "Test 4 Failed: Player 1 should have won with a column.");
    console.log("Test 4 Passed: Player 1 wins with a column.");
}

// Test 5: Win on a diagonal
function testWinOnDiagonal() {
    const { game } = initializeGame();
    game.playTurn(0, 0); // Player 1
    game.playTurn(0, 1); // Player 2
    game.playTurn(1, 1); // Player 1
    game.playTurn(0, 2); // Player 2
    game.playTurn(2, 2); // Player 1 wins with diagonal
    console.assert(game.checkWin() === true, "Test 5 Failed: Player 1 should have won with a diagonal.");
    console.log("Test 5 Passed: Player 1 wins with a diagonal.");
}

// Test 6: Game ends in a draw
function testDrawGame() {
    const { game } = initializeGame();
    game.playTurn(0, 0); // Player 1
    game.playTurn(0, 1); // Player 2
    game.playTurn(0, 2); // Player 1
    game.playTurn(1, 1); // Player 2
    game.playTurn(1, 0); // Player 1
    game.playTurn(1, 2); // Player 2
    game.playTurn(2, 1); // Player 1
    game.playTurn(2, 0); // Player 2
    game.playTurn(2, 2); // Player 1 (draw)
    console.assert(game.checkWin() === false && game.gameOver === true, "Test 6 Failed: Game should have ended in a draw.");
    console.log("Test 6 Passed: Game ends in a draw.");
}

// Test 7: Restart game resets everything
function testRestartGame() {
    const { game } = initializeGame();
    game.playTurn(0, 0); // Player 1 places "X" at (0, 0)
    game.restartGame(); // Restart the game
    console.assert(game.turns === 0 && game.gameOver === false, "Test 7 Failed: Game should be reset.");
    console.assert(game.gameboard.accessCell(0, 0).getToken() === '-', "Test 7 Failed: Board should be reset.");
    console.log("Test 7 Passed: Game restarted successfully.");
}

// Run the tests
testInitialGameState();
testPlaceToken();
testWinOnRow();
testWinOnColumn();
testWinOnDiagonal();
testDrawGame();
testRestartGame();
