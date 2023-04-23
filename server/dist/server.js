"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const calculator_1 = require("./calculator");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const corsOpts = {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOpts));
app.use(body_parser_1.default.json());
const port = 8000;
app.post('/NewPlayer', (req, res) => {
    const request = req.body;
    const playerName = request.name;
    (0, calculator_1.createPlayer)(playerName);
    const clientUpdateStatus = (0, calculator_1.updateGameStatus)();
    const data = clientUpdateStatus;
    res.json({ success: true, data: data });
});
app.post('/PlayersTurn', (req, res) => {
    const request = req.body;
    // Take tiles from trader or from the remaining
    if ((0, calculator_1.IsMoveLegal)(request.what, request.who, request.where)) {
        if (request.from === 'trader') {
            (0, calculator_1.takeTiles)(request.from, request.what, request.who, request.where, request.which);
        }
        else if (request.from === 'remaining') {
            (0, calculator_1.takeTiles)(request.from, request.what, request.who, request.where);
        }
        // Check if there are any tiles left in the game
        (0, calculator_1.checkForTiles)();
        if (calculator_1.gameStatus.tilesLeft === false) {
            (0, calculator_1.roundEnd)();
            if (calculator_1.gameStatus.finished === true) {
                (0, calculator_1.finishGame)();
                const clientUpdateStatus = (0, calculator_1.updateGameStatus)();
                res.json({ data: clientUpdateStatus });
            }
            else {
                console.log("got to nextRound");
                (0, calculator_1.nextRound)();
                const clientUpdateStatus = (0, calculator_1.updateGameStatus)();
                res.json({ data: clientUpdateStatus });
            }
        }
        else {
            // Start next turn
            (0, calculator_1.nextTurn)();
            const clientUpdateStatus = (0, calculator_1.updateGameStatus)();
            console.log("UPDATED GAME STATUS:" + clientUpdateStatus);
            res.json({ data: clientUpdateStatus });
        }
    }
});
app.post('/StartGame', (req, res) => {
    calculator_1.gameStatus.readyPlayers += 1;
    if (calculator_1.gameStatus.readyPlayers === calculator_1.players.data.length) {
        (0, calculator_1.startGame)();
        const clientUpdateStatus = (0, calculator_1.updateGameStatus)();
        res.json({ success: true, data: clientUpdateStatus });
    }
    else {
        calculator_1.gameStatus.gamePhase = "waiting-for-players";
        const clientUpdateStatus = (0, calculator_1.updateGameStatus)();
        res.send({ success: false, data: clientUpdateStatus });
    }
});
app.post('/UpdateGame', (req, res) => {
    const clientUpdateStatus = (0, calculator_1.updateGameStatus)();
    res.send({ success: true, data: clientUpdateStatus });
});
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
//# sourceMappingURL=server.js.map