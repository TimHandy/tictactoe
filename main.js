// TicTacToe

// User Story: I can choose whether I want to play as X or O.
// User Story: I can play a game of Tic Tac Toe with the computer.
// User Story: My game will reset as soon as it's over so I can play again.


//'use strict';  // Recommended as best practice, but disabled as issues with jshint stating "$ is not defined"

var playerSymbol = "";
var computerSymbol = "";
var winner = false;     // QUESTION: does this need to be global? is this the right thing to do?

var board = [];

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

function getRandomAvailableCell(availableCells) {
    return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function computerTurn(availableCells, board) {
    // TODO: enter a short delay to mimick some computer thinking before computer chooses a square
    console.log('board before: ' + board);
    console.log('availableCells before splice: ' + availableCells);

    // choose a random available cell
    var cellChoice = getRandomAvailableCell(availableCells);
    // update board with cellChoice
    board[cellChoice] = computerSymbol;
    $("#"+cellChoice).html(computerSymbol);

    // update availableCells array
    availableCells.splice( availableCells.indexOf(cellChoice), 1);


    console.log('board after: ' + board);
    console.log('availableCells after splice: ' + availableCells);
    console.log( checkWinner(board, computerSymbol, playerSymbol) );
}


function checkWinner(board, computerSymbol, playerSymbol) {  // QUESTION: if the args here are globals, do we still need to pass them in, or can we just leave them out? Think the Functional style would say to pass them in so that the function stays pure?
    for (var i = 0; i < winningPlays.length; i++) {
        if ( board[ winningPlays[i][0] ] === computerSymbol &&
             board[ winningPlays[i][1] ] === computerSymbol &&
             board[ winningPlays[i][2] ] === computerSymbol ) {
                 winner = 'Computer';
                 $(".feedback").html('Computer Wins... you moron!');
        } else if ( board[ winningPlays[i][0] ] === playerSymbol &&
                    board[ winningPlays[i][1] ] === playerSymbol &&
                    board[ winningPlays[i][2] ] === playerSymbol ) {
                 winner = 'Player';        // QUESTION: Is there a better way to do the winner and break out of the loop?
                 $(".feedback").html('You win, you beat a computer that has zero artificial intelligence; you should be proud!');
        } else if (availableCells.length === 0 && !winner) {
        // TODO: Extract to an isTie function?
        $(".feedback").html("It's a tie, pathetic!"); //TODO: extract to a renderResult function.
        }
    }
}

function resetBoard() {
    playerSymbol = "";
    computerSymbol = "";
    winner = false;
    board = [];
    availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $(".cell").html("");
    $(".feedback").html("");
}


$('document').ready(function(){

    // Wait for player to click Launch Game button, then set the X and O
    $('#launch').click(function() {
        if (playerSymbol === "") {
            playerSymbol = askPlayerToChooseXorO();
            console.log('Player chooses: ' + playerSymbol);
            computerSymbol = setComputerSymbol(playerSymbol);
            console.log('Computer Symbol: ' + computerSymbol);

            // This permits computer to start the game. Omit this to allow user to start first.
            computerTurn(availableCells, board, computerSymbol);
        }
    });

    // Wait for a player click, then run one iteration of the game
    $(".cell").click(function() {
        if (!winner && playerSymbol !== "") {
            // TODO: Extract player bit to it's own playerTurn function
            var cellChoice = parseInt($(this).attr('id'));
            if ( availableCells.includes(cellChoice) ){
                $(this).html(playerSymbol);
                // update board with player cellChoice
                board[cellChoice] = playerSymbol;
                // update availableCells array
                availableCells.splice( availableCells.indexOf(cellChoice), 1);
                checkWinner(board, computerSymbol, playerSymbol);
                computerTurn(availableCells, board);
            }

        }
    });

    // Reset Game
    $("#reset").click(resetBoard);

});  // end document ready


// TODO: Add AI to the computer choice algorithm.
// TODO: pretty it up!
// TODO: Computer always goes first in this... maybe
// TODO: "My game will reset as soon as it's over so I can play again." - if I reset the board, you won't see the final board positions? How do the others display this and reset? Maybe a pop up "Do you want to reset?"
