var boardCanvas = document.querySelector('.grid');
var gamePlayView = document.querySelector('.gamePlayView');
var gridBoxes = document.querySelectorAll('.box');


/*var box00 = document.querySelector('.box00');
var box01 = document.querySelector('.box01');
var box02 = document.querySelector('.box02');
var box10 = document.querySelector('.box10');
var box11 = document.querySelector('.box11');
var box12 = document.querySelector('.box12');
var box20 = document.querySelector('.box20');
var box21 = document.querySelector('.box21');
var box22 = document.querySelector('.box22');
*/
var columns = 3;
var rows = 3;
var winningSeq1 = "XXX";
var winningSeq2 = "OOO";
var turnCounter = 0; //at the start of the game the counter is set to 0


//this function returns an array of arrays
var buildGrid = function(columns,rows){
  //build row that holds as many columns as specified
  var grid = [];
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
  var symbol;
  if (turnCounter % 2 === 0){
    console.log("Player 1 is playing");
    symbol = "X";
  } else {
    console.log("Player 2 is playing");
    symbol = "O";
  }
  return symbol;
};

var oneRound = function(event){
  //checks who's currently playing (based on turnCounter) in order to put an X or an O on the boardCanvas
  var symbol = determinePlayer();
  var position = event.target.id; //returns a string with array index values
  //add the symbol to the boardCanvas
  var targetBox = document.getElementById(position);
  targetBox.classList.add(symbol);
  //add the symbol to the grid array
  var columnNum = position[0];
  var rowNum = position[1];
  grid[columnNum][rowNum] = symbol;
  //remove the eventlistener so the box can not be clicked again
  event.target.removeEventListener("click", oneRound);
  //check if there is a winner - if so : remove eventlistener and show something
  var check = checkGrid(grid,3,3,symbol.repeat(3));
  if (check === true){
    console.log("Well played.");
    gridBoxes.forEach(function(elem){
      elem.removeEventListener("click", oneRound);
    });

  }
  // if there is no winner: update the turnCounter
  turnCounter ++;
};

//adding EventListeners
gridBoxes.forEach(function(elem){
  elem.addEventListener("click", oneRound);
});

var grid = buildGrid(columns,rows);
