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





// const readline = require("readline");

// const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


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

// addNumbers(0, 5, sum => console.log(`Total Sum: ${sum}`));

function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        // Begin an inner loop if you made any swaps. Otherwise, call
        // `sortCompletionCallback`.
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
        }
    }

    outerBubbleSortLoop(true);
}

function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} greater than ${el2}?`, function(answer) {
        if (answer === "yes") {
            return callback(true);
        } else {
            return callback(false);
        }
    });
}

// askIfGreaterThan(1,3, function());


function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) { 
        askIfGreaterThan(arr[i], arr[i+1], function(isGreaterThan) {
            if (isGreaterThan) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                madeAnySwaps = true;
            } 
            innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
        });
    } else if (i == (arr.length - 1)) {
        outerBubbleSortLoop(madeAnySwaps);
    }
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
//     reader.close();
// });

// Array.prototype.bubbleSort = function () {
//     let isSorted = false;

//     while (!isSorted) {
//         isSorted = true;

//         for (let i = 0; i < (this.length - 1); i++) {
//             if (this[i] > this[i + 1]) {
//                 // a crafty bit of array destructuring to avoid a temp variable
//                 [this[i], this[i + 1]] = [this[i + 1], this[i]];
//                 isSorted = false;
//             }
//         }
//     }

//     return this;
// };

Function.prototype.myBind = function (context) {
    return (() => {
        this.apply(context);
    });
};



class Lamp {
    constructor() {
        this.name = "a lamp";
    }
}

const turnOn = function () {
    console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
