/*TO DO: new approach where page scrolls down when something is selected*/
//lines 2-20 related to look and feel, no game functionality
/*var initialView = document.querySelector('#openSelectSettingsView');
var selectSettings = document.querySelector('.selectSettingsView');
var letsPlayBtn = document.querySelector('.playBtn');

//this function hides the opening image and shows the Select Settings options
var openSelectSettings = function(){
  initialView.classList.add('hidden');
  selectSettings.classList.add('visible');
};

//this function hides the Select Settings options and shows the gameboard
var startGame = function(){
  selectSettings.classList.add('hidden');
  console.log("Lets go.")
}

initialView.addEventListener('click',openSelectSettings);
*/

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

//this function creates all horizontal strings in an array of arrays and returns these strings as elements of an arrays
var createHorizontalStrings = function(array,rows){
  var horizontalStringArray = [];
  for (var i = 0; i < rows; i++ ){
    var horizontalLine = array[i].join('');
    horizontalStringArray.push(horizontalLine);
  }
  return horizontalStringArray;
};

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

//copied from https://stackoverflow.com/questions/35917734/how-do-i-traverse-an-array-diagonally-in-javascript
//updated variable names to increase readability
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
}



//code below superceded by function
/*
var createHorizontalStringsBottomLeftToTopRight = function(array,columns,rows){
  var numOfHorLines = columns + rows - 1;
  var lineArray = [];
  var horLineBtmLeftToTopRightArray = [];
  for (var i = 0; i < numOfHorLines; i++) { //this number of strings need to be created
    for (var j = 0; j < rows; j++){
      var element = array[j][i];
      lineArray.push(element); //add the element to the lineArray
      if ((j))//check if you can go one row up


    }

  }

};*/


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
