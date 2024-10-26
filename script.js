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
    let score = 0;

    const getScore = () => score;
    const incrementScore = () => score++;
    return { name, sign, getScore, incrementScore }
};

const game = (() => {
    const first = document.querySelector("#first");
    const second = document.querySelector("#second");
    const firstScore = document.querySelector("#third");
    const secondScore = document.querySelector("#fourth");
    const cells = document.querySelectorAll(".cell"); 
    const turn = document.querySelector(".turn");

    const okayButton = document.querySelector(".okay");
    const container = document.querySelector(".container");
    const oname = document.querySelector("#oname");
    const xname = document.querySelector("#xname");

    let player1;
    let player2;
    let currentPlayer;

    okayButton.addEventListener("click", () => {
        if(oname.value !== "" && xname.value !== "") {
            container.style.display = "none";
            player1 = Player(xname.value, "X");
            player2 = Player(oname.value, "O");
            currentPlayer = player1;
            turn.textContent = `${currentPlayer.name}'s turn`;
            first.textContent = player1.name;
            second.textContent = player2.name;
            firstScore.textContent = player1.getScore();
            secondScore.textContent = player2.getScore();
        }
    });

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
                    currentPlayer.incrementScore();
                    firstScore.textContent = player1.getScore();
                    secondScore.textContent = player2.getScore();
                    startGame();
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