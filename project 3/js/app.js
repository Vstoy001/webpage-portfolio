//constants for dimensions of a tile
var TILE_WIDTH = 102;
var TILE_HEIGHT = 83;
//constants for game world size
var CANVAS_WIDTH = 1024;
var CANVAS_HEIGHT = 960;

// Enemies our player must avoid
var Enemy = function(posX, posY, direction, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = posX;
    this.y = posY;
    this.dir = direction;
    this.spd = velocity;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //determine direction enemy is moving
    if(this.dir == 'E' || this.dir == 'W') {
        this.x = Enemy.prototype.move(this.x, this.dir, this.spd); //run possible directions east or west
    } else { 
        this.y = Enemy.prototype.move(this.y, this.dir, this.spd); //run possible directions north or south
    }

    //console.log("moved an enemy in direction: " + this.dir + " at speed: "+ this.spd);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
    //console.log("rendered enemy at: " + this.x + " " + this.y);
}

Enemy.prototype.move = function(pos, dir, spd)
{
    if(dir == 'S' || dir == 'E') {
        pos += spd;
        if(pos > CANVAS_WIDTH) {
            pos = 0 - 20; //wrap enemy around a bit off screen
        }   
    } else {
        pos -= spd;
        if(pos < 0) {
            pos = CANVAS_WIDTH + 20; //wrap enemy around a bit off screen
        }
    }
    return pos;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY) {
    this.sprite = 'images/char-boy.png';
    this.x = posX;
    this.y = posY;
    this.comm = "neutral";
}

Player.prototype.update = function(dt) {
    //console.log("Player is currently: " + this.comm);
    if(this.comm == "neutral") {
        return;
    }
    
    if(this.comm == "left" || this.comm == "right") {
        this.x = Player.prototype.move(this.comm, this.x); //assign x to possible directions left or right
    } else {
        this.y = Player.prototype.move(this.comm, this.y); //assign y to possible direction up or down
    }
    
    this.comm = "neutral";
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
    //console.log("player moved to " + this.x + " " + this.y);
}

Player.prototype.move = function(comm, pos)
{
    switch(comm) {
        case "left":
            if(pos/TILE_WIDTH > 0) { 
                pos -= TILE_WIDTH;
            }
            return pos;
        case "up":
            if(pos/TILE_HEIGHT > 0) { 
                pos -= TILE_HEIGHT;
            }
            return pos;
        case "right":
            if(pos/TILE_WIDTH < 9) { 
                pos += TILE_WIDTH;
            }
            return pos;
        case "down":
            if(pos/TILE_HEIGHT < 9) { 
                pos += TILE_HEIGHT;
            }
            return pos;
        default:
            console.log("invalid input");
            break;
    }
}

Player.prototype.handleInput = function(dir) {
    //switch checks on what input has been recieved 
    //to pass to a variable for a movement update function
    switch(dir) {
        case "left":
            this.comm = "left";
            break;
        case "up":
            this.comm = "up";
            break;
        case "right":
            this.comm = "right";
            break;
        case "down":
            this.comm = "down";
            break;
        default:
            console.log("invalid input");
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyA = new Enemy(1 * TILE_WIDTH, 2 * TILE_HEIGHT, "E", 10);
var enemyB = new Enemy(4 * TILE_WIDTH, 5 * TILE_HEIGHT, "S", 5);
var enemyC = new Enemy(3 * TILE_WIDTH, 6 * TILE_HEIGHT, "E", 10);

var allEnemies = [enemyA, enemyB, enemyC];

//create a player at coordinate (x, y)
var player = new Player(5 * TILE_WIDTH, 5 * TILE_HEIGHT);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //debug console output to see input
    console.log("pressed: " + e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
});
