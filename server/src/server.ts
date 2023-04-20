import express from 'express';
import { players, tilesPool, board, gameStatus, eventHistory, createPlayer, calculatePoints, createTraders, getRandomTile, arrangeTiles, takeTiles, roundEnd, calculateBonusPoints, determineWinner, finishGame, nextTurn, checkForTiles, nextRound, updateGameStatus} from './calculator';

const app = express();
const port = 8000;

app.get('/NewPlayer', (req, res) => {
  const playerName = req.body.name;
  createPlayer(playerName)
  const clientUpdateStatus = updateGameStatus();
  res.send(clientUpdateStatus);
});

app.get('/PlayersTurn', (req, res) => {
  // Take tiles from trader or from the middle
  if (req.body.from === 'trader') {
    takeTiles(req.body.from, req.body.what, req.body.who, req.body.where, req.body.which)
  } else if ( req.body.from === 'remaining') {
    takeTiles(req.body.from, req.body.what, req.body.who, req.body.where)
  }
  
  // Check if there are any tiles left in the game
  checkForTiles();
  if (gameStatus.tilesLeft === false) {
    roundEnd()
    if (gameStatus.finished === true) {
      finishGame();
      const clientUpdateStatus = updateGameStatus();
      res.send(clientUpdateStatus)
    } else {
      nextRound();
      const clientUpdateStatus = updateGameStatus();
      res.send(clientUpdateStatus)
    }
  } else {
    // Start next turn
    nextTurn();
    const clientUpdateStatus = updateGameStatus();
    res.send(clientUpdateStatus)
  }
});

app.get('/StartGame', (req, res) => {
  gameStatus.readyPlayers += 1
  if (gameStatus.readyPlayers === players.data.length) {
    arrangeTiles()
    gameStatus.playerTurn = Math.floor(Math.random() * players.data.length);
    gameStatus.gamePhase = "game-started"
    const clientUpdateStatus = updateGameStatus();
    res.send(clientUpdateStatus)
  } else {
    gameStatus.gamePhase = "waiting-for-players"
    const clientUpdateStatus = updateGameStatus();
    res.send(clientUpdateStatus)
  }
});

app.get('/WhatsNew', (req, res) => {
  const clientUpdateStatus = updateGameStatus();
  res.send(clientUpdateStatus)
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

