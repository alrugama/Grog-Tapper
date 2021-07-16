let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
}

//create game
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//Reserve keyboard vars
let keyA, keyB, keyC, keyD, keyE,keyF, keyG, keyH, keyI, keyJ, 
    keyK, keyL, keyM, keyN, keyO, keyP, keyQ, keyR, keyS,
    keyT, keyU, keyV, keyW, keyX, keyY, keyZ, keyENTER;
    