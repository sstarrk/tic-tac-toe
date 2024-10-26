const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const displayBoard = () => {
        console.log(` ${board[0]}  |  ${board[1]}  |  ${board[2]} `);
        console.log("------------");
        console.log(` ${board[3]}  |  ${board[4]}  |  ${board[5]} `);
        console.log("------------");
        console.log(` ${board[6]}  |  ${board[7]}  |  ${board[8]} `);
    };

    const clearBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        displayController.refreshBoard();
    };

    const fillCell = (index, player) => {
        if(board[index] == "") {
            board[index] = player.sign;
            return true;
        } else {
            return false;
        };
    };

    return { getBoard, displayBoard, fillCell, clearBoard };
})();

function Player(name, sign) {
    return { name, sign }
};

const game = (() => {
    const cells = document.querySelectorAll(".cell"); 
    const turn = document.querySelector(".turn");
    
    const player1 = Player("Player1", "X");
    const player2 = Player("Player2", "O");
    
    let currentPlayer = player1;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    const checkForWins = () => {
        const board = Gameboard.getBoard();
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
        });
    };

    const checkForTie = () => {
        const board = Gameboard.getBoard();
        return board.every(cell => cell !== "") && !checkForWins();
    };

    const startGame = () => {
        Gameboard.clearBoard();
        turn.textContent = `${currentPlayer.name}'s turn`;
    };

    cells.forEach((cell, index) => {
        const board = Gameboard.getBoard();
        cell.addEventListener("click", () => {
            if(Gameboard.fillCell(index, currentPlayer)) {
                displayController.refreshBoard();
                if(currentPlayer == player1) {
                    turn.textContent = `${player2.name}'s turn`;
                } else if(currentPlayer == player2) {
                    turn.textContent = `${player1.name}'s turn`;
                };

                if(checkForWins()) {
                    turn.textContent = `${currentPlayer.name} wins!`;
                    return;
                };

                if(checkForTie()) {
                    turn.textContent = "Tie!";
                    return;
                }

                if(currentPlayer == player1) {
                    currentPlayer = player2;
                } else if(currentPlayer == player2) {
                    currentPlayer = player1;
                };
            };
        });
    });
    
    return { checkForWins, startGame };
})();

const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const reset = document.querySelector("#reset");
    
    // Updates DOM info
    function refreshBoard() {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    reset.addEventListener("click", () => {
        game.startGame();
    });

    return { refreshBoard };
})();

game.startGame();