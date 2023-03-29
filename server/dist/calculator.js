"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrangeTiles = exports.getRandomTile = exports.createTraders = exports.calculatePoints = exports.createPlayer = exports.eventHistory = exports.gameStatus = exports.board = exports.tilesPool = exports.players = void 0;
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
    turn: 0,
    round: 0,
    playerTurn: 0,
    goingFirst: 0,
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
