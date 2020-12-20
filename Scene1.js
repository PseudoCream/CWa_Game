//scene 1, where every asset for the game is lodded
class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  //loading the assets for the game
  preload(){
    this.load.image("background", "background.png");
    //
    this.load.spritesheet("ship", "ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "player.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.audio('explosionSound', ["explosion.mp3"]);

    this.load.audio('music', ["music.mp3"]);
    this.load.audio('beamSound', ["beam.mp3"]);

    // 1.2 load the font for the score
    this.load.bitmapFont("pixelFont", "font.png", "font.xml");
  }

  create() {
    //creating the style of the start screen when you first load the game
    const style = {font: "35px Arial", fill: "#ffffff", align: "center", };

    //adding it to the screen
    this.add.text(60, 150, 'Press HERE to start', style);
    this.input.on('pointerdown', () => {this.scene.start('playGame')});

    //making the animations of the assets
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

  }
}
