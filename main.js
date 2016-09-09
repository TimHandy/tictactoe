// TicTacToe

// User Story: I can choose whether I want to play as X or O.
// User Story: I can play a game of Tic Tac Toe with the computer.
// User Story: My game will reset as soon as it's over so I can play again.


//'use strict';  // Recommended as best practice, but disabled as issues with jshint stating "$ is not defined"

var playerSymbol = "";
var computerSymbol = "";
var winner = false;

var board = [
    null, null, null,
    null, null, null,
    null, null, null
];

var availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// board positions match the array positions:
// 0 1 2
// 3 4 5
// 6 7 8

var winningPlays = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function askPlayerToChooseXorO() {
    var playerInput = prompt("Would you like to be x or o?", "X or O").toUpperCase();
    while (playerInput !== 'X' && playerInput !== 'O') {
        playerInput = prompt("Invalid answer: Would you like to be x or o?", "X or O").toUpperCase();
    }
    return playerInput;
}

function setComputerSymbol(playerSymbol) {
    if (playerSymbol === 'X') {
        return 'O';
    } else if (playerSymbol === 'O') {
        return 'X';
    }
}

function randomAvailableCell(availableCells) {
    return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function computerTurn(availableCells, board) {
    // choose a random available cell
    var cellChoice = randomAvailableCell(availableCells);
    // update board with cellChoice
    board[cellChoice] = computerSymbol;
    // update availableCells array
    availableCells.splice( availableCells.indexOf(cellChoice), 1);
}

function playerTurn() {
    // do some stuff, click handlers and shit
    //  if it is the users turn, wait for user to click on a square to choose, and the square is updated with the player piece
}

function checkWinner(board, computerSymbol, playerSymbol) {  // QUESTION: if the args here are globals, do we still need to pass them in, or can we just leave them out?
    for (var i = 0; i < winningPlays.length; i++) {
        if ( board[ winningPlays[i][0] ] === computerSymbol &&
             board[ winningPlays[i][1] ] === computerSymbol &&
             board[ winningPlays[i][2] ] === computerSymbol ) {
                 winner = true;
                 return 'Computer Wins... you moron!';
                 //resetGame somehow
        }
        if
        ( board[ winningPlays[i][0] ] === playerSymbol &&
             board[ winningPlays[i][1] ] === playerSymbol &&
             board[ winningPlays[i][2] ] === playerSymbol ) {
                 winner = true;        // QUESTION: Is there a better way to do the winner and break out of the loop?
                 return 'Player wins!';
                 //resetGame somehow
        }
    }
}


$('document').ready(function(){

    // Wait for player to click Launch Game button
    $('#launch').click(function() {

        playerSymbol = askPlayerToChooseXorO();
        console.log('Player chooses: ' + playerSymbol);
        computerSymbol = setComputerSymbol(playerSymbol);
        console.log('Computer Symbol: ' + computerSymbol);

        while (!winner) { // while no winner and board not full
            // computer goes first, chooses an available square (at random... later with AI?) and square is updated with piece
            console.log('board before: ' + board);
            console.log('availableCells before splice: ' + availableCells);
            computerTurn(availableCells, board);
            //playerTurn();
            console.log( checkWinner(board, computerSymbol, playerSymbol) );
            console.log('board after: ' + board);
            console.log('availableCells after splice: ' + availableCells);

            if (availableCells.length === 0) {  // extract to an isTie function?
                console.log("It's a tie, tough luck");
                // resetGame somehow
            }
        }
    });
});  // end document ready



//
// if (there is a winner) {
//     declare the winner
//     reset the game
// } else {
//     if board has no null
//     declare a tie
//     reset the game
// }
//
//
//
// function checkWinner(board) {
//     for (var i = 0; i < winningPlays.length; i++) {
//         if ( board[winningPlay[i][0]] ) {
//             winner is x
//         }
//     }
//
//
//
//
//
//
//         if (winningPlay array has 3 o) {
//             winner is o
//         }
// }
