//constants for dimensions of a tile
var TILE_WIDTH = 102;
var TILE_HEIGHT = 83;
//constants for game world size
var CANVAS_WIDTH = 1024;
var CANVAS_HEIGHT = 960;

var ENEMY_WIDTH = 100;
var ENEMY_HEIGHT = 70;

var ENEMY_OFFSET = -20;
var HEART_OFFSET = -30;
var GEM_OFFSET = -50;

var PLAYER_WIDTH = 70;
var PLAYER_HEIGHT = 90;

var PLAYER_OFFSET_V = 50;
var PLAYER_OFFSET_H = 10;

// Enemies our player must avoid
var Enemy = function(posX, posY, direction, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.spriteN = 'images/enemy-bugN.png';
    this.spriteW = 'images/enemy-bugW.png';
    this.spriteS = 'images/enemy-bugS.png';
    this.spriteE = 'images/enemy-bugE.png';
    this.x = posX;
    this.y = posY + ENEMY_OFFSET;
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
Enemy.prototype.render = function(dir) {

    switch(dir)
    {
        case "N":
            ctx.drawImage(Resources.get(this.spriteN), this.x, this.y);
            break;
            
        case "W":
            ctx.drawImage(Resources.get(this.spriteW), this.x, this.y);
            break;
            
        case "S":
            ctx.drawImage(Resources.get(this.spriteS), this.x, this.y);
            break;
            
        case "E":
            ctx.drawImage(Resources.get(this.spriteE), this.x, this.y);
            break;
    }
    //console.log("rendered enemy at: " + this.x + " " + this.y);
}

Enemy.prototype.move = function(pos, dir, spd) {
    if(dir == 'S' || dir == 'E') {
        pos += spd;
        if(pos > CANVAS_WIDTH) {
            pos = 0 - 100; //wrap enemy around a bit off screen
        }   
    } else {
        pos -= spd;
        if(pos < 0 - ENEMY_WIDTH) {
            pos = CANVAS_WIDTH + 100; //wrap enemy around a bit off screen
        }
    }
    return pos;
}

//function that checks for collision
Enemy.prototype.hitPlayer = function(eX, eY, pX, pY) {
    pCenterX = pX + PLAYER_WIDTH/2;
    pCenterY = pY + PLAYER_HEIGHT/2;
    
    if( (eX < pX + PLAYER_WIDTH) && (eX + ENEMY_WIDTH > pX) &&
        (eY < pY + PLAYER_HEIGHT) && (eY + ENEMY_HEIGHT > pY) ) {
        return 1;
    } else {
        return 0;
    }
}

//heart object, gives player 50 health when picked up
var PowerUp = function(posX, posY, type, value) {
    this.x = posX;
    switch(type) {
        case "Heart": 
            this.sprite = 'images/Heart.png';
            this.y = posY + HEART_OFFSET;
            break;
        case "Gem_Blue": 
            this.sprite = 'images/Gem Blue.png';
            this.y = posY + GEM_OFFSET;
            break;
        case "Gem_Green": 
            this.sprite = 'images/Gem Green.png';
            this.y = posY + GEM_OFFSET;
            break;
        case "Gem_Orange": 
            this.sprite = 'images/Gem Orange.png';
            this.y = posY + GEM_OFFSET;
            break;
    }
    this.val = value;
}

PowerUp.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

PowerUp.prototype.pickedUp = function(oX, oY, pX, pY) {
    //for simplicity since hearts are static, we can compare the relative coordinates of the origins 
    //on the player and heart 
    if( (Math.abs(oX - pX) < 50) && (Math.abs(oY - pY) < 50) ) {
        return 1;
    } else {
        return 0;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY, startingHealth, startingScore) {
    this.sprite = 'images/char-boy.png';
    this.health = startingHealth;
    this.score = startingScore;
    this.x = posX + PLAYER_OFFSET_H;
    this.y = posY + PLAYER_OFFSET_V;
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
            if(pos/TILE_WIDTH > 1) { 
                pos -= TILE_WIDTH;
            }
            return pos;
        case "up":
            if(pos/TILE_HEIGHT > 1) { 
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

Player.prototype.reset = function() {
    //this.sprite = 'images/char-boy.png';
    this.health = 50;
    this.score = 0;
    this.x = 5 * TILE_WIDTH + PLAYER_OFFSET_H;
    this.y = 9 * TILE_HEIGHT + PLAYER_OFFSET_V;
    this.comm = "neutral";
    allPowerUps = [heartA, heartB, heartC, gem_bA, gem_bB, gem_gA, gem_gB, gem_oA, gem_oB];
}

Player.prototype.checkWin = function() {
    if(this.y <= TILE_HEIGHT) {
        return 1;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyA = new Enemy(1 * TILE_WIDTH, 2 * TILE_HEIGHT, "E", 8);
var enemyB = new Enemy(4 * TILE_WIDTH, 5 * TILE_HEIGHT, "E", 6);
var enemyC = new Enemy(3 * TILE_WIDTH, 6 * TILE_HEIGHT, "W", 4);
var enemyD = new Enemy(2 * TILE_WIDTH, 2 * TILE_HEIGHT, "E", 4);
var enemyE = new Enemy(5 * TILE_WIDTH, 3 * TILE_HEIGHT, "W", 6);
var enemyF = new Enemy(2 * TILE_WIDTH, 2 * TILE_HEIGHT, "E", 4);
var enemyG = new Enemy(6 * TILE_WIDTH, 3 * TILE_HEIGHT, "W", 8);

var enemyH = new Enemy(1 * TILE_WIDTH, 6 * TILE_HEIGHT, "E", 6);
var enemyI = new Enemy(0 * TILE_WIDTH, 7 * TILE_HEIGHT, "E", 2);
var enemyJ = new Enemy(6 * TILE_WIDTH, 2 * TILE_HEIGHT, "S", 6);

var enemyK = new Enemy(2 * TILE_WIDTH, 4 * TILE_HEIGHT, "S", 8);

var enemyN = new Enemy(8 * TILE_WIDTH, 0 * TILE_HEIGHT, "N", 4);
var enemyM = new Enemy(5 * TILE_WIDTH, 8 * TILE_HEIGHT, "E", 4);

var enemyO = new Enemy(2 * TILE_WIDTH, 9 * TILE_HEIGHT, "E", 4);
var enemyP = new Enemy(8 * TILE_WIDTH, 7 * TILE_HEIGHT, "E", 6);
var enemyQ = new Enemy(7 * TILE_WIDTH, 8 * TILE_HEIGHT, "E", 6);



var allEnemies = [enemyA, enemyB, enemyC, enemyD, enemyE, enemyF, enemyG, enemyH, enemyI, enemyJ, enemyK, enemyN, enemyM, enemyO, enemyP, enemyQ];

var heartA = new PowerUp(9 * TILE_WIDTH, 5 * TILE_HEIGHT, "Heart", 0);
var heartB = new PowerUp(1 * TILE_WIDTH, 4 * TILE_HEIGHT, "Heart", 0);
var heartC = new PowerUp(4 * TILE_WIDTH, 6 * TILE_HEIGHT, "Heart", 0);

var gem_bA = new PowerUp(1 * TILE_WIDTH, 5 * TILE_HEIGHT, "Gem_Blue", 100);
var gem_bB = new PowerUp(8 * TILE_WIDTH, 5 * TILE_HEIGHT, "Gem_Blue", 100);
var gem_gA = new PowerUp(1 * TILE_WIDTH, 8 * TILE_HEIGHT, "Gem_Green", 50);
var gem_gB = new PowerUp(8 * TILE_WIDTH, 8 * TILE_HEIGHT, "Gem_Green", 50);
var gem_oA = new PowerUp(1 * TILE_WIDTH, 2 * TILE_HEIGHT, "Gem_Orange", 150);
var gem_oB = new PowerUp(8 * TILE_WIDTH, 2 * TILE_HEIGHT, "Gem_Orange", 150);

var allPowerUps = [heartA, heartB, heartC, gem_bA, gem_bB, gem_gA, gem_gB, gem_oA, gem_oB];

//create a player at coordinate (x, y)
var player = new Player(5 * TILE_WIDTH, 9 * TILE_HEIGHT, 50, 0);

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
