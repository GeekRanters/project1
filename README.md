# Tic Tac Toe Hypnosis

## Game Description

[Play the game here](https://karengeerts.github.io/project1/)

This game allows 2 players to play tic tac toe on a computer. The computer tells you which player's turn it it.
You can add an O or X (depending on which player you are) by clicking on an empty area in the grid.
Once one of the players gets three of their symbols in a row, the game ends, a winner is declared and their
winning score is added to the tally.
When there is a tie, nobody's score is increased.

## Project background

This game is built using only HTML, CSS and JavaScript, as part of General Assembly's Web Development Immersive boot camp.
The complete assignment description can be found [here](https://gist.github.com/epoch/b9e9ee7e9328f20a422bfbb0e4a3ed27#file-wdi14_project1-md)

## Lessons learned

* **Keep it simple** when starting the project. I focused on the bonus extensions and tried to cater for a situation
where there more than 2 players, bigger-sized grids and customised winning sequences (such as OOOXXOX). I was trying to do
this all at the same time, which immediately increased the complexity of the assignment (and my personal frustration levels).
* **Function over form.** Because of making the mistake trying to build something huge, I realised that writing the functions 
was going to be the most difficult part. So I wrote a programme that contained all the functions necessary to make the game
work in the console. All I had to do then was glue it together with a nice looking UI.
* **HTML and CSS can be easy.** But I feel I should spend some more time (over the :christmas_tree: break?) playing around with 
it so I can create simple wireframes more quickly - such as a 3 by 3 grid with some additional text and a button.
* **Local storage.** I tweaked the game so that it will remember whose turn it was and what the scores were. Achieving this using local storage is something I figured out on my own.

## Most proud of ...

I'm most proud of the checkGrid function and all of its inner functions, because it provides functionality to check for any number
of symbols in a sequence in any sized grid. It certainly is overkill at this stage, but I hope to be able to use it in the future
when I find the time to work on Tic Tac Toe Hypnosis 2.0.

## Things I'd like to add:

* Extend the settings: grid size, choosing your own winning sequence, adding multiple players, have a timer per round,...
* Have an option to play against the computer (and make the algorithm smart enough so the human player never wins)
* Improve the CSS so that is visually more clear whose turn it is and what symbol they're playing with.

## Thanks to:

* [Drake-the-designer](https://dribbble.com/DrakeTuura) whose animated X's and O's I used
* [Olivetty](https://www.iconfinder.com/olivetty) whose Christmas icons I used for the Christmas version of this game.
* Everyone who contributed to [this StackOverflow article](https://stackoverflow.com/questions/35917734/how-do-i-traverse-an-array-diagonally-in-javascript)
describing how to traverse an array diagonally in JavaScript
