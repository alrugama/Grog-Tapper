class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('play', './assets/tempBar.png');
        this.load.image('center', './assets/center.png');

    }
    
    create(){
        this.add.image(0,0, 'play').setOrigin(0, 0);
        this.add.image(game.config.width/2 - 40, game.config.height/2 - 40, 'center').setOrigin(0,0);

    }
    
    update(){

    }


}