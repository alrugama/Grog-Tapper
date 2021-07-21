class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        //backgound
        this.load.image('play', './assets/Bar Background.png');

        //keys
        this.load.image('center', './assets/Letter Keys/Letter Key_A.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_B.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_C.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_D.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_E.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_F.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_G.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_H.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_I.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_J.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_K.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_L.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_M.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_N.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_O.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_P.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_Q.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_R.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_S.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_T.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_U.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_V.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_W.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_X.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_Y.png');
        this.load.image('center', './assets/Letter Keys/Letter Key_Z.png');

        //backgound music
        this.load.audio('music', './assets/BarMusic.wav');
        this.load.audio('pour', './assets/Pouring sound effect.wav');

    }
    
    create(){
        this.add.image(0,0, 'play').setOrigin(0, 0);
        
        //Initialize score
        this.score = 0;

        //time bar
        //this.time = new Bar(this, game.config.width/2 + 10, game.config.height/2 - 20, 2000);

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
                //console.log("change Key");
                this.curKeyNum = Math.round(Math.random() * this.alphabet.length);
                this.curKeyDisplay.text = this.alphabet[this.curKeyNum];
                this.currentKey = this.input.keyboard.addKey(this.alphabet[this.curKeyNum]);
            }
        });
        //this.timeClock.addEvent(this.keyTimer);
        this.clock = this.time.addEvent(this.keyTimer);

        this.isCorrect = false;
        this.currentKey = this.input.keyboard.addKey(this.alphabet[this.curKeyNum]);
        //this.time = new Bar(this, game.config.width/2 + 10, game.config.height/2 - 20, 2000);

        
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
 
        var bgMusic = this.sound.add('music');
        bgMusic.setLoop(true);
        bgMusic.play();
    }
    
    update(){
        this.isCorrect = false;
 
        //if correct key pressed
        //this.time = new Bar(this, game.config.width/2 + 10, game.config.height/2 - 20, 2000);


        //console.log(this.isCorrect);
        if (this.currentKey.isDown) {
            //console.log("correct!");
            //this.keyTimer.reset(this.keyTimer.config);
            this.time.removeEvent(this.keyTimer);
            this.clock = this.time.addEvent(this.keyTimer);
            this.curKeyNum = Math.round(Math.random() * this.alphabet.length);
            this.curKeyDisplay.text = this.alphabet[this.curKeyNum];
            this.currentKey = this.input.keyboard.addKey(this.alphabet[this.curKeyNum]);
            this.sound.play('pour');
            this.score += 10;
            this.scoreLeft.text = this.score;
        }
        
        //this.input.keyboard.on('keydown', function);
        //this.input.keyboard.on('keydown', function () {console.log('wrong key'); });
        //this.input.keyboard.on('keydown', function (wrongKey, wrong) { console.log('wrong');});


            //console.log('wrong key');
            //this.score -= 10;
            //this.scoreLeft.text = this.score;
        
        
        /*
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start('menuScene');
        }
        */
    }

    wrongKey(){
        this.score -= 10;
        this.scoreLeft.text = this.score;
    }
}

class Bar{
    constructor(scene, x, y, time){
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        //this.value = time;
        this.value = 100;
        this.p = 76/100;
        
        this.draw();
        scene.add.existing(this.bar);
    }
    decrease(amount){
        this.value -= amount;

        if(this.value < 0){
            this.value = 0;
        }
        this.draw();
        return(this.value === 0);
    }

    draw(){
        this.bar.clear();

        //bg
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        //time
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if(this.value < 30){
            this.bar.fillStyle(0xff0000);
        }else{
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
}