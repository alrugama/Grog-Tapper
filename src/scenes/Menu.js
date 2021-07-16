class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        this.load.image('menu', './assets/tempBG_1.png');
        
    }
    
    create(){
        this.add.image(0,0, 'menu').setOrigin(0, 0);

        //define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


        

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start('playScene');
        } 
    }
}
