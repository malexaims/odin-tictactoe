class Player {
    constructor(name){
        this.name = name;
    }
    getName = () => this.name;
}

class GameBoard {
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;

        this.board = [];
        for (let i = 0; i < this.rows; i++){
            this.board[i] = [];
            for (let j = 0; j < this.columns, j++){
                board[i].push(Cell());
            }
        }

    }
}

// TODO: Create Cell class or factory function?
// TODO: Create GameController class