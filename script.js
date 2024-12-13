const gameBoard = (function () {
    const createBoard = function () {
        let board = [];

        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        }
        
        return board;
    };

    const board = createBoard();

    const printBoard = function () {
        console.log(board);
    };

    function dropToken(player, row, column) {

        board[row][column] = player.marker;
    }

    return {board, printBoard, dropToken};
})();

const game = (function() {
    function playerFactory (name1 = 'playerOne', name2 = 'playerTwo') {
        const players = [
            {name: name1, marker: 'X'},
            {name: name2, marker: 'O'},
        ]
        
        return players;
    };

    const players = playerFactory();

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;


    const makeMove = function (row, column) {
        if (gameBoard.board[row][column] === '') {
            gameBoard.dropToken(activePlayer, row, column);
            if (checkGameStatus()) won = true;
            activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
            gameBoard.printBoard();
        } else {
            console.log('That cell is already occupied!');
        }
    }

    let won = false;

    let tie = false;

    const checkGameStatus = function () {
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][1] === gameBoard.board[i][2] && gameBoard.board[i][0] !== '') {
                console.log(`${getActivePlayer().marker} won!`);
            } else if (gameBoard.board[0][i] === gameBoard.board[1][i] && gameBoard.board[1][i] === gameBoard.board[2][i] && gameBoard.board[0][i] !== '') {
                console.log(`${getActivePlayer().marker} won!`);
            }
        }

        if (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][2] && gameBoard.board[0][0] !== '') {
            console.log(`${getActivePlayer().marker} won!`);
        } else if (gameBoard.board[0][2] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][0] && gameBoard.board[0][2] !== '') {
            console.log(`${getActivePlayer().marker} won!`);
        }
    }

    const restartGame = function () {
        for (const row of gameBoard.board) {
            for (let i = 0; i < 3; i++) {
                row[i] = '';
            }
        }

        activePlayer = players[0];
    }


    return {players, getActivePlayer, makeMove, restartGame};
})();