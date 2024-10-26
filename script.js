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

    const putX = () => Gameboard.fillCell(player1);
    const putO = () => Gameboard.fillCell(player2);

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

    const play = () => {
        console.clear();
        Gameboard.clearBoard();
        Gameboard.displayBoard();
        let changer = true;
        while(Gameboard.getBoard().some((element) => element == "")) {
            let currentPlayer = changer ? player1 : player2;
            changer ? putX() : putO();
            displayController.refreshBoard();
            console.clear();
            Gameboard.displayBoard();
            if(checkForWins()) {
                console.log(`${currentPlayer.name} wins!`);
                break;
            };

            changer = changer ? false : true;
        };
        if(checkForWins() == false) {
            console.log("Tie!");
        };
    };

    const startGame = () => {
        let currentPlayer = player1;
        Gameboard.clearBoard();
        cells.forEach((cell, index) => {
            const board = Gameboard.getBoard();
            cell.addEventListener("click", () => {
                if(Gameboard.fillCell(index, currentPlayer)) {
                    displayController.refreshBoard();

                    if(checkForWins()) {
                        alert("win")
                    };

                    if(board.every((element) => element != "") && checkForWins() == false) {
                        alert("tie!")
                    }

                    if(currentPlayer == player1) {
                        currentPlayer = player2;
                    } else if(currentPlayer == player2) {
                        currentPlayer = player1;
                    };
                }

            });
        });
    };

    return { putX, putO, play, checkForWins, startGame };
})();

const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    
    // Updates DOM info
    function refreshBoard() {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    return { refreshBoard };
})();