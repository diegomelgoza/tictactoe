// for human vs human
//only two globals
let gameArr = ["", "", "", "", "", "", "", "", ""];
const display = document.querySelector('#status');

const players = (() => {
    //current player
    let player = 'X';

    // display messages
    const win = (e) => `Player ${e} has won!`;
    const draw = () => `Game ended in a draw!`;
    //const currentTurn = (e) => `It's ${e}'s turn`;

    //if we dont return player then the first move will be undefined
    return {player, win, draw}
})();

// game modules 

const game = (() => {
    const cellClick = (click) => {
        // save the exact cell that was clicked in a variable
        const clicked = click.target;
        // get attribute returns string so use parseInt 
        // to get the number for gameState function
        const index = parseInt(clicked.getAttribute('data-index'));
        // if the cell has been filled it cant be clicked again
        if (gameArr[index] !== '') return;
        // fill the cell with the current player
        gameArr[index] = players.player;
        // make it appear on the ui
        clicked.innerHTML = players.player;
        gameState();
    }
    
    const computerTurn = () => {
        let computer = players.player;
        // choose a number between 0-8
        let random = Math.floor(Math.random() * 8);
        // check if that space is available
        if(gameArr[random] !== '') return computerTurn();
        // fill that slot with 'O'
        gameArr[random] = computer;
        // make it appear on ui
        const cell = document.querySelectorAll('.cell');
        let p = cell[random]
        p.innerHTML = computer;
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
        // loop through to check win condition
        for(let i=0; i <=7; i++) {
            // save win condition array in variable
            // i.e. winner = winCondition[0] = [0,1,2]
            let winner = winCondition[i];
            // create three variable to check win
            let a = gameArr[winner[0]];
            let b = gameArr[winner[1]];
            let c = gameArr[winner[2]];
            // since a user wins when theres three in a row
            // if any of the variables is empty continue loop
            if (a === '' || b === '' || c === '') {
                continue;
            }
            // if all three are equal to each other
            // break out of the for loop
            if (a === b && b === c) {
                round = true;
                break
            }
        }
        // a user wins 
        if(round) {
            display.innerHTML = players.win(players.player);
            return;
        }
        // game is a tie
        let draw = !gameArr.includes("");
        if (draw) {
            display.innerHTML = players.draw();
            return;
        }
        // update turn
        playerChange();
    };

    const playerChange = () => {
        // if 'X' went then its 'O's turn else its 'X' turn
        players.player = players.player === 'X' ? 'O' : 'X';
        // update ui turn
        //display.innerHTML = players.currentTurn(players.player);
        if(players.player === 'O') {
            return computerTurn();
        }
    }

    

    // restart game
    const restartGame = () => {
        gameArr = ["", "", "", "", "", "", "", "", ""];
        players.player = 'X';
        display.innerHTML = '';
        //display.innerHTML = players.currentTurn(players.player);
        const r = document.querySelectorAll('.cell')
        r.forEach(cell => cell.innerHTML = "");
    };
    
    return {cellClick, gameState, restartGame};
})();

// when a cell is clicked go to the module 
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', game.cellClick));

// clear the board
document.querySelector('#restart').addEventListener('click', game.restartGame);
