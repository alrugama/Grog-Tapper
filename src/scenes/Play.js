class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        //backgound
        this.load.image('play', './assets/Bar Background Updated.png');
        this.load.image('hourglass', './assets/Hourglass.png')
      
        //backgound music
        this.load.audio('music', './assets/BarMusic.wav');
        this.load.audio('pour', './assets/Pouring sound effect.wav');

        //Drinks
        this.load.image('blue', './assets/Glass Blue.png');
        this.load.image('green', './assets/Glass Green.png');
        this.load.image('orange', './assets/Glass Orange.png');
        this.load.image('pink', './assets/Glass Pink.png');
        this.load.image('purple', './assets/Glass Purple.png');
        this.load.image('red', './assets/Glass Red.png');
        this.load.image('yellow', './assets/Glass Yellow.png');

        //hourglass
        this.load.image('hourglass', './assets/Hourglass.png');

        //pirate spritesheet
        this.load.spritesheet('pirate', './assets/Alternative Pirate Spritesheet.png', {frameWidth: 200, frameHeight: 227, 
            startFrame: 0, endFrame: 1});

    }
    
    create(){
        this.add.image(0,0, 'play').setOrigin(0, 0);
        
        //Initialize score
        this.score = 0;

        //Animation config
        this.anims.create({
            key: 'bob',
            frames: this.anims.generateFrameNumbers('pirate', {start: 0, end: 1, first:0}),
            frameRate: 1,
            repeat: 2000
        });

        //insert pirate
        let pirateBob = this.add.sprite(game.config.width/2 - 100, game.config.height/2 - (227/2) - 10, 'pirate'). setOrigin(0, 0);
        pirateBob.anims.play('bob');

        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        //create Key display object
        this.curKeyNum = Math.round(Math.random() * (this.alphabet.length - 1));
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
        this.curKeyDisplay = this.add.text(game.config.width/2 + 70, game.config.height/2 , this.alphabet[this.curKeyNum], this.displayConfig)


        //create looping timerevent that changes the key
        this.keyTimer = new Phaser.Time.TimerEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                //change key
                //console.log("change Key");
                this.curKeyNum = Math.round(Math.random() * (this.alphabet.length - 1));
                this.curKeyDisplay.text = this.alphabet[this.curKeyNum];
                this.currentKey = this.input.keyboard.addKey(this.alphabet[this.curKeyNum]);
            }
        });
        //this.timeClock.addEvent(this.keyTimer);
        this.clock = this.time.addEvent(this.keyTimer);

        this.isCorrect = false;
        this.currentKey = this.input.keyboard.addKey(this.alphabet[this.curKeyNum]);


        
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
        //game over text config
        this.gameOverConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }
        //50

        //color
        this.colors = ['blue', 'green','red','yellow','purple','orange','pink'];
        this.add.image(game.config.width/2 - 30, game.config.height/2 + 44,this.colors[Math.floor(Math.random()*this.colors.length)]).setOrigin(0,0);

        //music loop
        var bgMusic = this.sound.add('music');
        bgMusic.setLoop(true);
        bgMusic.play();

        //create and display counting timer

        // adds a clock that counts up this.timer
        this.timer = 0;
        this.timeLimit = new Phaser.Time.TimerEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                //if the game isn't over, increase and display the timer
                if (!this.gameOver) {
                    this.timer += 1;
                    this.timeRight.text = game.settings.gameTimer - this.timer;
                }
            }
        })
        this.clock = this.time.addEvent(this.timeLimit);

        this.timerConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        //#843605

        //timer
        this.add.image(game.config.width/2, 380, 'hourglass').setOrigin(0, 0);
        this.timeRight = this.add.text( game.config.width/2 - 5, 395, game.settings.gameTimer, this.timerConfig);
        
    }
    
    update(){
        this.isCorrect = false;
        //Game restart


        if (this.timer >= game.settings.gameTimer) {
            this.gameOver = true;
            this.time.removeEvent(this.timeLimit);
            this.gameOverText = this.add.text( game.config.width/2, game.config.height/2, "Game Over", this.gameOverConfig);
            this.gameOverText.x -= this.gameOverText.width/2;
            this.gameOverText.y -= this.gameOverText.height/2;
            
            this.gameOverScoreText = this.add.text( game.config.width/2, game.config.height/2 + this.gameOverText.height, this.score, this.gameOverConfig);
            this.gameOverScoreText.x -= this.gameOverScoreText.width/2;
            this.gameOverScoreText.y -= this.gameOverScoreText.height/2;

            this.scene.start('menuScene');
        }

        //console.log(this.isCorrect);
        if (this.currentKey.isDown && !this.gameOver) {
            //console.log("correct!");
            //this.keyTimer.reset(this.keyTimer.config);
            this.time.removeEvent(this.keyTimer);
            this.clock = this.time.addEvent(this.keyTimer);
            this.curKeyNum = Math.round(Math.random() * (this.alphabet.length - 1));
            this.curKeyDisplay.text = this.alphabet[this.curKeyNum];
            this.currentKey = this.input.keyboard.addKey(this.alphabet[this.curKeyNum]);
            this.sound.play('pour');
            this.score += 10;
            this.scoreLeft.text = this.score;
            this.add.image(game.config.width/2 - 30, game.config.height/2 + 44,this.colors[Math.floor(Math.random()*this.colors.length)]).setOrigin(0,0);
        }

    }
}
