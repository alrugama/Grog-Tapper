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
        
        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        //create Key display object
        this.curKeyNum = Math.round(Math.random() * this.alphabet.length);
        this.displayConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.curKeyDisplay = this.add.text(game.config.width/2, game.config.height/2, this.alphabet[this.curKeyNum], this.displayConfig)

        //create clock
        //this.timeClock = new Phaser.Time.Clock(this);
        //create looping timerevent that changes the key
        this.keyTimer = new Phaser.Time.TimerEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                //change key
                console.log("change Key");
                this.curKeyNum = Math.round(Math.random() * this.alphabet.length);
                this.curKeyDisplay.text = this.alphabet[this.curKeyNum];
            }
        });
        //this.timeClock.addEvent(this.keyTimer);
        this.clock = this.time.addEvent(this.keyTimer);
        

    }
    
    update(){
        let isCorrect = false;
        //if correct key pressed
        this.input.keyboard.on('keydown-' + this.alphabet[this.curKeyNum], function (event) {
            isCorrect = true;
            console.log(isCorrect);
        });
        
        
        if (isCorrect) {
            console.log("correct!");
            this.clock.keyTimer.reset(this.keyTimer.config);
            this.curKeyNum = Math.round(Math.random() * this.alphabet.length);
            this.curKeyDisplay.text = this.alphabet[this.curKeyNum];
        }

            
    }


}