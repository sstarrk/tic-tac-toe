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

    const fillCell = (player) => {
        let cellNumber = prompt("Fill the cell: ");
        if(board[cellNumber - 1] == "") {
            board[cellNumber - 1] = player.sign;
        } else {
            console.log("This cell is already occupied. Choose another one");
            fillCell(player);
        }
    };

    return { getBoard, displayBoard, fillCell };
})();

function Player(name, sign) {
    return { name, sign }
};

const game = (() => {
    const player1 = Player("Player1", "X");
    const player2 = Player("Player2", "O");

    const putX = () => Gameboard.fillCell(player1);
    const putO = () => Gameboard.fillCell(player2);

    const play = () => {
        Gameboard.displayBoard();
        let changer = true;
        while(Gameboard.getBoard().some((element) => element == "")) {
            if(changer == true) {
                putX();
                console.clear();
                Gameboard.displayBoard();
                changer = false;
            } else if(changer == false) {
                putO();
                console.clear();
                Gameboard.displayBoard();
                changer = true;
            };
        };
    };

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

    return { putX, putO, play, checkForWins };
})();
