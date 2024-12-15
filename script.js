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

    const printBoardToConsole = function () {
        console.log(board);
    };

    const printBoard = function (e) {
        if (game.won === false) {
            e.target.textContent = game.getActivePlayer().marker;
        }
    }

    function dropToken(player, row, column) {
        board[row][column] = player.marker;
    }

    const cells = document.querySelector('#game-container-inner').childNodes;

    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            if (e.target.textContent !== '' || game.won === true) {
                return;
            } else {
                printBoard(e);
                game.makeMove(e.target.getAttribute('row'), e.target.getAttribute('column'));
            }
        })
    })

    return {board, printBoardToConsole, dropToken, cells};
})();

const game = (function() {
    const gameFieldTitleBar = document.querySelector('#turn-info');
    const statDisplay = document.querySelector('#stats');

    function playerFactory (name1 = 'playerOne', name2 = 'playerTwo') {
        const players = [
            {name: name1, marker: 'X', winCount: 0},
            {name: name2, marker: 'O', winCount: 0},
        ]
        
        return players;
    };

    const players = playerFactory();

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    let won = false;

    let tie = false;

    const makeMove = function (row, column) {
        if (won === true) {
            return;
        } else if (checkTieStatus()) {
            gameFieldTitleBar.textContent = (`it's a tie!`);
            return;
        }
        if (gameBoard.board[row][column] === '' && won === false) {
            gameBoard.dropToken(activePlayer, row, column);
            if (checkGameStatus()) {
                won = true;
                activePlayer.winCount++;
                activePlayer = (activePlayer === players[0]) ? players[1] : players[0];

                statDisplay.textContent = `X : ${players[0].winCount} - O : ${players[1].winCount}`;

            } else if (won === false) {
            activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
            gameFieldTitleBar.textContent = `${activePlayer.marker}'s turn!`;
            gameBoard.printBoardToConsole();
        }} else {
            console.log('That cell is already occupied!');
        }
    }

    const checkGameStatus = function () {
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][1] === gameBoard.board[i][2] && gameBoard.board[i][0] !== '') {
                gameFieldTitleBar.textContent = (`${getActivePlayer().marker} won!`);
                return true;
            } else if (gameBoard.board[0][i] === gameBoard.board[1][i] && gameBoard.board[1][i] === gameBoard.board[2][i] && gameBoard.board[0][i] !== '') {
                gameFieldTitleBar.textContent = (`${getActivePlayer().marker} won!`);
                return true;
            }
        }

        if (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][2] && gameBoard.board[0][0] !== '') {
            gameFieldTitleBar.textContent = (`${getActivePlayer().marker} won!`);
            return true;
        } else if (gameBoard.board[0][2] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][0] && gameBoard.board[0][2] !== '') {
            gameFieldTitleBar.textContent = (`${getActivePlayer().marker} won!`);
            return true;
        }
    }

    const checkTieStatus = function () {
        let tie = 0;
        for (const row of gameBoard.board) {
            (row[0] !== '' && row[1] !== '' && row[2] !== '') ? tie += 1 : tie = tie;
        }
        return (tie === 2) ? true : false;
    }

    const restartGame = function () {
        for (const row of gameBoard.board) {
            for (let i = 0; i < 3; i++) {
                row[i] = '';
            }
        }

        won = false;
        activePlayer = players[0];

        gameFieldTitleBar.textContent = `${activePlayer.marker}'s turn!`;

        gameBoard.cells.forEach((cell) => {
            cell.textContent = '';
        })
    }

    return {getActivePlayer, makeMove, restartGame, won};
})();

document.querySelector('#reset-btn').addEventListener('click', () => {
    game.restartGame()
});