import { getCanvasDimension, loadSprite, readLevelFile } from './utils.js'
import { createCanvas } from './canvas.js'
import { Game } from './game.js' 
import { chronoStart, chronoStop } from './chronometre.js'

let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        //Gauche
        leftPressed = true;
    }
    if(e.keyCode == 38) {
        //Haut
        upPressed = true;
    }

    if(e.keyCode == 39) {
        //Droite
        rightPressed = true;
    }

    if(e.keyCode == 40) {
        //Bas
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 37) {
        //Gauche
        leftPressed = false;
    }
    if(e.keyCode == 38) {
        //Haut
        upPressed = false;
    }

    if(e.keyCode == 39) {
        //Droite
        rightPressed = false;
    }

    if(e.keyCode == 40) {
        //Bas
        downPressed = false;
    }
}

let sprites = {
    background: loadSprite('sprites/background.png'),
    caisseOk: loadSprite('sprites/caisse_ok.jpg'),
    caisse: loadSprite('sprites/caisse.jpg'),
    mur: loadSprite('sprites/mur.jpg'),
    objectif: loadSprite('sprites/objectif.png'),
    perso: [loadSprite('sprites/perso_haut.png'),
        loadSprite('sprites/perso_bas.png'),
        loadSprite('sprites/perso_droite.png'),
        loadSprite('sprites/perso_gauche.png')
    ]
}

class PlayGame {
    constructor(canvas, spriteSize, levelFileContent) {
        this.game = new Game(levelFileContent);
        this.isFirstMovement = true;
        this.canvas = canvas;
        this.initMap(spriteSize);
        this.drawMap();

    }

    initMap(spriteSize) {
        let nbColumns = this.canvas.canvas.width / spriteSize;
        let nbLines = this.canvas.canvas.height / spriteSize;
        
        for(let i = 0; i < nbLines; i++) {
            for(let j = 0; j < nbColumns; j++) {
                this.canvas.drawImage(sprites.background, j * sprites.background.width, i * sprites.background.height, sprites.background.width, sprites.background.height);
            }
        }
    }

    drawMap() {
        const map = this.game.map;
        const nbLines = map.length;

        for(let i = 0; i < nbLines; i++) {
            const nbColumns = map[i].length;
            for(let j = 0; j < nbColumns; j++) {
                if(map[i][j] === '#') {
                    this.canvas.drawImage(sprites.mur, j * sprites.background.width, i * sprites.background.height, sprites.background.width, sprites.background.height);
                }
                else if(map[i][j] === 'C') {
                    this.canvas.drawImage(sprites.caisse, j * sprites.background.width, i * sprites.background.height, sprites.background.width, sprites.background.height);
                }
                else if(map[i][j] === 'I') {
                    this.canvas.drawImage(sprites.objectif, j * sprites.background.width, i * sprites.background.height, sprites.background.width, sprites.background.height);
                }
                else if(map[i][j] === 'P') {
                    this.canvas.drawImage(sprites.perso[this.game.player.orientation], j * sprites.background.width, i * sprites.background.height, sprites.background.width, sprites.background.height);
                }
                else if(map[i][j] === 'K') {
                    this.canvas.drawImage(sprites.caisseOk, j * sprites.background.width, i * sprites.background.height, sprites.background.width, sprites.background.height);
                }
                else {
                    this.canvas.drawImage(sprites.background, j * sprites.background.width, i * sprites.background.height, sprites.background.width, sprites.background.height);
                }
            }
        }
    }

    run() {
        this.hasWin = false;
        if(upPressed) {
            this.game.move('up');
            if(this.game.hasWin()) {
                this.hasWin = true;
            }
            if(this.isFirstMovement === true) {
                chronoStart();
                this.isFirstMovement = false;
            }
            
        }
        if(leftPressed) {
            this.game.move('left');
            if(this.game.hasWin()) {
                this.hasWin = true;
            }  
            if(this.isFirstMovement === true) {
                chronoStart();
                this.isFirstMovement = false;
            }
        }
        if(rightPressed) {
            this.game.move('right');
            if(this.game.hasWin()) {
                this.hasWin = true;
            }
            if(this.isFirstMovement === true) {
                chronoStart();
                this.isFirstMovement = false;
            }
        }
        if(downPressed) {
            this.game.move('down');
            if(this.game.hasWin()) {
                this.hasWin = true;
            }  
            if(this.isFirstMovement === true) {
                chronoStart();
                this.isFirstMovement = false;
            }
        }
        if(this.hasWin === true) {
            const event = new Event('win');
            document.dispatchEvent(event);
            chronoStop();
        }
    }
}

const generateGameView = () => {
    const levelMenu = document.getElementById('level-menu');
    levelMenu.remove();
    document.body.innerHTML = document.body.innerHTML + 
    `
    <div id="game-info">
        <h1>Stats</h1>
        <div>
            <span>Nombre de coups : </span>
            <span id="nb-move">0</span>
        </div>
        <div>
            <span>Chronomètre : </span>
            <span id="chronotime">0:00:00:000</span>
        </div>
        <div></div>
    </div>
    <canvas id="canvas">
    `
    console.log(document.body)
}

export const playGame = async (level) => {
    let levelContent = level;
    generateGameView();
    const spriteSize = 34;
    const canvasContext = createCanvas(getCanvasDimension(levelContent.split(/\r?\n/)));
    const app = new PlayGame(canvasContext, spriteSize, levelContent);
    
    let waitForKeyUp = setInterval(function () {
        app.run();
        if(app.hasWin === true) {
            clearInterval(waitForKeyUp);
        }
    }, 100);
    document.addEventListener('playerMovement', function() {
        app.drawMap();
        const nbMoveElm = document.getElementById('nb-move');
        nbMoveElm.innerText = app.game.nbMove;
    })
}