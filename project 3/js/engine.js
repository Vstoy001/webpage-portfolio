/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

//constants for dimensions of a tile
var BLOCK_WIDTH = 83;
var BLOCK_HEIGHT = 101;
//constants for world size
var CANVAS_WIDTH = 1024;
var CANVAS_HEIGHT = 960;

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = CANVAS_WIDTH; //505;
    canvas.height = CANVAS_HEIGHT; //606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        //console.log("Your dt has been set to: " + dt);
        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
         updateEntities(dt);
         checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    
    
    
    function updateEntities(dt) {
        
        allEnemies.forEach(
            function(enemy) {
                enemy.update();
            }
        );
        
        player.update();
        
    }
    
    function checkCollisions() {
        allEnemies.forEach(
            function(enemy) {
                //drain health during contact
                if( enemy.hitPlayer(enemy.x, enemy.y, player.x, player.y) ) {
                    player.health-=2;
                } 
                //check if player has won or has lost all health to reset
                if( player.checkWin() || player.health <= 0) {
                    reset();
                }
            }
        );
        
        allPowerUps.forEach(
            function(power) {
                if( power.pickedUp(power.x, power.y, player.x, player.y) ) {
                    //gain health on contact
                    if(power.val == 0) {
                        player.health += 50;
                    }
                    player.score += power.val;
                    var index = allPowerUps.indexOf(power);
                    allPowerUps.splice(index, 1);
                } 
            }
        );
        
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var gameWorld = 1,
        gameRow1 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        gameRow2 = [ 1, 1, 1, 1, 0, 0, 2, 2, 2, 2 ],
        gameRow3 = [ 1, 1, 1, 1, 0, 0, 2, 2, 2, 2 ],
        gameRow4 = [ 2, 2, 1, 1, 1, 1, 1, 1, 2, 2 ],
        gameRow5 = [ 2, 2, 1, 1, 1, 1, 1, 1, 2, 2 ],
        gameRow6 = [ 2, 2, 2, 2, 2, 1, 1, 1, 1, 1 ],
        gameRow7 = [ 2, 2, 2, 2, 2, 1, 1, 1, 1, 1 ],
        gameRow8 = [ 2, 2, 2, 2, 2, 1, 1, 1, 1, 1 ],
        gameRow9 = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        gameRowA = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        gameGrid = [
            gameRow1, gameRow2, gameRow3, gameRow4, gameRow5, gameRow6, gameRow7, gameRow8, gameRow9, gameRowA
        ],
        imageKey = [
            'images/water-block.png', // water block
            'images/grass-block.png', // grass block
            'images/stone-block.png'  // stone block
        ],
        numRows = 10,
        numCols = 10,
        row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        
        //clear screen completely for redraw
        ctx.fillStyle = "white";
        ctx.fillRect(-50, -50, CANVAS_WIDTH + 50, CANVAS_HEIGHT + 50);
        
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so thast we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                //index of imageKey indicates the block to place based off the index on the gameGrid made up of gameRows
                ctx.drawImage(Resources.get(imageKey[ gameGrid[row][col] ]), col * BLOCK_HEIGHT, row * BLOCK_WIDTH);
            }
        }
        
        overlayText();
        
        renderEntities();
    }
    
    //function for setting up scoreboard information
    function overlayText() {
        ctx.strokeRect(0,0, CANVAS_WIDTH - 15, 50);
        
        ctx.fillStyle = "#ccc";
        ctx.font = "32pt Verdana";
        ctx.fillText("health: " + player.health, 5, 40);
        ctx.lineWidth = 2;
        ctx.strokeText("health: " + player.health, 5, 40);
        ctx.fillText("score: " + player.score, 705, 40);
        ctx.strokeText("score: " + player.score, 705, 40);
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */  
        
        allPowerUps.forEach(
            function(power) {
                power.render();
            }
        );
        
        allEnemies.forEach(
            function(enemy) {
                enemy.render(enemy.dir);
            }
        );
        
        
        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
        player.reset();
        /*
        ctx.fillStyle = "white";
        ctx.fillRect(200, 200, CANVAS_WIDTH - 200, CANVAS_HEIGHT - 200);
        ctx.strokeRect(200, 200, CANVAS_WIDTH - 200, CANVAS_HEIGHT - 200);
        */
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        //'images/enemy-bug.png',
        'images/enemy-bugN.png',
        'images/enemy-bugS.png',
        'images/enemy-bugE.png',
        'images/enemy-bugW.png',
        'images/char-boy.png',
        'images/Heart.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
