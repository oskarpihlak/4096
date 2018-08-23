import Phaser from "phaser";
import  {gameOptions} from "../index";

export class BootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text:'Loading...',
            style:{
                font:'20px monospace',
                fill:'#fffffff'
            }
        });
        loadingText.setOrigin(0.5,0.5);

        let precentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text:'0%',
            style:{
                font:'18px monospace',
                fill:'#ffffff'
            }
        });
        precentText.setOrigin(0.5,0.5);

        let assetText = this.make.text({
            x: width / 2,
            y: width / 2 + 50,
            text:'',
            style:{
                font:'18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', value => {
            precentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30)
        });

        this.load.on('fileprogress', file =>{
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', ()=>{
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            precentText.destroy();
            assetText.destroy();
        });
        this.load.image("restart", "assets/sprites/restart.png");
        this.load.image("scorepanel", "assets/sprites/scorepanel.png");
        this.load.image("scorelabels", "assets/sprites/scorelabels.png");
        this.load.image("logo", "assets/sprites/logo.png");
        this.load.image("howtoplay", "assets/sprites/howtoplay.png");
        this.load.image("gametitle", "assets/sprites/gametitle.png");

        this.load.image("emptytyle", "assets/sprites/emptytile.png");
        this.load.spritesheet("tiles", "assets/sprites/tiles.png", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.load.audio("move", ["assets/sounds/move.ogg", "assets/sounds/move.mp3"]);
        this.load.audio("grow", ["assets/sounds/grow.ogg", "assets/sounds/grow.mp3"]);

        this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt')
    }
    create(){
        this.scene.start("PlayGame");
    }
}