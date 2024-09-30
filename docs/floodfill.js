"use strict";

// Time score variables
const INITIAL_TIME_SCORE = 100; // Maximum score
let currentTimeScore = INITIAL_TIME_SCORE; // Initialize with maximum score
let timerInterval; // Variable to hold the interval reference

// Undo game variables
let colorHistory = []; // array to store the color history of each move


(() => {
  window.addEventListener("load", (event) => {

    // *****************************************************************************
    // #region Constants and Variables

    // Canvas references
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // UI references
    const restartButton = document.querySelector("#restart");
    const undoButton = document.querySelector("#undo");
    const colorSelectButtons = document.querySelectorAll(".color-select");

    // Constants
    const CELL_COLORS = {
      white: [255, 255, 255],
      black: [0, 0, 0],
      red: [255, 0, 0],
      green: [0, 255, 0],
      blue: [0, 0, 255]
    }
    const CELLS_PER_AXIS = 9;
    const CELL_WIDTH = canvas.width / CELLS_PER_AXIS;
    const CELL_HEIGHT = canvas.height / CELLS_PER_AXIS;

    // Game objects
    let replacementColor = CELL_COLORS.white;
    let grids = [];

    // #endregion


    // *****************************************************************************
    // #region Game Logic

    function startGame(startingGrid = []) {
      if (startingGrid.length === 0) {
        startingGrid = initializeGrid();
      }
      initializeHistory(startingGrid);
      currentTimeScore = INITIAL_TIME_SCORE;// Reset time score
      startTimer();// Start the timer
      render(grids[0]);
    }

    // #region Timer score and Undo game functions
    function startTimer() {
      clearInterval(timerInterval);// Clear any existing timer
      timerInterval = setInterval(decreaseTimeScore, 1000);// Decrease score every second
    }

    function decreaseTimeScore() {
      if(currentTimeScore > 0) {
        currentTimeScore-- ;// Decrement the score
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelector("#timerScore").innerText = 'Time Score: ${currentTimeScore}'; //Update the UI
        });
      }
      else {
        clearInterval(timerInterval);// Stop timer if score reaches 0
      }
    }

    function gameWon(grid) { // func to check if game is won
      const firstColor = grid[0];
      return grid.every(cell => arraysAreEqual(cell, firstColor));// Reset the grid
    }

    function rollBackHistoryWithColor() {
      if (grids.length > 1 && colorHistory.length > 0) {
          grids.pop(); // Remove the most recent grid state
          replacementColor = colorHistory.pop(); // Restore the last selected color
          render(grids[grids.length - 1]); // Re-render the board with the previous grid state
      } else {
          alert("No more moves to undo!");
      }
    }
    
    // #endregion

    function initializeGrid() {
      const newGrid = [];
      for (let i = 0; i < CELLS_PER_AXIS * CELLS_PER_AXIS; i++) {
        newGrid.push(chooseRandomPropertyFrom(CELL_COLORS));
      }
      return newGrid;
    }

    function initializeHistory(startingGrid) {
      grids = [];
      grids.push(startingGrid);
    }

    function render(grid) {
      for (let i = 0; i < grid.length; i++) {
        ctx.fillStyle = `rgb(${grid[i][0]}, ${grid[i][1]}, ${grid[i][2]})`;
        ctx.fillRect((i % CELLS_PER_AXIS) * CELL_WIDTH, Math.floor(i / CELLS_PER_AXIS) * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      }
      document.querySelector("#timerScore").innerHTML = `Time Score: ${currentTimeScore}`;// Update UI
    }

    function updateGridAt(mousePositionX, mousePositionY) {
      const gridCoordinates = convertCartesiansToGrid(mousePositionX, mousePositionY);
      const newGrid = grids[grids.length - 1].slice(); //Makes a copy of the most recent grid state
      floodFill(newGrid, gridCoordinates, newGrid[gridCoordinates.row * CELLS_PER_AXIS + gridCoordinates.column])
      grids.push(newGrid);
      render(grids[grids.length - 1]);

      if(gameWon(newGrid)) { //gameWon declared in score func region
        clearInterval(timerInterval);// Stop timer when game is won
        alert("YOU WIN!!!")
      }
    }

    function floodFill(grid, gridCoordinate, colorToChange) {
      if (arraysAreEqual(colorToChange, replacementColor)) { return } //The current cell is already the selected color
      else if (!arraysAreEqual(grid[gridCoordinate.row * CELLS_PER_AXIS + gridCoordinate.column], colorToChange)) { return }  //The current cell is a different color than the initially clicked-on cell
      else {
        grid[gridCoordinate.row * CELLS_PER_AXIS + gridCoordinate.column] = replacementColor;
        floodFill(grid, { column: Math.max(gridCoordinate.column - 1, 0), row: gridCoordinate.row }, colorToChange);
        floodFill(grid, { column: Math.min(gridCoordinate.column + 1, CELLS_PER_AXIS - 1), row: gridCoordinate.row }, colorToChange);
        floodFill(grid, { column: gridCoordinate.column, row: Math.max(gridCoordinate.row - 1, 0) }, colorToChange);
        floodFill(grid, { column: gridCoordinate.column, row: Math.min(gridCoordinate.row + 1, CELLS_PER_AXIS - 1) }, colorToChange);
      }
      return
    }

    function restart() {
      startGame(grids[0]);
    }

    // #endregion


    // *****************************************************************************
    // #region Event Listeners

    canvas.addEventListener("mousedown", gridClickHandler);
    function gridClickHandler(event) {
      colorHistory.push(replacementColor);//Stores the current colour before applying the move
      updateGridAt(event.offsetX, event.offsetY);
    }

    restartButton.addEventListener("mousedown", restartClickHandler);

    undoButton.addEventListener("mousedown", rollBackHistoryWithColor);

    function restartClickHandler() {
      restart();
    }

    colorSelectButtons.forEach(button => {
      button.addEventListener("mousedown", () => replacementColor = CELL_COLORS[button.name])
    });

    // #endregion


    // *****************************************************************************
    // #region Helper Functions

    // To convert canvas coordinates to grid coordinates
    function convertCartesiansToGrid(xPos, yPos) {
      return {
        column: Math.floor(xPos / CELL_WIDTH),
        row: Math.floor(yPos / CELL_HEIGHT)
      };
    }

    // To choose a random property from a given object
    function chooseRandomPropertyFrom(object) {
      const keys = Object.keys(object);
      return object[keys[Math.floor(keys.length * Math.random())]]; //Truncates to integer
    };

    // To compare two arrays
    function arraysAreEqual(arr1, arr2) {
      if (arr1.length != arr2.length) { return false }
      else {
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] != arr2[i]) {
            return false;
          }
        }
        return true;
      }
    }

    // #endregion

    //Start game
    startGame();


  });
})();

