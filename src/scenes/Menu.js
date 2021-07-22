class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        this.load.image('menu', './assets/Menu Background With Title.png');
        
    }
    
    create(){
        this.add.image(0,0, 'menu').setOrigin(0, 0);

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            game.settings = {
                gameTimer: 5
            }
            this.scene.start('playScene');
        } 
    }
}
