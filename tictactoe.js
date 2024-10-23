class Player {
    constructor(name, token){
        this.name = name;
        this.token = token;
    }
    getName = () => this.name;
}

class GameBoard {
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
    }
    createStartingBoard = () => {
        this.board = [];
        for (let i = 0; i < this.rows; i++){
            this.board[i] = [];
            for (let j = 0; j < this.columns; j++){
                this.board[i].push(new Cell());
            }
        }
    }

    accessCell = (row, column) => this.board[row][column];

    getBoard = () => this.board;

    printBoard = () => {
        let boardWithTokens = 
            this.board.map((row) => 
                row.map((cell) => 
                    cell.showToken()));
        console.log(boardWithTokens); 
    }

    placeToken = (row, column, player) => {
        let targetCell = this.accessCell(row, column);
        targetCell.placeTokenOnCell(player);
    }
}

class Cell {
    constructor(){
        this.token = '-';
    }
    placeTokenOnCell = (player) => {
        this.token = player.token
    }
    
    getToken = () => this.token;
    showToken = () => this.token.toString();
}

class GameController{
    constructor(player1, player2, gameboard){
        this.player1 = player1;
        this.player2 = player2;
        this.gameboard = gameboard;
        this.currentPlayer = player1;
        this.turns = 0;
        this.maxTurns = this.gameboard.rows * this.gameboard.columns;
        this.gameOver = false;
    }

    switchPlayer = () => {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    checkWin = () => {
        let board = this.gameboard.getBoard();
        for (let r = 0; r < this.gameboard.rows; r++){
            if (this.checkLine(board[r])) return true;
        }

        for (let c = 0; c < this.gameboard.columns; c++){
            let column = board.map(row => row[c]);
            if (this.checkLine(column)) return true; 
        }

        let diag1 = []; //Upper left to lower right
        let diag2 = []; //Upper right to lower left
        for (let i = 0; i < this.gameboard.rows; i++){
            diag1.push(board[i][i]);
            diag2.push(board[i][this.gameboard.columns - i - 1]);
        }
        if (this.checkLine(diag1) || this.checkLine(diag2)) return true;

        return false;
    }

    checkLine = (line) => {
        // Ensure all tokens are equal and not the default token '-'
        return line.every(cell => cell.getToken() !== '-' && cell.getToken() === line[0].getToken());
    }

    playTurn = (row, column) => {
        if (this.gameOver){
            console.log("Game is over. Please restart.");
            return;
        }

        if (this.gameboard.accessCell(row, column).getToken() === '-'){
            this.gameboard.placeToken(row, column, this.currentPlayer);
            this.turns++;

            if (this.checkWin()) {
                console.log(`Winner is ${this.currentPlayer.getName()}!`);
                this.gameOver = true;
            }
            else if (this.turns === this.maxTurns){
                console.log("Draw!");
                this.gameOver = true;
            }
            else {
                this.switchPlayer();
            }
        }
        else {
           console.log(`A player's token has already been placed at ${row}, ${column}. Choose another location.`); 
        }

    }

    restartGame = () => {
        this.gameboard.createStartingBoard();
        this.turns = 0;
        this.gameOver = false;
        this.currentPlayer = this.player1;
        console.log("Game restarted!");
    }


}


let testBoard = new GameBoard(3, 3);
testBoard.createStartingBoard();

player1 = new Player("Bob", "X");
player2 = new Player("Sally", "0");

game = new GameController(player1, player2, testBoard);

game.playTurn(0,0);
game.playTurn(1,1)

testBoard.printBoard();
