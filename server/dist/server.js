"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculator_1 = require("./calculator");
const app = (0, express_1.default)();
const port = 8000;
app.get('/NewPlayer', (req, res) => {
    const playerName = req.body.name;
    (0, calculator_1.createPlayer)(playerName);
    res.send('Created new player');
});
app.get('/PlayersTurn', (req, res) => {
    // Take tiles from trader or from the middle
    if (req.body.from === 'trader') {
        (0, calculator_1.takeTiles)(req.body.from, req.body.what, req.body.who, req.body.where, req.body.which);
    }
    else if (req.body.from === 'middle') {
        (0, calculator_1.takeTiles)(req.body.from, req.body.what, req.body.who, req.body.where);
    }
    res.send('Taking tiles');
    // Check if there are any tiles left in the game
    (0, calculator_1.checkForTiles)();
    if (calculator_1.gameStatus.tilesLeft === false) {
        (0, calculator_1.roundEnd)();
        if (calculator_1.gameStatus.finished === true) {
            (0, calculator_1.finishGame)();
        }
        else {
            (0, calculator_1.nextRound)();
        }
    }
    else {
        // Start next turn
        (0, calculator_1.nextTurn)();
    }
});
app.get('/StartGame', (req, res) => {
    calculator_1.gameStatus.readyPlayers += 1;
    if (calculator_1.gameStatus.readyPlayers === calculator_1.players.data.length) {
        (0, calculator_1.arrangeTiles)();
        calculator_1.gameStatus.playerTurn = Math.floor(Math.random() * calculator_1.players.data.length);
        res.send('Starting Game');
    }
    else {
        res.send('Waiting for other players...');
    }
});
app.get('/WhatsNew', (req, res) => {
    res.send('Game Status');
});
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
