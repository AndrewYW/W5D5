class Game {
    constructor() {
        this.towers = [[1,2,3],[],[]];
    }

    isValidMove(startTowerIdx, endTowerIdx) {
        return this.towers[startTowerIdx][0] < this.towers[endTowerIdx][0];
    }

    move(startTowerIdx, endTowerIdx) {
        if (isValidMove(startTowerIdx, endTowerIdx)) {
            this.towers[endTowerIdx].unshift(this.towers[startTowerIdx].shift());
            return true;
        } else {
            return false;
        }
    }

    print() {
        console.log(JSON.stringify(this.towers));
    }

    isWon() {
        return (this.towers[0] === [] && (this.towers[1] === [] || this.towers[2] === []));
    }

    promptMove(reader, callback) {
        this.print();
        reader.question("Enter a starting tower: ", start => {
            const startTowerIdx = parseInt(start);
            reader.question("Enter an ending tower: ", end => {
                const endTowerIdx = parseInt(end);
                callback(startTowerIdx, endTowerIdx);
            });
        });

    }

    run(reader, completionCallback) {
        this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
            if (!this.move(startTowerIdx, endTowerIdx)) {
                console.log("Invalid move!");
            }

            if (!this.isWon()) {
                // Continue to play!
                this.run(reader, completionCallback);
            } else {
                this.print();
                console.log("You win!");
                completionCallback();
            }
        });
    }
}



Game.prototype.promptMove = function() {
    console.log(this.towers);
    
};



Game.prototype.run = function (completionCallback) {
    let newGame = new Game();
    newGame.print();
    while (newGame.isWon) {
        newGame.promptMove();
        let moves = newGame.promptMove();
        if (newGame.isValidMove(moves[0],moves[1])) {
            newGame.move(moves[0],moves[1]);
            newGame.print();
        }
    }

    completionCallback();
};


Game.prototype.run(function() {
    console.log('Want to play again?');
    reader.close();
});