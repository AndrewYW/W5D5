class Clock {
    constructor() {
        const now = new Date();
        this.hours = now.getHours();
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.printTime();
        setInterval(this._tick.bind(this),1000);
    }

    printTime() {
        console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    }

    _tick() {
        this.seconds++;
        if (this.seconds > 59) {
            this.minutes++;
            if (this.minutes > 59) {
                this.hours++;
            }
        }
        this.seconds = this.seconds % 60;
        this.minutes = this.minutes % 60;
        this.hours = this.hours % 24;
        this.printTime();
    }
}





const readline = require("readline");

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft > 0) {
        reader.question("Give number:", function(answer) {
            sum += parseInt(`${answer}`);
            console.log(`${sum}`);
            addNumbers(sum, numsLeft - 1, completionCallback);
        });
    } else if (numsLeft === 0) {
        completionCallback(sum);
    }
}

addNumbers(0, 5, sum => console.log(`Total Sum: ${sum}`));
