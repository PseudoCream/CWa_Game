// gameSettings define the player speed and and some other useful variables

var gameSettings = {
  playerSpeed: 200,
  powerUpVel: 50,
}

// the configuration object for the game like the width and height of the menu and the game type
var config = {
  width: 400,
  height: 500,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2, retry],
  pixelArt: true,
  parent: 'game-container',
  physics: {
    default: "arcade",
    arcade:{
        debug: false,
        debugShowVelocity: false
    }
  }
}


//  the game variable
var game = new Phaser.Game(config);
