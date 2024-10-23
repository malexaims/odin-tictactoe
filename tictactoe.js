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
        this.token = 0;
    }
    placeTokenOnCell = (player) => {
        this.token = player.token
    }
    
    getToken = () => this.token;
    showToken = () => this.token.toString();
}

// TODO: Create Cell class or factory function?
// TODO: Create GameController class

let testBoard = new GameBoard(6, 6);
testBoard.createStartingBoard();
testBoard.printBoard();

testPlayer = new Player("Bob", "X");
testBoard.placeToken(1, 1, testPlayer);
testBoard.printBoard();