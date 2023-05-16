//TicTacToeBoard

//DEFINE THE PAGE ELEMENT VARIABLES::
//1. Next Player Area
const $nextPlayerArea = document.querySelector(".js-next-player");
//2. Gameboard Cell Cubes
const $cellList = document.querySelectorAll(".js-cell");
//3. Game Status
const $gameFinalStatus = document.querySelector(".js-winner");

let gameBoard = new Array(9).fill(null); 
let currentPlayerSymbol = "X";

function clickHandler(event) {
    const boardIndex = event.target.dataset.index;
    if (gameBoard[boardIndex] === null) {
        gameBoard[boardIndex] = currentPlayerSymbol;
        event.target.innerText = currentPlayerSymbol;
        if (hasLastMoverWon()) {
            $gameFinalStatus.innerHTML = `
                Congratulations!<br><br>
                ${currentPlayerSymbol}<br><br>
                You WIN!<br><br>
                <button class="restartButton"
                    onClick="window.location.reload()">RESTART</button>`;
        } else if (gameBoard.every((element) => element !== null)) {
            $gameFinalStatus.innerHTML = `Draw. Game Over.`;
        } else {
            currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
            $nextPlayerArea.innerHTML = `Next Player: ${currentPlayerSymbol}`;
        }
    }
}

for (let $cell of $cellList) {
    $cell.addEventListener("click", clickHandler);
}

//RULES::

function hasLastMoverWon() {
    let winnerCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let [i1, i2, i3] of winnerCombos) {
        if (
            gameBoard[i1] === currentPlayerSymbol &&
            gameBoard[i1] === gameBoard[i2] &&
            gameBoard[i1] === gameBoard[i3]
        ) {
            return true;
        }
    }
    return false;
}