class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        this.load.image('menu', './assets/tempBG_1.png');
    }
    
    create(){
        this.add.image(0,0, 'menu').setOrigin(0, 0);
    }

    update(){
        //this.scene.start('playScene');  
    }
}
