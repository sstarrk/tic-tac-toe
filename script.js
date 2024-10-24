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

    const fillCell = () => {
        let cellNumber = prompt("Fill the cell: ");
        board[cellNumber - 1] = "X";
    };

    return { getBoard, displayBoard, fillCell };
})();

function Player(name, sign) {
    return { name, sign }
};
