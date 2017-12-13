var initialView = document.querySelector('#openSelectSettingsView');
var selectSettings = document.querySelector('.selectSettingsView');
var gamePlayView = document.querySelector('.gamePlayView');
var letsPlayBtn = document.querySelector('.playBtn');
var boardCanvas = document.querySelector('.grid');

//this function hides the opening image and shows the Select Settings options
var openSelectSettings = function(){
  selectSettings.scrollIntoView();
};

//this function hides the Select Settings options and shows the gameboard
var startGame = function(){
  gamePlayView.scrollIntoView();
  };

//this function is based on https://github.com/LearnTeachCode/Battleship-JavaScript/blob/gh-pages/battleship.js
//it builds the board on the screen and creates unique id's for each small square (div)
var showBoard = function (columns = 3,rows = 3){
  // set grid rows and columns and the size of each square
  var squareSize = 50;

// make the grid columns and rows
  for (i = 0; i < columns; i++) {
	   for (j = 0; j < rows; j++) {
		// create a new div HTML element for each grid square and make it the right size
		  var square = document.createElement("div");
		  boardCanvas.appendChild(square);
      square.classList.add("sq1");
      // give each div element a unique id based on its row and column, like "s00"
		  square.id = 's' + j + i;

		// set each grid square's coordinates: multiples of the current row or column number
		  var topPosition = j * squareSize;
		  var leftPosition = i * squareSize;

		// use CSS absolute positioning to place each grid square on the page
		  square.style.top = topPosition + 'px';
		  square.style.left = leftPosition + 'px';
	  }
  }
};


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


//adding EventListeners

initialView.addEventListener('click',openSelectSettings);
letsPlayBtn.addEventListener('click',startGame);



//lines below are used to test functionality and should not go into production

var grid = buildGrid(6,4); //test the buildGrid function
console.log(grid);
var horizontalStrings = createHorizontalStrings(grid,4);
console.log(horizontalStrings);
var verticalStrings = createVerticalStrings(grid,6,4);
console.log(verticalStrings);
var firstDiagStrings = createDiagonalStrings(grid,6,4,true);
console.log(firstDiagStrings);
var secondDiagStrings = createDiagonalStrings(grid,6,4,false);
console.log(secondDiagStrings);
