// TicTacToe

// User Story: I can choose whether I want to play as X or O.
// User Story: I can play a game of Tic Tac Toe with the computer.
// User Story: My game will reset as soon as it's over so I can play again.





//'use strict';  // Recommended as best practice, but disabled as issues with jshint stating "$ is not defined"


// create a gameboard to store player positions

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


// define player and computer symbols, x and x

var playerSymbol = "";
var computerSymbol = "";

// array of winning plays

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
// Ignore this... not sure if I will use zero-based or standard numbering
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
//     [1,4,7],
//     [2,5,8],
//     [3,6,9],
//     [1,5,9],
//     [3,5,7]
// ];

function play(board, playerSymbol, computerSymbol) {

} // end play

$('document').ready(function(){

    // ask whether player should be x or 0
    $('#launch').click(function() {

        var playerInput = prompt("Would you like to be x or o?", "X or O").toUpperCase();
        while (playerInput !== 'X' && playerInput !== 'O') {
            playerInput = prompt("Invalid answer: Would you like to be x or o?", "X or O").toUpperCase();
        }

        playerSymbol = playerInput;
        console.log('playerSymbol: ' + playerSymbol);
        if (playerSymbol === 'X') {
            computerSymbol = 'O';
        } else if (playerSymbol === 'O') {
            computerSymbol = 'X';
        }
        console.log('computerSymbol: ' + computerSymbol);

        // Game starts
        while (  availableCells.length > 0 ) { // while no winner and board not full  !winner &&
            // computer goes first, chooses an available square (at random... later with AI?) and square is updated with piece
            var randomAvailableCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            availableCells.splice( availableCells.indexOf(randomAvailableCell), 1);
            board[randomAvailableCell] = computerSymbol;
            //console.log('availableCells after splice: ' + availableCells);
            //console.log('board after adding a position: ' + board);
            // check for winner
            for (var i = 0; i < winningPlays.length; i++) {
                if ( board[ winningPlays[i][0] ] === computerSymbol &&
                     board[ winningPlays[i][1] ] === computerSymbol &&
                     board[ winningPlays[i][2] ] === computerSymbol ) {
                         console.log('computer won!');  // seems to work!
                         break;  // not sure how to break out and go back to the if and the while loops? Will this do it?
                }

            }



        }


        //  if it is the users turn, wait for user to click on a square to choose, and the square is updated with the player piece
        //  then back and forth
        // }

        //play(board, playerSymbol, computerSymbol);

    });

});  // end document ready


// while (board contains at least one null or no winner) {
//     //     computer goes first, chooses an available square (at random... later with AI?) and square is updated with piece
//     //     check for winner
//     //     if it is the users turn, wait for user to click on a square to choose, and the square is updated with the player piece
//     //     then back and forth
// }
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
