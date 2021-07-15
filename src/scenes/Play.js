class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('play', './assets/tempBar.png');
        //this.load.image('center', './assets/center.png');

        this.load.audio('music', './assets/BarMusic.wav');

    }
    
    create(){
        this.add.image(0,0, 'play').setOrigin(0, 0);
        //this.add.image(game.config.width/2 - 40, game.config.height/2 - 40, 'center').setOrigin(0,0);
        
        //Initialize score
        this.score = 0;
        
        //Display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
                },
            fixedWidth: 100
            }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.score,
            scoreConfig);
        
        //GAME OVER flag
        this.gameOver = false;
            /*
            //60-sec play clock
            scoreConfig.fixedWidth = 0;
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (ENTER) to return to menu',
                scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }, null, this);
            */
        var bgMusic = this.sound.add('music');
        bgMusic.setLoop(true);
        bgMusic.play();
    }
    
    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start('menuScene');
        }

    }


}