// the main game scene
class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");

  }

  create() {
    //creating a background for the game
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
    this.ship = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
    this.ship0 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");

    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");

    // 3.1 add the ships to a group with physics
    this.enemiesLvlTwo = this.physics.add.group();

    this.enemiesLvlTwo.add(this.ship2);
    this.enemiesLvlTwo.add(this.ship3);

    this.enemies = this.physics.add.group();

    this.enemies.add(this.ship1);
    this.enemies.add(this.ship);
    this.enemies.add(this.ship0);

    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);


    this.ship.play("ship1_anim");
    this.ship0.play("ship1_anim");
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");



    //add collision detection to the borders to avoid going of the screen
    this.physics.world.setBoundsCollision();

    // getting the player on screen and adding animations making him interactive
    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);


    // assigning the keys to move and shoot
    this.j = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    this.projectiles = this.add.group();


    //detecting collsion with the power ups (deleted)
    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
      projectile.destroy();
    });

    //detecting collsion with the power ups (deleted)
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

    //detecting collsion with the enemies
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

    //detecting collsion with the enemies and the shots
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    // 3.1 Add HUD background
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    //
    graphics.closePath();
    graphics.fillPath();

    // 2.1 add a score property
    this.score = 0;


    //enemy explosion sound
    this.explosionSound = this.sound.add('explosionSound');

    //beam sound effect
    this.beamSound = this.sound.add('beamSound');
  
    //background music
    this.music = this.sound.add('music');

    let musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }

    this.music.play(musicConfig)

    // 4.3 format the score
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated  , 16);

  }

  // pick up powerups (deleted)
  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
  }

  //when the player dies the gameover screen show up
  hurtPlayer(player, enemy) {
    this.music.stop();
    this.scene.pause();
    this.scene.start('retry');
  }


  hurtPlayerLvlTwo() {
    return;
  }

  // resets the player position to the center of the screen
  resetPlayer() {
    let x = config.width / 2 - 8;
    let y = config.height + 64;
    this.player.enableBody(true, x, y, true, true)

    this.player.alpha = 0.5;

    let tween = this.tweens.add({
      targets: this.player,
      y: config.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat:0,
      onComplete: function(){
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }


  //the function for when you hit an enemy with your shoots
  hitEnemy(projectile, enemy) {

    let explosion = new Explosion(this, enemy.x, enemy.y)

    projectile.destroy();
    this.resetShipPos(enemy);
    // 2.2 increase score
    this.score += 15;
    this.explosionSound.play()

    // 4.2 format the score
     var scoreFormated = this.zeroPad(this.score, 6);
     this.scoreLabel.text = "SCORE " + scoreFormated;
  }
  
  // 4.1 zero pad format function
  zeroPad(number, size){
      var stringNumber = String(number);
      while(stringNumber.length < (size || 2)){
        stringNumber = "0" + stringNumber;
      }
      return stringNumber;
  }


  update() {


    // if the score is "0" deactivate 'ship2' and "ship3"
    if (this.score == 0) {
      this.ship2.visible = false;
      this.ship3.visible = false;
      this.enemies.remove(this.ship2);
      this.enemies.remove(this.ship3);
      this.physics.add.overlap(this.player, this.enemiesLvlTwo, this.hurtPlayerLvlTwo, null, this);
    // if the score is > 250 activate 'ship2' and "ship3"
    } else if (this.score > 250) {
      this.ship2.visible = true;
      this.ship3.visible = true;
      this.enemies.add(this.ship2);
      this.enemies.add(this.ship3);
    }

    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship0, 1);
    this.moveShip(this.ship, 1);

    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    // for testing purpouses
    // this.ship1.destroy();
    // this.ship2.destroy();
    // this.ship3.destroy();

    this.background.tilePositionY -= 0.5;


    // function to shoot when you hit a key
    this.movePlayerManager();
    if (Phaser.Input.Keyboard.JustDown(this.j)) {
      if (this.player.active) {
        this.shootBeam();
      }
    }
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }


  }

  // shoot the beam 
  shootBeam() {
    var beam = new Beam(this);
    this.beamSound.play()
  }


  // function to move the player when you hit a key
  movePlayerManager() {

    this.player.setVelocity(0);

    if (this.a.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.d.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if (this.w.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.s.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }



  // move the ship downwards
  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  }

  //reset the ship position to the top when they reach the very bottom of the screen
  resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }



  // destroy the player and play the desruction animation when the player gets hit
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  //destroy the enemy and play the desruction animation when the enemy gets hit

  hitShip(enemy) {
    enemy.setTexture("explosion");
    enemy.play("explode");
    if (enemy.setTexture('explosion')) {
      setTimeout(() => {
        enemy.destroy();
      }, 90);
    }
    
  }
}
