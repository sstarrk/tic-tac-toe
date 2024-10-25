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

    // Now fills only X for test. Need to change later. 
    const fillCell = (player) => {
        let cellNumber = prompt("Fill the cell: ");
        if(board[cellNumber - 1] == "") {
            board[cellNumber - 1] = player.sign;
        } else {
            console.log("This cell is already occupied. Choose another one");
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

    return { putX, putO };
})();
