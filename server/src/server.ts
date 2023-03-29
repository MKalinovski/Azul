import express from 'express';
import { players, tilesPool, board, gameStatus, eventHistory, createPlayer, calculatePoints, createTraders, getRandomTile, arrangeTiles, takeTiles, roundEnd, calculateBonusPoints, determineWinner, finishGame, nextTurn, checkForTiles, nextRound} from './calculator';

const app = express();
const port = 8000;

app.get('/NewPlayer', (req, res) => {
  const playerName = req.body.name;
  createPlayer(playerName)
  res.send('Created new player');
});

app.get('/PlayersTurn', (req, res) => {
  // Take tiles from trader or from the middle
  if (req.body.from === 'trader') {
    takeTiles(req.body.from, req.body.what, req.body.who, req.body.where, req.body.which)
  } else if ( req.body.from === 'middle') {
    takeTiles(req.body.from, req.body.what, req.body.who, req.body.where)
  }
  res.send('Taking tiles')
  // Check if there are any tiles left in the game
  checkForTiles();
  if (gameStatus.tilesLeft === false) {
    roundEnd()
    if (gameStatus.finished === true) {
      finishGame();
    } else {
      nextRound();
    }
  } else {
    // Start next turn
    nextTurn();
  }
});

app.get('/StartGame', (req, res) => {
  gameStatus.readyPlayers += 1
  if (gameStatus.readyPlayers = players.data.length) {
    arrangeTiles()
    gameStatus.playerTurn = Math.floor(Math.random() * players.data.length);
    res.send('Starting Game')
  } else {
    res.send('Waiting for other players...')
  }
});

app.get('/WhatsNew', (req, res) => {
  res.send('Game Status')
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

