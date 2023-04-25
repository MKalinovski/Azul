import express from 'express';
import cors from 'cors';
import { players, tilesPool, board, gameStatus, eventHistory, createPlayer, calculatePoints, createTraders, getRandomTile, arrangeTiles, takeTiles, roundEnd, calculateBonusPoints, determineWinner, finishGame, nextTurn, checkForTiles, nextRound, updateGameStatus, startGame, IsMoveLegal} from './calculator';
import { Color } from './Interfaces/BoardInterface';
import bodyParser from "body-parser";

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(express.json());
app.use(cors(corsOpts));
app.use(bodyParser.json());

const port = 8000;

interface IReqNewPlayer {
  name: string;
}

app.post('/NewPlayer', (req, res) => {
    if (gameStatus.gamePhase !== "game-started") {
      const request = req.body as IReqNewPlayer
      const playerName = request.name;
      createPlayer(playerName);
      const clientUpdateStatus = updateGameStatus();
      const data = clientUpdateStatus
      res.send({success: true, data: data});
    }
  }
);

interface IReqPlayersTurn {
  from: string,
  what: Color,
  who: number,
  where: number,
  which?: number,
}

app.post('/PlayersTurn', (req, res) => {
  const request = req.body as IReqPlayersTurn
  // Take tiles from trader or from the remaining
  if (IsMoveLegal(request.what, request.who, request.where)) {
    if (request.from === 'trader') {
      takeTiles(request.from, request.what, request.who, request.where, request.which)
    } else if ( request.from === 'remaining') {
      takeTiles(request.from, request.what, request.who, request.where)
    }
    
    // Check if there are any tiles left in the game
    checkForTiles();
    if (gameStatus.tilesLeft === false) {
      roundEnd()
      if (gameStatus.finished === true) {
        finishGame();
        const clientUpdateStatus = updateGameStatus();
        res.send({data: clientUpdateStatus})
      } else {
        nextRound();
        const clientUpdateStatus = updateGameStatus();
        res.send({data: clientUpdateStatus})
      }
    } else {
      // Start next turn
      nextTurn();
      const clientUpdateStatus = updateGameStatus();
      res.send({data: clientUpdateStatus})
    }
  } else {
    const clientUpdateStatus = updateGameStatus();
    res.send({data: clientUpdateStatus})
  }
});

app.post('/StartGame', (req, res) => {
  gameStatus.readyPlayers += 1
  if (gameStatus.readyPlayers === players.data.length) {
    startGame();
    const clientUpdateStatus = updateGameStatus();
    res.send({success: true, data: clientUpdateStatus})
  } else {
    gameStatus.gamePhase = "waiting-for-players"
    const clientUpdateStatus = updateGameStatus();
    res.send({success: false, data: clientUpdateStatus})
  }
});

app.post('/UpdateGame', (req, res) => {
  const clientUpdateStatus = updateGameStatus();
  res.send({success: true, data: clientUpdateStatus})
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

