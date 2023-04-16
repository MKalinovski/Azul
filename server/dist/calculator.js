"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextRound = exports.checkForTiles = exports.nextTurn = exports.finishGame = exports.determineWinner = exports.calculateBonusPoints = exports.roundEnd = exports.takeTiles = exports.arrangeTiles = exports.getRandomTile = exports.createTraders = exports.calculatePoints = exports.createPlayer = exports.eventHistory = exports.gameStatus = exports.board = exports.tilesPool = exports.players = void 0;
exports.players = {
    quantity: 0,
    data: [],
};
exports.tilesPool = {
    red: 20,
    blue: 20,
    white: 20,
    black: 20,
    yellow: 20,
};
exports.board = {
    traders: [],
    middle: { red: 0, blue: 0, white: 0, black: 0, yellow: 0, FPToken: true },
};
exports.gameStatus = {
    readyPlayers: 0,
    turn: 0,
    round: 0,
    playerTurn: 0,
    goingFirst: 0,
    finished: false,
    winner: 0,
    tilesLeft: true,
};
exports.eventHistory = [];
function createPlayer(name) {
    let newPlayer = {
        id: exports.players.quantity + 1,
        name: name,
        score: 0,
        board: {
            main: [
                {
                    row: 1,
                    colors: [
                        { color: "blue", isTrue: false },
                        { color: "yellow", isTrue: false },
                        { color: "red", isTrue: false },
                        { color: "black", isTrue: false },
                        { color: "white", isTrue: false },
                    ],
                },
                {
                    row: 2,
                    colors: [
                        { color: "white", isTrue: false },
                        { color: "blue", isTrue: false },
                        { color: "yellow", isTrue: false },
                        { color: "red", isTrue: false },
                        { color: "black", isTrue: false },
                    ],
                },
                {
                    row: 3,
                    colors: [
                        { color: "black", isTrue: false },
                        { color: "white", isTrue: false },
                        { color: "blue", isTrue: false },
                        { color: "yellow", isTrue: false },
                        { color: "red", isTrue: false },
                    ],
                },
                {
                    row: 4,
                    colors: [
                        { color: "red", isTrue: false },
                        { color: "black", isTrue: false },
                        { color: "white", isTrue: false },
                        { color: "blue", isTrue: false },
                        { color: "yellow", isTrue: false },
                    ],
                },
                {
                    row: 5,
                    colors: [
                        { color: "yellow", isTrue: false },
                        { color: "red", isTrue: false },
                        { color: "black", isTrue: false },
                        { color: "white", isTrue: false },
                        { color: "blue", isTrue: false },
                    ],
                },
            ],
            stacker: [
                {
                    row: 1,
                    quantity: 0,
                    color: "",
                },
                {
                    row: 2,
                    quantity: 0,
                    color: "",
                },
                {
                    row: 3,
                    quantity: 0,
                    color: "",
                },
                {
                    row: 4,
                    quantity: 0,
                    color: "",
                },
                {
                    row: 5,
                    quantity: 0,
                    color: "",
                },
            ],
            penalty: {
                FPToken: false,
                data: [],
            },
        },
    };
    if (exports.players.quantity < 4) {
        exports.players.data.push(newPlayer);
        exports.players.quantity += 1;
    }
    else {
        console.log("Reached maximum number of Players");
    }
}
exports.createPlayer = createPlayer;
function calculatePoints(player) {
    let mainBoard = exports.players.data[player].board.main;
    let stackerBoard = exports.players.data[player].board.stacker;
    function addPoint() {
        exports.players.data[player].score = +1;
    }
    for (let i = 0; i < 4; i++) {
        if (stackerBoard[i].quantity === i + 1) {
            if (stackerBoard[i].color === "red") {
                for (let k = 0; k < 5; k++) {
                    if (mainBoard[i].colors[k].color === "red") {
                        exports.players.data[player].board.main[i].colors[k].isTrue = true;
                        addPoint();
                        let checker = k;
                        for (let l = k; l < k + 4; l++) {
                            if (mainBoard[i].colors[checker + 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = k; l > k - 4; l--) {
                            if (mainBoard[i].colors[checker - 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l < i + 4; l++) {
                            if (mainBoard[checker + 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l > i - 4; l--) {
                            if (mainBoard[checker - 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                    }
                }
            }
            if (stackerBoard[i].color === "blue") {
                for (let k = 0; k < 5; k++) {
                    if (mainBoard[i].colors[k].color === "blue") {
                        exports.players.data[player].board.main[i].colors[k].isTrue = true;
                        addPoint();
                        let checker = k;
                        for (let l = k; l < k + 4; l++) {
                            if (mainBoard[i].colors[checker + 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = k; l > k - 4; l--) {
                            if (mainBoard[i].colors[checker - 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l < i + 4; l++) {
                            if (mainBoard[checker + 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l > i - 4; l--) {
                            if (mainBoard[checker - 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                    }
                }
            }
            if (stackerBoard[i].color === "white") {
                for (let k = 0; k < 5; k++) {
                    if (mainBoard[i].colors[k].color === "white") {
                        exports.players.data[player].board.main[i].colors[k].isTrue = true;
                        addPoint();
                        let checker = k;
                        for (let l = k; l < k + 4; l++) {
                            if (mainBoard[i].colors[checker + 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = k; l > k - 4; l--) {
                            if (mainBoard[i].colors[checker - 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l < i + 4; l++) {
                            if (mainBoard[checker + 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l > i - 4; l--) {
                            if (mainBoard[checker - 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                    }
                }
            }
            if (stackerBoard[i].color === "yellow") {
                for (let k = 0; k < 5; k++) {
                    if (mainBoard[i].colors[k].color === "yellow") {
                        exports.players.data[player].board.main[i].colors[k].isTrue = true;
                        addPoint();
                        let checker = k;
                        for (let l = k; l < k + 4; l++) {
                            if (mainBoard[i].colors[checker + 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = k; l > k - 4; l--) {
                            if (mainBoard[i].colors[checker - 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l < i + 4; l++) {
                            if (mainBoard[checker + 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l > i - 4; l--) {
                            if (mainBoard[checker - 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                    }
                }
            }
            if (stackerBoard[i].color === "black") {
                for (let k = 0; k < 5; k++) {
                    if (mainBoard[i].colors[k].color === "black") {
                        exports.players.data[player].board.main[i].colors[k].isTrue = true;
                        addPoint();
                        let checker = k;
                        for (let l = k; l < k + 4; l++) {
                            if (mainBoard[i].colors[checker + 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = k; l > k - 4; l--) {
                            if (mainBoard[i].colors[checker - 1].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l < i + 4; l++) {
                            if (mainBoard[checker + 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker += 1;
                            }
                        }
                        checker = k;
                        for (let l = i; l > i - 4; l--) {
                            if (mainBoard[checker - 1].colors[k].isTrue === true &&
                                l === checker) {
                                addPoint();
                                checker -= 1;
                            }
                        }
                    }
                }
            }
        }
    }
}
exports.calculatePoints = calculatePoints;
function createTraders(quantity) {
    for (let i = 1; i < quantity; i++) {
        exports.board.traders.push({ red: 0, blue: 0, white: 0, black: 0, yellow: 0 });
    }
}
exports.createTraders = createTraders;
function getRandomTile() {
    const totalTiles = Object.values(exports.tilesPool).reduce((sum, count) => sum + count, 0);
    if (totalTiles === 0) {
        throw new Error("No tiles left in the pool.");
    }
    let randomIndex = Math.floor(Math.random() * totalTiles);
    for (const [color, count] of Object.entries(exports.tilesPool)) {
        if (randomIndex < count) {
            exports.tilesPool[color]--;
            return color;
        }
        randomIndex -= count;
    }
}
exports.getRandomTile = getRandomTile;
function arrangeTiles() {
    for (let i = 1; i < exports.board.traders.length; i++) {
        for (let k = 1; k < 4; k++) {
            let randomTile = getRandomTile();
            switch (randomTile) {
                case "red":
                    exports.board.traders[i].red = +1;
                    break;
                case "blue":
                    exports.board.traders[i].blue = +1;
                    break;
                case "white":
                    exports.board.traders[i].white = +1;
                    break;
                case "black":
                    exports.board.traders[i].black = +1;
                    break;
                case "yellow":
                    exports.board.traders[i].yellow = +1;
                    break;
            }
        }
    }
}
exports.arrangeTiles = arrangeTiles;
function takeTiles(from, what, who, where, which) {
    let tilesTaken;
    let redTilesLeft;
    let blueTilesLeft;
    let blackTilesLeft;
    let whiteTilesLeft;
    let yellowTilesLeft;
    let penaltyTiles;
    if (typeof which !== "undefined" &&
        typeof who !== "undefined" &&
        typeof where !== "undefined") {
        if (from === "trader") {
            switch (what) {
                case "black":
                    tilesTaken = exports.board.traders[which].black;
                    exports.board.traders[which].black -= exports.board.traders[which].black;
                    exports.players.data[who - 1].board.stacker[where].color = "black";
                    exports.players.data[who - 1].board.stacker[where].quantity += tilesTaken;
                    redTilesLeft = exports.board.traders[which].red;
                    blueTilesLeft = exports.board.traders[which].blue;
                    whiteTilesLeft = exports.board.traders[which].white;
                    yellowTilesLeft = exports.board.traders[which].yellow;
                    exports.board.middle.blue += blueTilesLeft;
                    exports.board.middle.white += whiteTilesLeft;
                    exports.board.middle.yellow += yellowTilesLeft;
                    exports.board.middle.red += redTilesLeft;
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("black");
                        }
                    }
                    break;
                case "blue":
                    tilesTaken = exports.board.traders[which].blue;
                    exports.board.traders[which].blue -= exports.board.traders[which].blue;
                    exports.players.data[who - 1].board.stacker[where].color = "blue";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    redTilesLeft = exports.board.traders[which].red;
                    blackTilesLeft = exports.board.traders[which].black;
                    whiteTilesLeft = exports.board.traders[which].white;
                    yellowTilesLeft = exports.board.traders[which].yellow;
                    exports.board.middle.black += blackTilesLeft;
                    exports.board.middle.white += whiteTilesLeft;
                    exports.board.middle.yellow += yellowTilesLeft;
                    exports.board.middle.red += redTilesLeft;
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("blue");
                        }
                    }
                    break;
                case "red":
                    tilesTaken = exports.board.traders[which].red;
                    exports.board.traders[which].red -= exports.board.traders[which].red;
                    exports.players.data[who - 1].board.stacker[where].color = "red";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    blueTilesLeft = exports.board.traders[which].blue;
                    blackTilesLeft = exports.board.traders[which].black;
                    whiteTilesLeft = exports.board.traders[which].white;
                    yellowTilesLeft = exports.board.traders[which].yellow;
                    exports.board.middle.black += blackTilesLeft;
                    exports.board.middle.white += whiteTilesLeft;
                    exports.board.middle.yellow += yellowTilesLeft;
                    exports.board.middle.blue += blueTilesLeft;
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("red");
                        }
                    }
                    break;
                case "white":
                    tilesTaken = exports.board.traders[which].white;
                    exports.board.traders[which].white -= exports.board.traders[which].white;
                    exports.players.data[who - 1].board.stacker[where].color = "white";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    redTilesLeft = exports.board.traders[which].red;
                    blackTilesLeft = exports.board.traders[which].black;
                    blueTilesLeft = exports.board.traders[which].blue;
                    yellowTilesLeft = exports.board.traders[which].yellow;
                    exports.board.middle.black += blackTilesLeft;
                    exports.board.middle.blue += blueTilesLeft;
                    exports.board.middle.yellow += yellowTilesLeft;
                    exports.board.middle.red += redTilesLeft;
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("white");
                        }
                    }
                    break;
                case "yellow":
                    tilesTaken = exports.board.traders[which].yellow;
                    exports.board.traders[which].yellow -= exports.board.traders[which].yellow;
                    exports.players.data[who - 1].board.stacker[where].color = "yellow";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    redTilesLeft = exports.board.traders[which].red;
                    blackTilesLeft = exports.board.traders[which].black;
                    blueTilesLeft = exports.board.traders[which].blue;
                    whiteTilesLeft = exports.board.traders[which].white;
                    exports.board.middle.black += blackTilesLeft;
                    exports.board.middle.blue += blueTilesLeft;
                    exports.board.middle.white += whiteTilesLeft;
                    exports.board.middle.red += redTilesLeft;
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("yellow");
                        }
                    }
                    break;
            }
        }
        else if (from === "middle") {
            switch (what) {
                case "black":
                    tilesTaken = exports.board.middle.black;
                    exports.board.middle.black = 0;
                    exports.players.data[who - 1].board.stacker[where].color = "black";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    if (exports.board.middle.FPToken === true) {
                        exports.board.middle.FPToken = false;
                        exports.players.data[who - 1].board.penalty.FPToken = true;
                        exports.players.data[who - 1].board.penalty.data.push("FPToken");
                    }
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("black");
                        }
                    }
                    break;
                case "blue":
                    tilesTaken = exports.board.middle.blue;
                    exports.board.middle.blue = 0;
                    exports.players.data[who - 1].board.stacker[where].color = "blue";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    if (exports.board.middle.FPToken === true) {
                        exports.board.middle.FPToken = false;
                        exports.players.data[who - 1].board.penalty.FPToken = true;
                        exports.players.data[who - 1].board.penalty.data.push("FPToken");
                    }
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("blue");
                        }
                    }
                    break;
                case "red":
                    tilesTaken = exports.board.middle.red;
                    exports.board.middle.red = 0;
                    exports.players.data[who - 1].board.stacker[where].color = "red";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    if (exports.board.middle.FPToken === true) {
                        exports.board.middle.FPToken = false;
                        exports.players.data[who - 1].board.penalty.FPToken = true;
                        exports.players.data[who - 1].board.penalty.data.push("FPToken");
                    }
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("red");
                        }
                    }
                    break;
                case "white":
                    tilesTaken = exports.board.middle.white;
                    exports.board.middle.white = 0;
                    exports.players.data[who - 1].board.stacker[where].color = "white";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    if (exports.board.middle.FPToken === true) {
                        exports.board.middle.FPToken = false;
                        exports.players.data[who - 1].board.penalty.FPToken = true;
                        exports.players.data[who - 1].board.penalty.data.push("FPToken");
                    }
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("white");
                        }
                    }
                    break;
                case "yellow":
                    tilesTaken = exports.board.middle.yellow;
                    exports.board.middle.yellow = 0;
                    exports.players.data[who - 1].board.stacker[where].color = "yellow";
                    exports.players.data[who - 1].board.stacker[where].quantity = tilesTaken;
                    if (exports.board.middle.FPToken === true) {
                        exports.board.middle.FPToken = false;
                        exports.players.data[who - 1].board.penalty.FPToken = true;
                        exports.players.data[who - 1].board.penalty.data.push("FPToken");
                    }
                    if (exports.players.data[who - 1].board.stacker[where].quantity > where + 1) {
                        penaltyTiles =
                            exports.players.data[who - 1].board.stacker[where].quantity - (where + 1);
                        exports.players.data[who - 1].board.stacker[where].quantity = where + 1;
                        for (let i = 1; i < penaltyTiles; i++) {
                            exports.players.data[who - 1].board.penalty.data.push("yellow");
                        }
                    }
                    break;
            }
        }
    }
}
exports.takeTiles = takeTiles;
function roundEnd() {
    for (let i = 1; i < exports.players.data.length; i++) {
        let player = i - 1;
        calculatePoints(player);
    }
    for (let i = 1; i < exports.players.data.length; i++) {
        if (exports.players.data[i - 1].board.main[0].colors.length === 5 ||
            exports.players.data[i - 1].board.main[1].colors.length === 5 ||
            exports.players.data[i - 1].board.main[2].colors.length === 5 ||
            exports.players.data[i - 1].board.main[3].colors.length === 5 ||
            exports.players.data[i - 1].board.main[4].colors.length === 5) {
            exports.gameStatus.finished = true;
        }
    }
    exports.gameStatus.round += 1;
}
exports.roundEnd = roundEnd;
function calculateBonusPoints(player) {
    // check for whole color
    // check for blue
    if (exports.players.data[player].board.main[0].colors[0].isTrue === true &&
        exports.players.data[player].board.main[1].colors[1].isTrue === true &&
        exports.players.data[player].board.main[2].colors[2].isTrue === true &&
        exports.players.data[player].board.main[3].colors[3].isTrue === true &&
        exports.players.data[player].board.main[4].colors[4].isTrue === true) {
        exports.players.data[player].score += 10;
    }
    // check for yellow
    if (exports.players.data[player].board.main[0].colors[1].isTrue === true &&
        exports.players.data[player].board.main[1].colors[2].isTrue === true &&
        exports.players.data[player].board.main[2].colors[3].isTrue === true &&
        exports.players.data[player].board.main[3].colors[4].isTrue === true &&
        exports.players.data[player].board.main[4].colors[0].isTrue === true) {
        exports.players.data[player].score += 10;
    }
    // check for red
    if (exports.players.data[player].board.main[0].colors[2].isTrue === true &&
        exports.players.data[player].board.main[1].colors[3].isTrue === true &&
        exports.players.data[player].board.main[2].colors[4].isTrue === true &&
        exports.players.data[player].board.main[3].colors[0].isTrue === true &&
        exports.players.data[player].board.main[4].colors[1].isTrue === true) {
        exports.players.data[player].score += 10;
    }
    // check for black
    if (exports.players.data[player].board.main[0].colors[3].isTrue === true &&
        exports.players.data[player].board.main[1].colors[4].isTrue === true &&
        exports.players.data[player].board.main[2].colors[0].isTrue === true &&
        exports.players.data[player].board.main[3].colors[1].isTrue === true &&
        exports.players.data[player].board.main[4].colors[2].isTrue === true) {
        exports.players.data[player].score += 10;
    }
    // check for white
    if (exports.players.data[player].board.main[0].colors[4].isTrue === true &&
        exports.players.data[player].board.main[1].colors[0].isTrue === true &&
        exports.players.data[player].board.main[2].colors[1].isTrue === true &&
        exports.players.data[player].board.main[3].colors[2].isTrue === true &&
        exports.players.data[player].board.main[4].colors[3].isTrue === true) {
        exports.players.data[player].score += 10;
    }
    // check for whole column
    if (exports.players.data[player].board.main[0].colors[0].isTrue === true &&
        exports.players.data[player].board.main[1].colors[0].isTrue === true &&
        exports.players.data[player].board.main[2].colors[0].isTrue === true &&
        exports.players.data[player].board.main[3].colors[0].isTrue === true &&
        exports.players.data[player].board.main[4].colors[0].isTrue === true) {
        exports.players.data[player].score += 7;
    }
    if (exports.players.data[player].board.main[0].colors[1].isTrue === true &&
        exports.players.data[player].board.main[1].colors[1].isTrue === true &&
        exports.players.data[player].board.main[2].colors[1].isTrue === true &&
        exports.players.data[player].board.main[3].colors[1].isTrue === true &&
        exports.players.data[player].board.main[4].colors[1].isTrue === true) {
        exports.players.data[player].score += 7;
    }
    if (exports.players.data[player].board.main[0].colors[2].isTrue === true &&
        exports.players.data[player].board.main[1].colors[2].isTrue === true &&
        exports.players.data[player].board.main[2].colors[2].isTrue === true &&
        exports.players.data[player].board.main[3].colors[2].isTrue === true &&
        exports.players.data[player].board.main[4].colors[2].isTrue === true) {
        exports.players.data[player].score += 7;
    }
    if (exports.players.data[player].board.main[0].colors[3].isTrue === true &&
        exports.players.data[player].board.main[1].colors[3].isTrue === true &&
        exports.players.data[player].board.main[2].colors[3].isTrue === true &&
        exports.players.data[player].board.main[3].colors[3].isTrue === true &&
        exports.players.data[player].board.main[4].colors[3].isTrue === true) {
        exports.players.data[player].score += 7;
    }
    if (exports.players.data[player].board.main[0].colors[4].isTrue === true &&
        exports.players.data[player].board.main[1].colors[4].isTrue === true &&
        exports.players.data[player].board.main[2].colors[4].isTrue === true &&
        exports.players.data[player].board.main[3].colors[4].isTrue === true &&
        exports.players.data[player].board.main[4].colors[4].isTrue === true) {
        exports.players.data[player].score += 7;
    }
    // check for whole row
    if (exports.players.data[player].board.main[0].colors[0].isTrue === true &&
        exports.players.data[player].board.main[0].colors[1].isTrue === true &&
        exports.players.data[player].board.main[0].colors[2].isTrue === true &&
        exports.players.data[player].board.main[0].colors[3].isTrue === true &&
        exports.players.data[player].board.main[0].colors[4].isTrue === true) {
        exports.players.data[player].score += 2;
    }
    // check for yellow
    if (exports.players.data[player].board.main[1].colors[1].isTrue === true &&
        exports.players.data[player].board.main[1].colors[2].isTrue === true &&
        exports.players.data[player].board.main[1].colors[3].isTrue === true &&
        exports.players.data[player].board.main[1].colors[4].isTrue === true &&
        exports.players.data[player].board.main[1].colors[0].isTrue === true) {
        exports.players.data[player].score += 2;
    }
    // check for red
    if (exports.players.data[player].board.main[2].colors[2].isTrue === true &&
        exports.players.data[player].board.main[2].colors[3].isTrue === true &&
        exports.players.data[player].board.main[2].colors[4].isTrue === true &&
        exports.players.data[player].board.main[2].colors[0].isTrue === true &&
        exports.players.data[player].board.main[2].colors[1].isTrue === true) {
        exports.players.data[player].score += 2;
    }
    // check for black
    if (exports.players.data[player].board.main[3].colors[3].isTrue === true &&
        exports.players.data[player].board.main[3].colors[4].isTrue === true &&
        exports.players.data[player].board.main[3].colors[0].isTrue === true &&
        exports.players.data[player].board.main[3].colors[1].isTrue === true &&
        exports.players.data[player].board.main[3].colors[2].isTrue === true) {
        exports.players.data[player].score += 2;
    }
    // check for white
    if (exports.players.data[player].board.main[4].colors[4].isTrue === true &&
        exports.players.data[player].board.main[4].colors[0].isTrue === true &&
        exports.players.data[player].board.main[4].colors[1].isTrue === true &&
        exports.players.data[player].board.main[4].colors[2].isTrue === true &&
        exports.players.data[player].board.main[4].colors[3].isTrue === true) {
        exports.players.data[player].score += 2;
    }
}
exports.calculateBonusPoints = calculateBonusPoints;
function determineWinner() {
    let highestScore = -Infinity;
    let highestScorePlayer = 0;
    for (let i = 1; i < exports.players.data.length; i++) {
        if (exports.players.data[i - 1].score > highestScore) {
            highestScore = exports.players.data[i - 1].score;
            highestScorePlayer = i - 1;
        }
    }
    return highestScorePlayer;
}
exports.determineWinner = determineWinner;
function finishGame() {
    for (let i = 1; i < exports.players.data.length; i++) {
        let player = i - 1;
        calculateBonusPoints(player);
    }
    exports.gameStatus.winner = determineWinner();
    // check who has highest score and determine the winner
}
exports.finishGame = finishGame;
function nextTurn() {
    if (exports.gameStatus.turn < exports.players.data.length - 1) {
        exports.gameStatus.playerTurn += 1;
    }
    else {
        exports.gameStatus.playerTurn = 0;
    }
    exports.gameStatus.turn += 1;
}
exports.nextTurn = nextTurn;
function checkForTiles() {
    let emptySpaces = 0;
    for (let i = 1; i < exports.board.traders.length; i++) {
        if (exports.board.traders[i - 1].black === 0 &&
            exports.board.traders[i - 1].blue === 0 &&
            exports.board.traders[i - 1].red === 0 &&
            exports.board.traders[i - 1].white === 0 &&
            exports.board.traders[i - 1].yellow === 0) {
            emptySpaces += 1;
        }
    }
    if (exports.board.middle.black === 0 &&
        exports.board.middle.blue === 0 &&
        exports.board.middle.red === 0 &&
        exports.board.middle.white === 0 &&
        exports.board.middle.yellow === 0) {
        emptySpaces += 1;
    }
    if (emptySpaces === exports.board.traders.length + 1) {
        exports.gameStatus.tilesLeft = false;
    }
}
exports.checkForTiles = checkForTiles;
function nextRound() {
    arrangeTiles();
    for (let i = 0; i < exports.players.data.length; i++) {
        if (exports.players.data[i - 1].board.penalty.FPToken === true) {
            exports.gameStatus.playerTurn = i - 1;
        }
    }
    exports.board.middle.FPToken = true;
    exports.gameStatus.round += 1;
}
exports.nextRound = nextRound;
