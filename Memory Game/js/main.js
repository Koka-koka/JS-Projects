/**
 * The main file for the Memory Game.
 * It imports the Controller class and creates an instance with the default number of cells (16).
 * It also adds an event listener to the select element that changes the number of cells.
 * When the event is triggered, it stops the current game, resets the timer and creates a new instance of the Controller class.
 * It also keeps track of the previous game and stops it when a new game is started.
 */

import Controller from "./controller.js";

const selectCellsNumber = document.querySelector('.select-cells-number');

const game = new Controller(selectCellsNumber.value);

const timerContent = "<span>00</span>min <span>00</span>sec";
let prevGame;

/**
 * Event listener for the select element.
 * When the select element is changed, it triggers the listener which stops the current game, resets the timer
 * and creates a new instance of the Controller class.
 * It also keeps track of the previous game and stops it when a new game is started.
 */
selectCellsNumber.addEventListener('change', (e) => {
    document.querySelector('.playground').innerHTML = '';

    game.stopTime();
    game.elements.timer.innerHTML = timerContent;

    // Stop the previous game and reset the timer
    prevGame && prevGame.stopTime();
    prevGame && (prevGame.innerHTML = timerContent);

    // Create a new instance of the Controller class
    const newGame = new Controller(e.target.value);

    // Update the previous game
    prevGame = newGame;
});

