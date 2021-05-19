class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.orientation = 0;
    }
}

class Goal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Game {
    constructor(levelFileContent) {
        this.player = null;
        this.map = null;
        this.goals = new Array();
        this.win = false;
        this.nbMove = 0;
        this.parseLevelFileContent(levelFileContent);
   }

    parseLevelFileContent(levelFileContent) {
        const lines = levelFileContent.split(/\r?\n/);
        const nbLines  = lines.length;
        this.map = new Array(nbLines);
    
        for (let i = 0; i < nbLines; i++) {
            this.map[i] = new Array(lines[i].length);
        }
     
        for(let i = 0; i < nbLines; i++) {
            const nbColumns = lines[i].length;
            for(let j = 0; j < nbColumns; j++) {
                this.map[i][j] = lines[i][j];
                if(this.map[i][j] === 'P') {
                    this.player = new Player(i, j);
                }
                else if(this.map[i][j] === 'I') {
                    this.goals.push(new Goal(i, j))
                }
            }
        }
    }
    
    moveUp() {
        //Cas sans caisse
        let isValidMovement = this.map[this.player.x - 1][this.player.y]  === ' ' || this.map[this.player.x - 1][this.player.y] === 'I'
    
        let isValidMovementWithBox = (this.map[this.player.x - 1][this.player.y] === 'C' && this.map[this.player.x - 2][this.player.y] === ' ') 
            || (this.map[this.player.x - 1][this.player.y] === 'C' && this.map[this.player.x - 2][this.player.y] === 'I') 
            || (this.map[this.player.x - 1][this.player.y] === 'K' && this.map[this.player.x - 2][this.player.y] === ' ') 
            || (this.map[this.player.x - 1][this.player.y] === 'K' && this.map[this.player.x - 2][this.player.y] === 'I')

        if(isValidMovement) {
            this.map[this.player.x][this.player.y] = ' '
            this.map[this.player.x - 1][this.player.y] = 'P'
            this.player.x = this.player.x - 1
            this.player.orientation = 0
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        }
        //Bouger caisse si vide deriere caisse.
        else if(isValidMovementWithBox) {
            this.player.x = this.player.x - 1
            this.map[this.player.x - 1][this.player.y] = 'C';
            this.map[this.player.x][this.player.y] = 'P'
            this.map[this.player.x + 1][this.player.y] = ' ';
            this.player.orientation = 0
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        }
    }

    moveLeft() {
        let isValidMovement = this.map[this.player.x][this.player.y - 1]  === ' ' || this.map[this.player.x][this.player.y - 1] === 'I'

        let isValidMovementWithBox = (this.map[this.player.x][this.player.y - 1]  == 'C' && this.map[this.player.x][this.player.y - 2]  === ' ')
            || (this.map[this.player.x][this.player.y - 1]  === 'C' && this.map[this.player.x][this.player.y - 2]  === 'I')
            || (this.map[this.player.x][this.player.y - 1]  === 'K' && this.map[this.player.x][this.player.y - 2]  === ' ')
            || (this.map[this.player.x][this.player.y - 1]  === 'K' && this.map[this.player.x][this.player.y - 2]  === 'I')

        if(isValidMovement) {
            this.map[this.player.x][this.player.y] = ' '
            this.map[this.player.x][this.player.y - 1] = 'P'
            this.player.y = this.player.y - 1
            this.player.orientation = 3
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        }
        else if(isValidMovementWithBox) {
            this.player.y = this.player.y - 1
            this.map[this.player.x][this.player.y - 1] = 'C';
            this.map[this.player.x][this.player.y] = 'P'
            this.map[this.player.x][this.player.y + 1] = ' ';
            this.player.orientation = 3
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        } 
    }

    moveRight() {
        let isValidMovement = this.map[this.player.x][this.player.y + 1]  === ' ' || this.map[this.player.x][this.player.y + 1] === 'I'
        
        let isValidMovementWithBox = (this.map[this.player.x][this.player.y + 1]  === 'C' && this.map[this.player.x][this.player.y + 2]  === ' ')
            || (this.map[this.player.x][this.player.y + 1]  === 'C' && this.map[this.player.x][this.player.y + 2]  === 'I')
            || (this.map[this.player.x][this.player.y + 1]  === 'K' && this.map[this.player.x][this.player.y + 2]  === ' ') 
            || (this.map[this.player.x][this.player.y + 1]  === 'K' && this.map[this.player.x][this.player.y + 2]  === 'I')

        if(isValidMovement) {
            this.map[this.player.x][this.player.y] = ' '
            this.map[this.player.x][this.player.y + 1] = 'P'
            this.player.y = this.player.y + 1
            this.player.orientation = 2
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        }
        else if(isValidMovementWithBox) {
            this.player.y = this.player.y + 1
            this.map[this.player.x][this.player.y + 1] = 'C';
            this.map[this.player.x][this.player.y] = 'P'
            this.map[this.player.x][this.player.y - 1] = ' ';
            this.player.orientation = 2
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        }
    }

    moveDown() {
        let isValidMovement = this.map[this.player.x + 1][this.player.y] === ' ' || this.map[this.player.x + 1][this.player.y] === 'I'

        let isValidMovementWithBox = (this.map[this.player.x + 1][this.player.y] === 'C' && this.map[this.player.x + 2][this.player.y] === ' ' )
            || (this.map[this.player.x + 1][this.player.y] === 'C' && this.map[this.player.x + 2][this.player.y] === 'I') 
            || (this.map[this.player.x + 1][this.player.y] === 'K' && this.map[this.player.x + 2][this.player.y] === ' ') 
            || (this.map[this.player.x + 1][this.player.y] === 'K' && this.map[this.player.x + 2][this.player.y] === 'I')
        if(isValidMovement) {
            this.map[this.player.x][this.player.y] = ' '
            this.map[this.player.x + 1][this.player.y] = 'P'
            this.player.x = this.player.x + 1
            this.player.orientation = 1
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        }
        else if(isValidMovementWithBox) {
            this.player.x = this.player.x + 1
            this.map[this.player.x + 1][this.player.y] = 'C';
            this.map[this.player.x][this.player.y] = 'P'
            this.map[this.player.x - 1][this.player.y] = ' ';
            this.player.orientation = 1
            this.setBoxOnGoal()
            this.nbMove++;
            const event = new Event('playerMovement');
            document.dispatchEvent(event);
        }
    }

    move(movement) {
        if(this.win === false) {
            if(movement === 'left') {
                this.moveLeft();
            }
            else if(movement === 'right') {
                this.moveRight();
            } 
            else if(movement === 'up') {
                this.moveUp();
            }
            else if(movement === 'down') {
                this.moveDown();
            }
        }    
    }

    hasWin() {
        let nbBoxOnGoal = 0;
        for(let i = 0; i < this.goals.length; i++) {
            if(this.map[this.goals[i].x][this.goals[i].y] === 'K') {
                nbBoxOnGoal++;
                if(this.goals.length === nbBoxOnGoal) {
                    this.win = true;
                    return true;
                }
            } 
        }
        return false;
    }

    setBoxOnGoal() {
        for(let i = 0; i < this.goals.length; i++) {
            if(this.map[this.goals[i].x][this.goals[i].y] === ' ') {
                this.map[this.goals[i].x][this.goals[i].y] = 'I'
            }
            else if(this.map[this.goals[i].x][this.goals[i].y] === 'C') {
                this.map[this.goals[i].x][this.goals[i].y] = 'K'
            }
        }
    }
}

export { Game };