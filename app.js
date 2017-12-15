/*
Add functionality to alternate players to start;
Add localstorage to remember scores */

var boardCanvas = document.querySelector('.grid');
var gamePlayView = document.querySelector('.gamePlayView');
var gridBoxes = document.querySelectorAll('.box');
var playerRound = document.querySelector('.playerNumber');
var player1ScoreLabel = document.querySelector('.player1Wins');
var player2ScoreLabel = document.querySelector('.player2Wins');
var startButton = document.querySelector('button');

var grid = [];
var columns = 3;
var rows = 3;
var winningSeq1 = "XXX";
var winningSeq2 = "OOO";
var turnCounter = 0; //at the start of the game the counter is set to 0
var player1Score = 0;
var player2Score = 0;

//this function returns an array of arrays
var buildGrid = function(columns,rows){
  //build row that holds as many columns as specified

  var row = "i".repeat(columns);
  //push this row into an array as many times as rows needed
  for (var i = 0; i < rows; i++){
    grid.push(row.split(''));
  }
  return grid;
};

//this function creates all horizontal strings in an array of arrays and returns these strings as elements of an array
var createHorizontalStrings = function(array,rows){
  var horizontalStringArray = [];
  for (var i = 0; i < rows; i++ ){
    var horizontalLine = array[i].join('');
    horizontalStringArray.push(horizontalLine);
  }
  return horizontalStringArray;
};

//this function creates all vertical strings in an array of arrays and returns these strings as elements of an array
var createVerticalStrings = function(array,columns,rows){
  var verticalLineArray = [];
  var verticalStringArray = [];
  for (var i = 0; i < columns; i++ ){ //as many strings as columns
    for (var j = 0; j < rows; j ++){ //as many string elements as rows
      var element = array[j][i];
      verticalLineArray.push(element);
    }
    verticalStringArray.push(verticalLineArray.join(''));
    verticalLineArray = [];
 }
  return verticalStringArray;
};

//this function creates all diagonal strings in an array of arrays and returns these strings as elements of an array
//copied from https://stackoverflow.com/questions/35917734/how-do-i-traverse-an-array-diagonally-in-javascript
//updated variable names to increase readability
//bottomToTop takes Boolean value to determine direction of diagonal lines
var createDiagonalStrings = function(array, columns, rows, bottomToTop) {
  var numOfHorLines = columns+rows-1;
  var temp;
  var returnArray = [];
  for (var k = 0; k <= numOfHorLines; k++) {
    temp = [];
      for (var y = rows - 1; y >= 0; --y) {
        var x = k - (bottomToTop ? rows - y : y);
        if (x >= 0 && x < columns) {
          temp.push(array[y][x]);
          }
        }
        if(temp.length > 0) {
            returnArray.push(temp.join(''));
        }
      }
  return returnArray;
};

var checkForWinningSequence = function(array, winningSequence){
  var checkValueArray = [];
  for (var i = 0; i < array.length; i++){
    checkValueArray.push(array[i].includes(winningSequence));
  }
  var checkValue = checkValueArray.includes(true);
  return checkValue; //boolean to indicate whether or not there is a winning sequence in the array
};

//this function calls all of the string creation functions and checks them for the winning sequence
//if one the strings contains the winning sequence, the function returns a boolean true
var checkGrid = function(grid, columns, rows, winningSequence){
  var horizontalWinner = checkForWinningSequence(createHorizontalStrings(grid,rows), winningSequence);
  var verticalWinner = checkForWinningSequence(createVerticalStrings(grid,columns,rows), winningSequence);
  var diagonalWinner1 = checkForWinningSequence(createDiagonalStrings(grid,columns,rows, true), winningSequence);
  var diagonalWinner2 = checkForWinningSequence(createDiagonalStrings(grid,columns,rows, false), winningSequence);
  var checkResultArray = [horizontalWinner, verticalWinner, diagonalWinner1, diagonalWinner2];
  var checkResult = checkResultArray.includes(true);
  return checkResult;
};

var determinePlayer = function(){
  var currentPlayer = {
    symbol: "",
    number: 0
  };
  if (turnCounter % 2 === 0){
    console.log("Player 1 is playing");
    playerRound.textContent = "Player 2 can make their move.";
    currentPlayer.symbol = "X";
    currentPlayer.number = 1;
  } else {
    console.log("Player 2 is playing");
    playerRound.textContent = "Player 1 can make their move.";
    currentPlayer.symbol = "O";
    currentPlayer.number = 2;
  }
  return currentPlayer;
};

var winningRound = function(currentPlayer){
  playerRound.textContent = "We have a winner: the " + currentPlayer.symbol + "'s have won! Well done, player " + currentPlayer.number + "!" ;
  gridBoxes.forEach(function(elem){
    elem.removeEventListener("click", oneRound);
  });
  startButton.classList.add('visible');
  startButton.classList.remove('invisible');
  console.log("Well played.");
  if (currentPlayer.number === 1){
    player1Score ++;
    player1ScoreLabel.textContent = String(player1Score);
    localStorage.setItem('player1Score',player1Score);
  }else{
    player2Score ++;
    player2ScoreLabel.textContent = String(player2Score);
    localStorage.setItem('player2Score',player2Score);
  }
};

var oneRound = function(event){
  //checks who's currently playing (based on turnCounter) in order to put an X or an O on the boardCanvas
  turnCounter = localStorage.getItem('turnCounter',turnCounter);
  var currentPlayer = determinePlayer();
  var position = event.target.id; //returns a string with array index values
  //add the symbol to the boardCanvas
  var targetBox = document.getElementById(position);
  targetBox.classList.add(currentPlayer.symbol);
  //add the symbol to the grid array
  var columnNum = position[0];
  var rowNum = position[1];
  grid[columnNum][rowNum] = currentPlayer.symbol;
  //remove the eventlistener so the box can not be clicked again
  event.target.removeEventListener("click", oneRound);
  //check if there is a winner - if so : remove eventlistener and show something
  var check = checkGrid(grid,3,3,currentPlayer.symbol.repeat(3));
  if (check === true){
    winningRound(currentPlayer);
    }
  // check if there is a tie
  var tie = checkGrid(grid,3,3,"i");
  if (tie === false){
  playerRound.textContent = "It's a draw!";
  startButton.classList.add('visible');
  startButton.classList.remove('invisible');
  }
  turnCounter++;
  turnCounter = localStorage.setItem('turnCounter',turnCounter);
  localStorage.setItem('player2Score',player2Score);
  localStorage.setItem('player1Score',player1Score);
};

//removing all previously added classes
var clearBoard = function(){
  grid = [];
  gridBoxes.forEach(function(elem){
    elem.classList.remove("X");
  });
  gridBoxes.forEach(function(elem){
    elem.classList.remove("O");
  });
  playerRound.textContent = "";

};

//initialises board and grid
var startRound = function(event){
  clearBoard();
  console.log("hi");
  startButton.classList.add('invisible');
  startButton.classList.remove('visible');
  var grid = buildGrid(columns,rows);
  gridBoxes.forEach(function(elem){
    elem.addEventListener("click", oneRound);
  });
  player1ScoreLabel.textContent = localStorage.getItem('player1Score',player1Score);
  player2ScoreLabel.textContent = localStorage.getItem('player2Score',player2Score);
  turnCounter = localStorage.getItem('turnCounter',turnCounter);
  var displayPlayer = Math.floor(turnCounter % 2) + 1;
  playerRound.textContent = "Player " + displayPlayer + " can make their move.";
};

//adding EventListeners
gridBoxes.forEach(function(elem){
  elem.addEventListener("click", oneRound);
});
startButton.addEventListener("click", startRound);

// build the board and grid when page is opened or refreshed
startRound(columns,rows);
