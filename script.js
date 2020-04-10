// for human vs human
let gameArr = ["", "", "", "", "", "", "", "", ""];
const display = document.querySelector('#status');

const players = (() => {
    //current player
    let player = 'X';

    // display messages
    const win = () => `Player ${player} has won!`;
    const draw = () => `Game ended in a draw!`;
    const currentTurn = () => `It's ${player}'s turn`;

    return {player, win, draw, currentTurn}
})();

const game = (() => {
    const cellClick = (click) => {
        const clicked = click.target;
        const index = parseInt(clicked.getAttribute('id'));
        if (gameArr[index] !== "") return;
        gameArr[index] = players.player;
        clicked.innerHTML = players.player;
        gameState();
    }

    const gameState = () => {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let round = false;
        for(let i=0; i <=7; i++) {
            let winner = winCondition[i];
            let a = gameArr[winner[0]];
            let b = gameArr[winner[1]];
            let c = gameArr[winner[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                round = true;
                break
            }
        }
        if(round) {
            display.innerHTML = players.win();
            return;
        }
        let draw = !gameArr.includes("");
        if (draw) {
            display.innerHTML = players.draw();
            return;
        }
        playerChange();
    };

    const playerChange = () => {
        players.player = players.player === 'X' ? 'O' : 'X';
        display.innerHTML = players.currentTurn();
    }

    const restartGame = () => {};
    return {cellClick, gameState, restartGame};
})();


const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', game.cellClick));

document.querySelector('#restart').addEventListener('click', game.restartGame);
