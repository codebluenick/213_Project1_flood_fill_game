[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/tqZbTGo_)
# Module 1 - Flood Fill game
Module 1 for DGL 213 Applied JavaScript.

## What are we doing here?
Alright - welcome to our first module and tutorial for the game Flood Fill. Try the game out [here](https://ash-teach.github.io/flood-fill/ "Flood Fill Game"), or run it locally after you accept the assignment and clone your own copy from the assignment template. 

Our goal in this tutorial and module is to revisit some of the fundamentals of JavaScript in a relatively simple and pared down project. In particular, the Flood Fill project includes only `index.html` and `floodfill.js` files, whereas future projects we work on will include a great deal more in terms of additional libraries and file management.

While this project doesn't include an example of every JavaScript feature that was discussed in your readings for this week, it does bring a good deal of that content together. I'll stress here that this module especially is intended to help refamiliarize you with JavaScript, so as you work through this tutorial, please go back and refer to the noted [FreeCodeCamp](https://www.freecodecamp.org/ "FreeCodeCamp") resources, if there is anything that you don't understand, or that you need a refresher on. And, of course, you can always reach out to me if you need any one-on-one help.

## How will we proceed?
The approach taken in this tutorial will set up the process that we'll use throughout the semester. You can expect a similar style of project, tutorial informaiton, and code discussion with each module. For some modules (like this one) I'll expect you to make improvements and changes to the base code as part of a project to submit at the end of the module. For other modules I'll provide some sample code, and perhaps a bit of a base template, but you'll do most of the development from scratch. Expectations will be stated up front for all modules.

In general, the following are the steps you should take for each module tutorial:
1. If you haven't already done so, accept the module assignment (link available 
    in Brightspace). 
    1. Accepting the assignment will create a new **private** repository. **Only you and I** will be able to access this repository.
    2. Make sure you immediately clone a copy of the newly created repository to your computer by using the large green Clone button in the repository. Alternatively,
    you may choose to use GitHub Codespaces to work on the project through the
    browser;
    3. Find your locally cloned code on your computer and open with Visual Studio Code.
    Alternatively, use GitHub Codespaces.
2. Follow along with the tutorial below. Make changes in your local code as you read along. *Be experiemntal!* Doing so will help to give you a better grasp of what the code is doing, and will better prepare you for completing the project. 

## Code walkthrough
Before we walk through the code section by section, take some time to scan through the entire file. Notice that I've organized code into logical sections using VSCode regions and line comments. Notice as well that there is a logic to the way functions are organized within their respective sections (i.e. functions called earlier are placed higher in the file).

The other **really important** thing that I'll continue to harp on all semester is naming conventions. You must **always always always** make an effort to name your variable and functions (*name bindings*, in general) in a sensible and readable way. The grammar of JavaScript doesn't always make this easy, but we'll do our best in all cases. Conventions, like the use of ALL_CAPS and underscors for constants is a good idea (note that there is a conceptual difference between a CONSTANT and a `const` - I use `const` quite frequently throughout the code, but not all `consts` are CONSTANTs).

Let's get started with the code walkthrough...

### "use strict";
This is a critical feature of JavaScript since ES5 which helps to reduce errors in JavaScript code by requesting that the browser (i.e. the JavaScript interpreter) to treat JavaScript semantics more strictly. We will apply "use strict" to most projects we develop in this class in order to ensure that we have an easier time catching bugs and keeping code modern. You can read more about [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode "MDN - Strict Mode") on the MDN.

>**Exercise**
>
> `strict` mode can be applied to an entire JS file by calling `"use strict"` at the top of the file, as we've done here; or it can be applied to individual functions. In the browser console `strict` mode can *only* be applied to functions (because the console interprets the JS you type a line at a time). To experiment a bit with `strict` mode in the browser console create a wrapper function that you can apply `strict` mode to. For example, try entering the following code in your browser console, then press enter/return:
>```javascript
>function createGlobal() {
>    aGlobal = "Hello, World!";
>}
>```
>Call the `createGlobal` function by typing the function name with execution parameters into the console: `createGlobal()`. The return you get should be `undefined` (don't worry - that's normal), but if you then type in `aGlobal` and press enter you should see the `"Hello, World!"` text appear. In contrast, try entering the following code into your console, then pressing enter/return:
>```javascript
>function failToCreateGlobal() {
>   "use strict";    
>   notAGlobal = "Hello, World!";
>}
>```
>Call the `failToCreateGlobal` function the same way you called `createGlobal` above. This time, you should see a `ReferenceError` appear in the console. In this second case, because the function is in `strict` mode, the browser does not allow the assignment of variables that *have not yet been declared*. If you modifed the `notAGlobal` line to say `let notAGlobal` or `var notAGlobal` or even `const notAGlobal` your code would execute without any problems because you've use `let` or `var` or `const` to correctly *declare* the variable before you've tried assigning it. Non-`strict` mode JavaScript allows this type of loose assignment to previously undeclare variable - which, you might imagine - has cause a whole host of difficult-to-track-down errors over the years. 

### VSCode regions
VSCode user-defined regions are used to organize code by using `// #region` and `// #endregion` paired comments at the beginning and end of the region the developer wishes to create. The benefit is that user-defined regions can be collapsed using the small down arrow that appears on mouse hover between the line number and the beginning of the code on that line (functions and classes automatically also get collapse behaviour without the need to define a region).

### Canvas
To use canvas via JavaScript we must first get a reference to the canvas and to a drawing context:
```javascript
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
```
We will rarely access the canvas itself through JS; more often we'll use the drawing context, which by convention, we most often name `ctx`. Note that we can also create a 3D drawing context (which relies on [WebGL](https://en.wikipedia.org/wiki/WebGL)), but we'll most often use a 2D drawing context.

### UI references
In a 'vanilla' JS environment (meaning one that doesn't rely on outside frameworks or libraries) we typically use `querySelector()` or related functions to grab a hold of HTML elements that we need to access via code (you can read more about [querySelector at the MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector "MDN - document.querySelector()") if you like).

`querySelector()` and related functions have been inspired by previously popular libraries such as jQuery. We won't use jQuery in this course, but it's worth noting that much of the functionality that jQuery previously provided is now natively supported in JavaScript. 

Other options for getting references to HTML elements include the `getElementById()` suite of functions. This is a valid method, but forces the use of IDs in HTML, which may not be desireable. There are other `getElementBy...` functions that you might like to use as well, but I'll mostly stick with `querySelector()` and friends.

```javascript
const restartButton = document.querySelector("#restart");
```
This gets a hold of the restart button HTML element by its ID, `restart`. The hashtag ('#') passed into the query selector with the ID name ('restart') instructs `querySelector()` to search for a `Document` element with `id="restart"`. You can find this element in the `index.html` file:
```html
<button id="restart">Restart</button>
```
In contrast, all color select buttons are retrieved by using `querySelectorAll()`:
```javascript
const colorSelectButtons = document.querySelectorAll(".color-select");
```
Similar to `querySelector()` above the dot ('.') instructs `querySelectorAll()` to search for a `Document` elemnet with `class="color-select"` (dot for classes, hash symbol for IDs). The important difference between the two functions though is that `querySelectorAll()` returns an array of *all* elements with the attribute `class="color-select"`. In this case, that is all our UI buttons for selecting a color. 

### Constants and game objects
The four `const`s that are named in ALL_CAPS with underscores are meant to be actual constants; however, JavaScript doesn't have any concept of a constant (by which I mean a named binding that **never** changes) so we use ALL_CAPS to remind ourselves *not* to change the values stored in those `const`s.

`CELL_COLORS` is a JavaScript object used to to store all colors used in game (there are other ways to store this type of data - some more convenient - but we'll stick with this method for now).
```javascript
const CELL_COLORS = {
    white: [255, 255, 255], //white
    black: [0, 0, 0],  //black
    red: [255, 0, 0],  //red
    green: [0, 255, 0],  //green
    blue: [0, 0, 255]  //blue
}
```
`CELLS_PER_AXIS` is used to define the size of the square grid. In this case the grid is 9x9.
```javascript
const CELLS_PER_AXIS = 9;
```
`CELL_WIDTH` and `CELL_HEIGHT` are computed CONSTANTS that capture the size of each cell based on the canvas width and height (both fixed in this case) and `CELLS_PER_AXIS`.
```javascript
const CELL_WIDTH = canvas.width/CELLS_PER_AXIS;
const CELL_HEIGHT = canvas.height/CELLS_PER_AXIS;
```
`replacementColor` and `grids` are `let` variables (i.e. they're changeable, but are scoped, unlike `var` variables) that are used throughout the program. `replacementColor` is the default color chosen for the player at the beginning and `grids` is used to track all boards during gameplay (i.e. all grids) and is necessary for the restart feature.
```javascript
let replacementColor = CELL_COLORS.white;
let grids;
```

### Game Logic
This section contain most of the logic that runs the game, including initalization, rendering, state changes and the primary flood fill algorithm. UI interactions (i.e. click handlers) are handled elsewhere.

#### **startGame:**
`startGame()` generates an entirely new game, optionally taking a `startingGrid` paramter to generate the first grid:
```javascript
function startGame(startingGrid = [])
```
We check to see if the `startingGrid` parameter is empty. If it is we call `initializeGrid` to ensure that `startingGrid` has some value before `initializeHistory` is called (note that this check could fail - what if something other than an array is passed in as `startingGrid`?):
```javascript
if (startingGrid.length === 0) {
    startingGrid = initializeGrid();
}
```
We call `initializeHistory()` with the now-guaranteed-to-have-a-value (but maybe not an array value! See note above) `startingGrid` parameter, and `render()` on the first grid in the `grids` history.
```javascript
initializeHistory(startingGrid);
render(grids[0]);
```

#### **initializeGrid:**
The main purpose of this function is to create a new randomly generated game board (refered to as a 'grid' in code). Each grid is `CELLS_PER_AXIS` by `CELLS_PER_AXIS` square (in this case 9 x 9 square) and is managed using a standard JS array:
```javascript
const newGrid = [];
```
The grid is generated by running through a `for` loop of `CELLS_PER_AXIS` by `CELLS_PER_AXIS` in length (again, 9 x 9 = 81, in this case):
```javascript
for (let i = 0; i < CELLS_PER_AXIS * CELLS_PER_AXIS; i++)
```
and by choosing a random color from `CELL_COLORS` for each array index and adding it to the array using the standard JavaScript `Array.push()` function (you can find a discussion of `chooseRandomPropertyFrom()` below):
```javascript
newGrid.push(chooseRandomPropertyFrom(CELL_COLORS));
```
Finally, `initializeGrid()` `return`s the newly generated grid for inclusion in the grid history:
```javascript
return newGrid;
```

#### **initializeHistory:**
The `initializeHistory()` function is only ever called from the `startGame()` function and accepts `startingGrid` as a parameter (note that this suffers from the same potential fault as `startGame()` - what if something other than an array is passed into `initializeHistory()` via `startingGrid`?):
```javascript
function initializeHistory(startingGrid) 
```
The function is used to ensure that the `grids` array is initialized to empty at the outset of a new game (or restarted game)
```javascript
grids = [];
```
and that the the first grid in the `grids` array is the `startingGrid`:
```javascript
grids.push(startingGrid);
```
It's worth noting at this point that `grids` is an *array of arrays*. This means that each element of the `grids` array is itself an array. In fact, `grids` is an *array of arrays of arrays* since each grid element contains an array from the `CELL_COLORS` object.

>**Exercise**
>
> Arrays of arrays are a fairly common pattern in many programming languages, though some languages handle them in a more rigorous way. In any case, it can be a bit tricky to wrap your head around how to access individual elements, so let's practice a little bit to help figure it out. Open up your browser console and enter the following code:
>```javascript
>let firstInnerArray = [1, 2, 3];
>let secondInnerArray = [4, 5, 6];
>let outerArray = [];
>outerArray.push(firstInnerArray);
>outerArray.push(secondInnerArray);
>```
>Now if you type `outerArray` into your console window you should see that you have an array of length 2 with each element containing an array itself: Arrays [1, 2 ,3] and [4, 5, 6], respectively.
>
>To access each individual array via the `outerArray` variable you can use the standard bracket notation:
>```javascript
>outerArray[0] //returns [1, 2, 3]
>```
>To access individual elements of each of the inner arrays you may chain the bracket notation as follows:
>```javascript
>outerArray[1][2] //returns 6 
>```
>Note that the `push()` method is different from the `concat()` method (i.e. `push()` pushes *another* array element on to the outer array; while `concat()` just mashes the two given arrays together to create one bigger array): 
>```javascript
>let arr1 = [1, 2, 3];
>let arr2 = [4, 5, 6];
>arr1.concat(arr2); //returns [1, 2, 3, 4, 5, 6]
>```

#### **render:**
The `render()` function is used to draw the specified grid. Note that the function itself is not dependent on the `grids` array in any way - we're not always rendering the most recent grid, or the the first - rather it accepts any grid and renders it:
```javascript
function render(grid)
```
`render()` loops through all indicies in the given grid:
```javascript
for (let i = 0; i < grid.length; i++)
```
and uses the cavnas API and drawing context `ctx` to draw a rectangle filled with the color specified at each grid index. `fillStyle` is a cavnas drawing context property (note that we're using `=` to *assign* a value to to `fillStyle`) that defines the fill color of a canvas primitive:
```javascript
ctx.fillStyle = `rgb(${grid[i][0]}, ${grid[i][1]}, ${grid[i][2]})`;
```
Recall that in `initializeGrid()` each grid index is given a value from the `CELL_COLORS` object, which itself is an array of RGB values for the specified color. Therefore, for each grid element the `fillStyle` property will contain an rgb object with values defined in `CELL_COLORS`.
We then use the canvas drawing context function `fillRect` to draw a rectangle at a specified location and size. Because we've defined the `fillStyle` property the rectangle will automatically be filled with the color assigned to `fillStyle`. `fillRect()` accepts four parameters: a horiztonal position, a vertical position (remember that the canvas (0,0) point is in the upper left and positive veritical - or y - direction is *down* your screen!), a width and a height:
```javascript
ctx.fillRect((i % CELLS_PER_AXIS) * CELL_WIDTH, Math.floor(i / CELLS_PER_AXIS) * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
```
Width and height are easily given via the predefined constants `CELL_WIDTH` and `CELL_HEIGHT`. To find the appropriate position requires a little bit of math. The pattern used is due to the fact that JavaScript has no native implementation of 2-dimensional arrays (meaning, there is no native 2D array, instead we just have *arrays of arrays*, as discussed above). Each of our grid arrays is a  1-dimensional array that is meant to *represent* a 2-dimensional array. In other words, each grid array is like a long line of values that is meant to represent a *grid* of values in rows and columns. So, we need a way to split that long line into the correct length rows and columns. To do so, we rely on the fact that we've defined `CELLS_PER_AXIS` as a constant - meaning we *know* how long each row (and column) should be. We use remainder division, `%`, and the `Math.floor()` function to help us get the values we need. Remainder division returns the whole number remainder from a normal division operation. For example, if you divide 7 by 3 you get 2 with 1 left over - the 1 in this case is the *remainder* that we're looking for. Let's look at the difference:
```javascript
7 / 3 = 2.333333 //The real number result of 7 divided by 3
```
```javascript
7 % 3 = 1 //The whole number remainder of 7 divided by 3
```
First, for each index `i` in the grid we use remainder division to find the column position for each index:
```javascript
i % CELLS_PER_AXIS
```
This means that for an index in the grid we can find the appropriate column that grid element belongs to. In our code we've defined `CELLS_PER_AXIS = 9`, imagine then that we're on index 0 in our grid:
```javascript
i % CELLS_PER_AXIS = 0 % 9 = 0 //The first grid position, or column, starting from 0 count
```
If on the other hand we're at index 1:
```javascript
i % CELLS_PER_AXIS = 1 % 9 = 1 //The second grid posiiton, or column, starting from 0 count
```
Or, if we're at, for example, index 70:
```javascript
i % CELLS_PER_AXIS = 70 % 9 = 7 //The eighth grid position, or column, starting from 0 count
```
So as you might guess, no matter what our index value is, remainder division will always give us a result greater than or equal to 0 and less than `CELLS_PER_AXIS`, or in this case 9. Meaning, we can find out which column each grid index belongs to. Because each grid column **must** be the same width as `CELL_WIDTH` we can find the actual canvas coordinate for each grid element by multiplying the result of the remainder division by `CELL_WIDTH`:
```javascript
(i % CELLS_PER_AXIS) * CELL_WIDTH //Gives the real cavnas x-coordinate for each grid element
```
To find the vertical position for each grid element we use `Math.floor`, which returns the largest integer (i.e. whole number) value *less* than the given real number value. So, for example:
```javascript
Math.floor(10.23) //Returns 10
Math.floor(87.99) //Returns 87
```
We might call this a *truncation* operation: `Math.floor()` effectively just strips the decimal part from a fractional value. So to find our vertical position:
```javascript
Math.floor(i / CELLS_PER_AXIS)
```
Notice that in this case we're using straight division, `/`. When we divide our grid index by `CELLS_PER_AXIS` we get a real number, decimal, value where the integer, or whole number, part represents the *row* that the grid element belongs to. `Math.floor()` then strips off the decimal part to give us just that whole number value - the row. For example:
```javascript
Math.floor(i / CELLS_PER_AXIS) = Math.floor(1 % 9) = Math.floor(0.1111) = 0 //The first grid posiiton, or row, starting from 0 count
```
```javascript
Math.floor(i / CELLS_PER_AXIS) = Math.floor(70 % 9) = Math.floor(7.7777) = 7 //The eighth grid posiiton, or row, starting from 0 count
```
As with each grid column, each grid row must be the same height as a cell, or `CELL_HEIGHT`, so we multiply the row value by the `CELL_HEIGHT` to get the real values canvas position for the grid element:
```javascript
Math.floor(i / CELLS_PER_AXIS) * CELL_HEIGHT //Gives the real canvas y-coordinate for each grid element
```

#### **updateGridAt:**
`updateGridAt()` is called by the mouse click handler function and is passed in two arguments for each of the mouse x and y coordinate positions on the canvas, respectively:
```javascript
function updateGridAt(mousePositionX, mousePositionY)
```
The first action the function takes it to call the helper function `convertCartesiansToGrid()` (see below) to get an object containing the row and column coordinates of the clicked on cell:
```javascript
const gridCoordinates = convertCartesiansToGrid(mousePositionX, mousePositionY);
```
Next a new grid is created from the most recent grid in the `grids` array:
```javascript
const newGrid = grids[grids.length-1].slice();
```
The `slice()` method is used to copy out a portion of the array it is called on without modifying the original array. In the code above `slice()` is called on the final element of the `grids` array (i.e. at position `grids.length-1`), which as we know from above is itself an array representing the most recent grid configuration. `slice()` can optionally take up to two parameters: a `start` and `end` index from which to draw the copy, but if no parameters are passed in the entire array is copied. So at the end of the `slice()` operation the `newGrid` variable will contain a perfect copy of the most recent grid configuration.

>**Exercise**
>
>Try out `slice()` on your own to get a sense of how it works. Copy and paste the following into a browser console:
>```javascript
>let arr1 = [1, 2, 3, 4];
>let arr2 = arr1.slice(); //returns [1, 2, 3, 4]
>```
>Even though `arr1` and `arr2` contain indentical values note that `arr1 == arr1` is false, because these are different array instances. Try slicing out only part of the array:
>```javascript
>let arr3 = arr1.slice(1,3); //returns [2, 3]
>```
>`slice(start, end)` returns a new array including the value at the `start` index, but *not* including the value at the `end` index.

Once we have created a new grid from the most recent grid configuration we can call on the flood fill algorithm to decide how to update the grid given the player's selection of `replacementColor` and `gridCoordinates` (detailed discussion of `floodFill()` is below):
```javascript
floodFill(newGrid, gridCoordinates, newGrid[gridCoordinates.row * CELLS_PER_AXIS + gridCoordinates.column])
```
Finally we push the newly modified grid onto the `grids` array and re-render this grid by calling `render()` on the latest grid in `grids`:
```javascript
grids.push(newGrid);
render(grids[grids.length-1]);
```

#### **floodFill:**
The flood fill algorithm is a well-known algorithm (you can read about it on [Wikipedia](https://en.wikipedia.org/wiki/Flood_fill "Wikipedia - Flood Fill")). Our impementation of flood fill is a recursive function that accepts three parameters: a grid to modify, a current grid coordinate (determined initially by the player click, and after recursion by the algorithm) and the the color of the initially clicked on cell:
```javascript
function floodFill(grid, gridCoordinate, colorToChange)
```
It will help you as you work through this function to recognize that with each recurisve call to the `floodFill()` function both `grid` and `colorToChange` remain constant - only `gridCoordinate` changes (i.e. the algorithm 'walks' through parts of the grid, following a path created by the initial `gridCoordinate` and `colorToChange` until it hits different colored cells, or the edge of the grid).
The first two conditions of the flood fill algorithm are used to check for two cases in which we would want to stop the algorithm from proceeding: The case where the clicked on cell has the same color as the chosen `replacementColor` and the case where the current `gridCoordinate` has a color different from the cell the player has clicked on. In both conditions the result is to `return` from the function, meaning if we either of those condition evaluate to true the function will `return` and exit.
The first condition uses the `arraysAreEqual()` helper function (discussed below) to check if `colorToChange` equals `replacementColor` and if it does, returns: 
```javascript
if (arraysAreEqual(colorToChange, replacementColor)) { return }
```
Remember that neither `colorToChange` (i.e. the color of cell clicked on by the player) nor `replacementColor` (i.e. the color chosen by the player using the UI buttons) change throughout the entire execution of the flood fill algorithm. Meaning, although the condition is checked with every iteration of the recursive algorithm it is only on the first iteration that it matters. For example, if the player has chosen white as the `replacementColor` and clicks on a white cell then this condition will evaluate to true and the function will immediately return, causing the algorithm to end. If on the other hand the player clicks on a green cell this condition will return false and the function will continue to evaluate the next condtion, and will repeat this process with every recursive iteration.

The second condition also calls on `arraysAreEqual()` but in this case checks the negation of the return value of the function to see if the current grid cell is the same color as `colorToChange`:
 ```javascript
else if (!arraysAreEqual(grid[gridCoordinate.row * CELLS_PER_AXIS + gridCoordinate.column], colorToChange)) { return } 
```
Again we use `gridCoordinates` and the fact that `grid` is an standard array meant to represent a 2-dimensional array to find the correct position in the `grid` array. Before we go into detail on this condition, and now that we have some context on the `floodFill()` function, let's look back at the call to `floodFill()` in the `updateGridAt()` function:
```javascript
floodFill(newGrid, gridCoordinates, newGrid[gridCoordinates.row * CELLS_PER_AXIS + gridCoordinates.column])
```
Remember that `updateGridAt()` is called when the player clicks on a grid cell. So at the moment that `updateGridAt()` is running and the line above is called, `newGrid` is a newly created grid copied from the most recent grid configuration; `gridCoordinates` is the coordinates of the grid cell the player just clicked on; and the third parameter `newGrid[gridCoordinates.row * CELLS_PER_AXIS + gridCoordinates.column]` returns the value in the computed index of `newGrid` at  `gridCoordinates`. The most important thing to notice here is that at this first iteration of `floodFill()` `gridCoordinates` points to the cell the player clicked on, and `colorToChange` is always derived from *that* specific cell, so going back to our second condition: 
 ```javascript
else if (!arraysAreEqual(grid[gridCoordinate.row * CELLS_PER_AXIS + gridCoordinate.column], colorToChange)) { return } 
```
We can see that the `arraysAreEqual()` should return true - because of course the cell the player clicked on has the *same* color as the cell the player clicked on! And if `arraysAreEqual()` returns true its negation must be false - which means this condition fails. 

In summary, the second condition of `floodFill()` must *always* evaluate to false on the *first* iteration of the flood fill algorithm - because the cell the player clicked on always has the same color as the cell the player clicked on! In future iterations, `gridCoordinates` will change, so we'll ask the question: are the *current* `gridCoordinateas` pointing to a cell that has the same color as the cell the player clicked on? If they are different - meaning, if the current `gridCoordinates` points to a cell of a different color than the cell the player clicked on, then that means the algorithm has found the edge of a collection of similarly colored cells, meaning the condition evaluates to **true** and we should exit the algorithm at that point. So you can think of this condition as the one that checks to see if the path the algorithm takes is still following the initially clicked on color. 

The `else` condition in the `floodFill()` function is what drives the recursion of the algorithm. In effect, if neither of the first two conditions evaluate to true (meaning, as discussed above, the player has **not** clicked on a cell the same color as the `replacementColor`, and the given `gridCoordinates` do not contain a color **different** from `colorToChange`) then the function drops into the `else` condition and changes the value of the `gridCoordinates` cell - meaning the color of the `gridCoordinates` cell - to `replacementColor`, then recursively calls on `floodFill()` four more times - one time for each of the cells adjacent to `gridCoordinates` - top, bottom, left and right: 
```javascript
else {
    grid[gridCoordinate.row * CELLS_PER_AXIS + gridCoordinate.column] = replacementColor;
    floodFill(grid, {column: Math.max(gridCoordinate.column - 1, 0), row: gridCoordinate.row}, colorToChange);
    floodFill(grid, {column: Math.min(gridCoordinate.column + 1, CELLS_PER_AXIS - 1), row: gridCoordinate.row}, colorToChange);
    floodFill(grid, {column: gridCoordinate.column, row: Math.max(gridCoordinate.row - 1, 0)}, colorToChange);
    floodFill(grid, {column: gridCoordinate.column, row: Math.min(gridCoordinate.row + 1, CELLS_PER_AXIS - 1)}, colorToChange);
}
```
Thus for every call of `floodFill()` there are *at least* four subsequent recurisve calls back to the same function. As we know from our examination of the first two conditions, these four subsequent calls will either terminate if the resulting `gridCoordinates` point to the initially clicked on cell (which is impossible - why?), or if `gridCoordinates` point to a cell with a color *different* from `colorToChange`. Otherwise, the `gridCoodinates` cell color will be changed to `replacementColor` and four more recursive calls are made to `floodFill()` and so on.

The final step in `floodFill()` is to call `return`. All recursive functions **must** return on every conditional branch, else the function will not recurse properly. 

>**Exercise**
>
>Recursion is a complex topic that can benefit from some additional examples. The tutorials on [FreeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/use-recursion-to-create-a-countdown "FreeCodeCamp - Use Recursion to Create a Countdown") contain good examples and practice. Here's some additional recurisive code you can experiment with:
>```javascript
>function recursiveAddition(n) {
>  if ( n === 1) { return 1; }
>  else { return n + recursiveAddition(n-1); }
>}
>```
>Copy and paste the above into your browser console and try out some different values for n. In what cases does it fail? Try modifying how the function `return`s in order to get a sense of how the recursion works. Or, add some `console.log()` statements to the function so that you can 'see' what happens at each step.

#### **restart:**
The final function in the Game Logic section is `restart()`, which simplly calls on `startGame` with the optional parameter `grids[0]` passed in so that the board resets back to the initial conditions, rather than to a wholly new board:
```javascript
function restart() {
    startGame(grids[0]);
}
```

### Event Listeners
It is fairly typical in JavaScript programming to include event listeners at or near the bottom of the .js file. This keeps them in an expected but out of the way place so that the more important functions of the program are exposed first. Notice as well that the event listener callback functions (i.e. the 'handler' functions) are all intentionally thin: there is very little game logic present here, so that there is as much decoupling from the view actions (i.e. clicking on the UI or game board) and the logic of the game. 

We first add an event listener to the `canvas` and a `gridClickHandler()` function that simple calls `updateGridAt()` with the given mouse coordinates. Note that we are using `event.offsetX` and `event.offsetY` here rather than `event.mousePostionX` and `event.mousePostionY` because the `offset` properties provide coordinates relative to the canvas, whereas the `mousePosition` properties provide coordinates relative to the window - if you were to use `mousePostionX` and `mousePositionY` you would see changes on your game board offset by the position the canvas is placed on the DOM:
```javascript
canvas.addEventListener("mousedown", gridClickHandler);
function gridClickHandler(event) {
    updateGridAt(event.offsetX, event.offsetY);
}
```

Next we add an event listener to the `restart` button, along with a `restartClickHandler()` function that simply calls the game logic function `restart()`:
```javascript
restartButton.addEventListener("mousedown", restartClickHandler);
function restartClickHandler() {
    restart();
}
```

Finally, we add an event listener to each of the `colorSelectButtons` via `forEach` loop. Recall that `colorSelectButtons` was one of the first `const`s defined in our .js file - waaay at the top - which used `querySelectorAll()` to find all `document` element that have the `color-select` CSS class. The difference with this event listener is that we use a `forEach` loop to access each element of the `colorSelectButtons` array and apply a `mousedown` event listener:
```javascript
colorSelectButtons.forEach(button => {
    button.addEventListener("mousedown", () => replacementColor = CELL_COLORS[button.name])
});
```
So for each individal UI button there is a seperate event listener that updates `replacementColor` with a value from `CELL_COLORS` based on the `button.name` property.

Additionally, we don't have a separate click handler function associated with this event listener, rather the callback function is written as an arrow function inline with the event listener. 

```javascript
() => replacementColor = CELL_COLORS[button.name]
```
Don't worry if you don't fully understand how this arrow function works yet - it's not really any different from a normal function, but uses a stripped down syntax that is easier to write for small functions. We'll talk more about arrow functions down the road.

Notice that for all event listeners above we use the `mousedown` event to capture a click on the canvas or on the UI. There are many other mouse events that could potentially be used here, but not all are optimal. `mouseup` and `click` are both commonly used, but will not work well in this case.

>**Exercise**
>For this exercise you must have a working copy of the Flood Fill game local on your hard drive. Simply change the event in each of the `canvas` and `restart` event listeners to `mouseup` or `click` rather than `mousedown`:
>```javascript
>canvas.addEventListener("mouseup", gridClickHandler);
>...
>restartButton.addEventListener("mouseup", restartClickHandler);
>```
>Now open the `index.html` file in your browser and play game game. However, each time you click on either a grid cell or a UI button move your mouse pointer elsewhere on the board *before* releasing the button. You should then see the corresponding change happen where you *released* the button, rather than where you first clicked. 

### Helper Functions
The final section is a collection of helper functions that we've used throughout the code above. You may have already examined them, since we've encountered them all already, or you should at least have a sense of their purpose at this point.

#### **convertCartesianToGrid:**
This function simply takes the mouse position recorded during the `mousedown` event (based on the `offset` properties, as discussed above) and converts them to grid positions. FYI 'Cartesian' is just a convenient term that means xy-plane, just like you would have learned about in high school math class:
```javascript
function convertCartesiansToGrid(xPos, yPos)
```
The function simply returns a new object (typically stored in a `gridCoordinates` `const`) calculated using `Math.floor()` and `CELL_WIDTH` and `CELL_HEIGHT`:
```javascript
return {
    column: Math.floor(xPos/CELL_WIDTH),
    row: Math.floor(yPos/CELL_HEIGHT)
};
```
The math here is easier than in the other cases where we used `Math.floor` - effectively all we're doing is dividing the current mouse position by the size of the rows and columns of the grid (represented by `CELL_WIDTH` and `CELL_HEIGHT` respectively) and truncating (or cutting off) the decimal part of the result to get the whole number value.

#### **chooseRandomPropertyFrom():**
This function is used to choose a random owned property from a given object. We use it exclusively to randomly choose a color from the `CELL_COLORS` object when first initializing a new grid. The way we go about this seems a little convoluted, so be patient when reading through this section, but is the most effective way to do a random selection from an object in JavaScript.

First we pass in the object:
```javascript
function chooseRandomPropertyFrom(object)
```

Then we define a `const` `keys` that is returned from the `Object.keys()` function:
```javascript
const keys = Object.keys(object);
```
`keys` then is an array whose values are all of the unique keys that are found in `object`. In the case of `CELL_COLORS` this means each of the keys `white`, `black`, etc. are stored in an array like the following: `["white", "black", "red", "green", "blue"]`. This means that `keys[0]` returns the string `"white"`, `keys[1]` returns the string `"black"`, etc. 

Why are we doing this? Well, it's not possible to choose a random property from a JavaScript object directly, because random selections rely on being able to pull the selection from an *ordered* list; objects in JavaScript are not guaranteed to be in any order, so we can't just make a random selection. Arrays, however, are indexed and so we can choose a random selection from the `keys` array, then apply that selection to `object`. So it's the same kind of random selection you might have first imagined, but there are *two* necessary steps in this case. 

Now that we have the `keys` array we can make a random selection from it using `Math.random()` and apply that result to `object` to return the stored value at that key:
```javascript
return object[keys[Math.floor(keys.length * Math.random())]]; 
```
There is a bit going on here, so let's break it down. `keys.length` returns the length of the `keys` array (in the case of `CELL_COLORS` that is 5) and `Math.random()` just returns a random number between 0 and 1 (so it could be 0, or 0.999999, or 0.492348, or 0.123234, etc. - but it can't be 1). Multiplying these two values together will give a number between 0 and `keys.length` (again, in this case 5) - because 0 is the smallest `Math.random()` can be and 1 is the largest `Math.random()` can be. Then we use our trusty `Math.floor()` function to cut away the decimal part of the number leaving us with just the integer value:
```javascript
Math.floor(keys.length * Math.random()) //returns a random whole number value between 0 and 5
```

Now that we have a whole number value between 0 and 5 the call to keys will give us back whichever string is stored in the random whole number value:
```javascript
keys[Math.floor(keys.length * Math.random())] //the same as keys[{0..5}] where {0..5} represents some random whole number between 0 and 5.
```
Finally, the key property returned from the call to the `keys` array is applied to `object` which returns whatever value is stored in the specified key. In the case of `CELL_COLORS` this is the point where we get back the array of three values representing RGB values for a grid cell:
```javascript
return object[keys[ Math.floor(keys.length * Math.random()) ]];
```

#### **arraysAreEqual:**
The last function defined in our .js file compared two given arrays to see if they contain identical values: 
```javascript
function arraysAreEqual(arr1, arr2)
```
Because we can only use the equality `==` and strict equality `===` operators to check that two arrays point to the same *reference* any two arrays that contain identical values, but are not references to the same array, will return false under `==` and `===`.

>**Exercise**
>
>Try inputting the following code into your browser console:
>```javascript
>let arr1 = [1, 2, 3];
>let arr2 = [1, 2, 3];
>let arr3 = arr1;
>arr1 == arr2  //returns false
>arr1 == arr3  //returns true
>arr1 === arr3  //returns true
>```

In order to compare to see if two arrays that point have different references have identical values we must compare the arrays value by value. The first thing to do then is to check that the two given arrays have the same length, and if not return `false`.
```javascript
if (arr1.length != arr2.length) { return false }
```
If the arrays are of the same length, then we can choose one (it doesn't matter which) and walk through it using a `for` loop and compare each of its values to the second array. If *any* of the entries do not match then immediately return `false` since the two arrays can no longer be equal. Finally, if the `for` loops terminates without finding any discrepencies then the two arrays must be iudentical and we return `true`:
```javascript
for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
        return false;
    }
    return true;
}
```

### Start game
It is typical in JavaScript to place the function that initializes the program at the bottom of the .js file. This is because .js files are interpreted by the browser line by line, and so leaving the initial execution step ensures that the rest of the JavaScript has been interpreted, and makes it more likely that the webpage DOM has completely loaded:
```javascript
startGame();
```