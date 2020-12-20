//the retry menu after you die

class retry extends Phaser.Scene {
    constructor() {
      super("retry");
    }

    create() {
      // style objects to style the text
        const style = { font: "50px Arial", fill: "#ffffff", align: 'right' };
        const styleGameOver = { font: "40px Arial", fill: "#57AAF2", align: 'center' };

      // adding the text on the screen
        this.add.text(60, 150, 'Game Over!', style);
        const retry = this.add.text(130, 350, 'Retry ?', styleGameOver);
      //making it clickable
        retry.setInteractive();
        retry.on('pointerdown', () => {this.scene.start('playGame')});
  }
}