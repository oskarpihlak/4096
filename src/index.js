import 'phaser';
import { PlayGame } from './scene/playGame';
import { BootGame } from "./scene/bootGame";
let game;
export const gameOptions = {
    tileSize: 200,
    tileSpacing: 20,
    boardSize: {
        rows: 4,
        cols: 4
    },
    tweenSpeed: 50,
    swipeMaxTime: 1000,
    swipeMinDistance: 20,
    swipeMinNormal: 0.85,
    aspectRatio: 16 / 9,
    localStorageName: 'topscore4096'
};
export const LEFT = 0;
export const RIGHT = 1;
export const UP = 2;
export const DOWN = 3;

window.onload = function(){
    let tileAndSpacing = gameOptions.tileSize + gameOptions.tileSpacing;
    let width = gameOptions.boardSize.cols * tileAndSpacing;
    width += gameOptions.tileSpacing;
    const gameConfig = {
        type: Phaser.AUTO,
        width: width,
        height: width * gameOptions.aspectRatio,
        scene: [BootGame, PlayGame],
        titile: 'Learning Phaser app',
        backgroundColor: 0xecf0f1,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        pixelArt: false
    };
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
};

function resizeGame() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}




