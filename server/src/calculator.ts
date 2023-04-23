import { MouseEvent } from "react";
import { Player, PlayerArray } from "./Interfaces/PlayerInterface";
import { Board, Color } from "./Interfaces/BoardInterface";


export const players: PlayerArray = {
  quantity: 0,
  data: [],
};

export const tilesPool: { [key: string]: number } = {
  red: 20,
  blue: 20,
  white: 20,
  black: 20,
  yellow: 20,
};

export const board: Board = {
  traders: [],
  middle: { red: 0, blue: 0, white: 0, black: 0, yellow: 0, FPToken: true },
};

export const gameStatus = {
  readyPlayers: 0,
  turn: 0,
  round: 0,
  playerTurn: 0,
  goingFirst: 0,
  finished: false,
  winner: 0,
  tilesLeft: true,
  gamePhase: "waiting-for-players"
};

export const eventHistory = [];

export function createPlayer(name: string) {
  let newPlayer: Player = {
    id: players.data.length,
    name: name,
    score: 0,
    board: {
      main: [
        {
          row: 0,
          colors: [
            { color: "blue", isTrue: false, id: 0 },
            { color: "yellow", isTrue: false, id: 1 },
            { color: "red", isTrue: false, id: 2 },
            { color: "black", isTrue: false, id: 3 },
            { color: "white", isTrue: false, id: 4 },
          ],
        },
        {
          row: 1,
          colors: [
            { color: "white", isTrue: false, id: 0 },
            { color: "blue", isTrue: false, id: 1 },
            { color: "yellow", isTrue: false, id: 2 },
            { color: "red", isTrue: false, id: 3 },
            { color: "black", isTrue: false, id: 4 },
          ],
        },
        {
          row: 2,
          colors: [
            { color: "black", isTrue: false, id: 0 },
            { color: "white", isTrue: false, id: 1},
            { color: "blue", isTrue: false, id: 2 },
            { color: "yellow", isTrue: false, id: 3 },
            { color: "red", isTrue: false, id: 4 },
          ],
        },
        {
          row: 3,
          colors: [
            { color: "red", isTrue: false, id: 0 },
            { color: "black", isTrue: false, id: 1 },
            { color: "white", isTrue: false, id: 2 },
            { color: "blue", isTrue: false, id: 3 },
            { color: "yellow", isTrue: false, id: 4 },
          ],
        },
        {
          row: 4,
          colors: [
            { color: "yellow", isTrue: false, id: 0 },
            { color: "red", isTrue: false, id: 1 },
            { color: "black", isTrue: false, id: 2 },
            { color: "white", isTrue: false, id: 3 },
            { color: "blue", isTrue: false, id: 4 },
          ],
        },
      ],
      stacker: [
        {
          quantity: 0,
          color: "",
        },
        {
          quantity: 0,
          color: "",
        },
        {
          quantity: 0,
          color: "",
        },
        {
          quantity: 0,
          color: "",
        },
        {
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
  if (players.quantity < 4) {
    players.data.push(newPlayer);
    players.quantity += 1;
  }
}

export function addPoint(player: number) {
  players.data[player].score += 1;
}



interface ColorTile {
  color: string;
  isTrue: boolean;
  id: number;
}

export function giveBackTiles(player: number) {
  players.data[player].board.penalty.data.map((color) => {
    switch (color) {
      case "red":
        tilesPool.red += 1
        break;
      case "blue":
        tilesPool.blue += 1
        break;
      case "white":
        tilesPool.white += 1
        break;
      case "yellow":
        tilesPool.yellow += 1
        break;
      case "black":
        tilesPool.black += 1
        break;
      default:
        break;
    }
  }) 
}

export function calculatePoints(player: number) {
  for (let i = 0; i < 5; i++) {
    if (players.data[player].board.stacker[i].quantity === i + 1) {
      const colorTile = players.data[player].board.main[i].colors.find((color) => color.color === players.data[player].board.stacker[i].color);
      const ID = Number(colorTile?.id)
      players.data[player].board.main[i].colors[ID].isTrue = true;
      addPoint(player);
      let checker = ID + 1;
      for (let l = ID + 1; l < 5; l++) {
        if (
          (players.data[player].board.main[i].colors[checker].isTrue === true) &&
          (l === checker)
        ) {
          addPoint(player);
          checker += 1;
        }
      }
      checker = ID - 1;
      for (let l = ID - 1; l > -1; l--) {
        if (
          players.data[player].board.main[i].colors[checker].isTrue === true &&
          l === checker
        ) {
          addPoint(player);
          checker -= 1;
        }
      }
      checker = i + 1;
      console.log("function calculator for player" + player + "checker down: " + checker)
      for (let l = i + 1; l < 5; l++) {
        if (
          players.data[player].board.main[checker].colors[ID].isTrue === true &&
          l === checker
        ) {
          addPoint(player);
          checker += 1;
        }
      }
      checker = i - 1;
      console.log("function calculator for player" + player + "checker up: " + checker)
      for (let l = i - 1; l > -1; l--) {
        if (
          players.data[player].board.main[checker].colors[ID].isTrue === true &&
          l === checker
        ) {
          addPoint(player);
          checker -= 1;
        }
      }
      tilesPool[players.data[player].board.stacker[i].color] += players.data[player].board.stacker[i].quantity; 
      players.data[player].board.stacker[i].quantity = 0;
      players.data[player].board.stacker[i].color = "";
      for (let i = 0; i < players.data[player].board.penalty.data.length; i++) {
          if (i < 2) {
            players.data[player].score -= 1
          } else if (i >= 2 && i < 5) {
            players.data[player].score -= 2
          } else if (i >= 5) {
            players.data[player].score -= 3
          }
        }
      giveBackTiles(player);
      players.data[player].board.penalty.data = [];
    }
  }
}

export function createTraders(quantity: number) {
  for (let i = 0; i < quantity; i++) {
    board.traders.push({ red: 0, blue: 0, white: 0, black: 0, yellow: 0 });
  }
}

export function getRandomTile() {
  const totalTiles = Object.values(tilesPool).reduce(
    (sum, count) => sum + count,
    0
  );

  if (totalTiles === 0) {
    console.log("no tiles left")
    return;
  }

  let randomIndex = Math.floor(Math.random() * totalTiles);

  for (const [color, count] of Object.entries(tilesPool)) {
    if (randomIndex < count) {
      tilesPool[color]--;
      return color;
    }
    randomIndex -= count;
  }
}

export function arrangeTiles() {
  for (let k = 0; k < 4; k++) {
    for (let i = 0; i < board.traders.length; i++) {
      let randomTile = getRandomTile();
      switch (randomTile) {
        case "red":
          board.traders[i].red += 1;
          break;
        case "blue":
          board.traders[i].blue += 1;
          break;
        case "white":
          board.traders[i].white += 1;
          break;
        case "black":
          board.traders[i].black += 1;
          break;
        case "yellow":
          board.traders[i].yellow += 1;
          break;
      }
    }
  }
}

export function startGame() {
  const numberOfTraders = (players.data.length * 2) + 1
  createTraders(numberOfTraders);
  arrangeTiles();
  gameStatus.playerTurn = Math.floor(Math.random() * players.data.length);
  gameStatus.gamePhase = "game-started";
}

export function takeTiles(
  from: string,
  what: Color,
  who: number,
  where: number,
  which?: number
) {
  let tilesTaken;
  let redTilesLeft;
  let blueTilesLeft;
  let blackTilesLeft;
  let whiteTilesLeft;
  let yellowTilesLeft;
  let penaltyTiles;
  if (
    typeof who !== "undefined" &&
    typeof where !== "undefined"
  ) {
    if (from === "trader") {
      if (typeof which !== "undefined") {
      switch (what) {
        case "black":
          tilesTaken = board.traders[which].black;
          board.traders[which].black = 0;
          players.data[who].board.stacker[where].color = "black";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          redTilesLeft = board.traders[which].red;
          blueTilesLeft = board.traders[which].blue;
          whiteTilesLeft = board.traders[which].white;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.blue += blueTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.red += redTilesLeft;
          board.traders[which].red = 0;
          board.traders[which].blue = 0;
          board.traders[which].white = 0;
          board.traders[which].yellow = 0;
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("black");
            }
          }
          break;
        case "blue":
          tilesTaken = board.traders[which].blue;
          board.traders[which].blue -= board.traders[which].blue;
          players.data[who].board.stacker[where].color = "blue";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          redTilesLeft = board.traders[which].red;
          blackTilesLeft = board.traders[which].black;
          whiteTilesLeft = board.traders[which].white;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.black += blackTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.red += redTilesLeft;
          board.traders[which].red = 0;
          board.traders[which].black = 0;
          board.traders[which].white = 0;
          board.traders[which].yellow = 0;
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("blue");
            }
          }
          break;
        case "red":
          tilesTaken = board.traders[which].red;
          board.traders[which].red -= board.traders[which].red;
          players.data[who].board.stacker[where].color = "red";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          blueTilesLeft = board.traders[which].blue;
          blackTilesLeft = board.traders[which].black;
          whiteTilesLeft = board.traders[which].white;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.black += blackTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.blue += blueTilesLeft;
          board.traders[which].black = 0;
          board.traders[which].blue = 0;
          board.traders[which].white = 0;
          board.traders[which].yellow = 0;
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("red");
            }
          }
          break;
        case "white":
          tilesTaken = board.traders[which].white;
          board.traders[which].white -= board.traders[which].white;
          players.data[who].board.stacker[where].color = "white";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          redTilesLeft = board.traders[which].red;
          blackTilesLeft = board.traders[which].black;
          blueTilesLeft = board.traders[which].blue;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.black += blackTilesLeft;
          board.middle.blue += blueTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.red += redTilesLeft;
          board.traders[which].red = 0;
          board.traders[which].blue = 0;
          board.traders[which].black = 0;
          board.traders[which].yellow = 0;
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("white");
            }
          }
          break;
        case "yellow":
          tilesTaken = board.traders[which].yellow;
          board.traders[which].yellow -= board.traders[which].yellow;
          players.data[who].board.stacker[where].color = "yellow";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          redTilesLeft = board.traders[which].red;
          blackTilesLeft = board.traders[which].black;
          blueTilesLeft = board.traders[which].blue;
          whiteTilesLeft = board.traders[which].white;
          board.middle.black += blackTilesLeft;
          board.middle.blue += blueTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.red += redTilesLeft;
          board.traders[which].red = 0;
          board.traders[which].blue = 0;
          board.traders[which].white = 0;
          board.traders[which].black = 0;
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("yellow");
            }
          }
          break;
      }
    };
    } else if (from === "remaining") {
      switch (what) {
        case "black":
          tilesTaken = board.middle.black;
          board.middle.black = 0;
          players.data[who].board.stacker[where].color = "black";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who].board.penalty.FPToken = true;
            players.data[who].board.penalty.data.push("FPT");
          }
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("black");
            }
          }
          break;
        case "blue":
          tilesTaken = board.middle.blue;
          board.middle.blue = 0;
          players.data[who].board.stacker[where].color = "blue";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who].board.penalty.FPToken = true;
            players.data[who].board.penalty.data.push("FPT");
          }
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("blue");
            }
          }
          break;
        case "red":
          tilesTaken = board.middle.red;
          board.middle.red = 0;
          players.data[who].board.stacker[where].color = "red";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who].board.penalty.FPToken = true;
            players.data[who].board.penalty.data.push("FPT");
          }
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("red");
            }
          }
          break;
        case "white":
          tilesTaken = board.middle.white;
          board.middle.white = 0;
          players.data[who].board.stacker[where].color = "white";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who].board.penalty.FPToken = true;
            players.data[who].board.penalty.data.push("FPT");
          }
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("white");
            }
          }
          break;
        case "yellow":
          tilesTaken = board.middle.yellow;
          board.middle.yellow = 0;
          players.data[who].board.stacker[where].color = "yellow";
          players.data[who].board.stacker[where].quantity += tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who].board.penalty.FPToken = true;
            players.data[who].board.penalty.data.push("FPT");
          }
          if (players.data[who].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who].board.stacker[where].quantity - (where + 1);
            players.data[who].board.stacker[where].quantity = where + 1;
            for (let i = 0; i < penaltyTiles; i++) {
              players.data[who].board.penalty.data.push("yellow");
            }
          }
          break;
      }
    }
  }
}

export function IsMoveLegal(what: string, who: number, where: number) {
  const colorTile = players.data[who].board.main[where].colors.find((color) => color.color === what)
  const ID = Number(colorTile?.id)
  if (
    (players.data[who].board.stacker[where].color === what || players.data[who].board.stacker[where].color === "")
  ) {
    if (!players.data[who].board.main[where].colors[ID].isTrue) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function checkForWholeRow(player: number, k: number) {
  if (
    players.data[player].board.main[k].colors[0].isTrue &&
    players.data[player].board.main[k].colors[1].isTrue &&
    players.data[player].board.main[k].colors[2].isTrue &&
    players.data[player].board.main[k].colors[3].isTrue &&
    players.data[player].board.main[k].colors[4].isTrue
  ) {
    return true
  } else {
    return false
  }
}

export function roundEnd() {
  for (let i = 0; i < players.data.length; i++) {
    calculatePoints(i);
  }
  for (let i = 0; i < players.data.length; i++) {
    if (
      checkForWholeRow(i, 0) ||
      checkForWholeRow(i, 1) ||
      checkForWholeRow(i, 2) ||
      checkForWholeRow(i, 3) ||
      checkForWholeRow(i, 4)
    ) {
      gameStatus.finished = true;
    }
  }
  gameStatus.round += 1;
}

export function calculateBonusPoints(player: number) {
  // check for whole color
  // check for blue
  if (
    players.data[player].board.main[0].colors[0].isTrue === true &&
    players.data[player].board.main[1].colors[1].isTrue === true &&
    players.data[player].board.main[2].colors[2].isTrue === true &&
    players.data[player].board.main[3].colors[3].isTrue === true &&
    players.data[player].board.main[4].colors[4].isTrue === true
  ) {
    players.data[player].score += 10;
  }
  // check for yellow
  if (
    players.data[player].board.main[0].colors[1].isTrue === true &&
    players.data[player].board.main[1].colors[2].isTrue === true &&
    players.data[player].board.main[2].colors[3].isTrue === true &&
    players.data[player].board.main[3].colors[4].isTrue === true &&
    players.data[player].board.main[4].colors[0].isTrue === true
  ) {
    players.data[player].score += 10;
  }
  // check for red
  if (
    players.data[player].board.main[0].colors[2].isTrue === true &&
    players.data[player].board.main[1].colors[3].isTrue === true &&
    players.data[player].board.main[2].colors[4].isTrue === true &&
    players.data[player].board.main[3].colors[0].isTrue === true &&
    players.data[player].board.main[4].colors[1].isTrue === true
  ) {
    players.data[player].score += 10;
  }
  // check for black
  if (
    players.data[player].board.main[0].colors[3].isTrue === true &&
    players.data[player].board.main[1].colors[4].isTrue === true &&
    players.data[player].board.main[2].colors[0].isTrue === true &&
    players.data[player].board.main[3].colors[1].isTrue === true &&
    players.data[player].board.main[4].colors[2].isTrue === true
  ) {
    players.data[player].score += 10;
  }
  // check for white
  if (
    players.data[player].board.main[0].colors[4].isTrue === true &&
    players.data[player].board.main[1].colors[0].isTrue === true &&
    players.data[player].board.main[2].colors[1].isTrue === true &&
    players.data[player].board.main[3].colors[2].isTrue === true &&
    players.data[player].board.main[4].colors[3].isTrue === true
  ) {
    players.data[player].score += 10;
  }
  // check for whole column
  if (
    players.data[player].board.main[0].colors[0].isTrue === true &&
    players.data[player].board.main[1].colors[0].isTrue === true &&
    players.data[player].board.main[2].colors[0].isTrue === true &&
    players.data[player].board.main[3].colors[0].isTrue === true &&
    players.data[player].board.main[4].colors[0].isTrue === true
  ) {
    players.data[player].score += 7;
  }
  if (
    players.data[player].board.main[0].colors[1].isTrue === true &&
    players.data[player].board.main[1].colors[1].isTrue === true &&
    players.data[player].board.main[2].colors[1].isTrue === true &&
    players.data[player].board.main[3].colors[1].isTrue === true &&
    players.data[player].board.main[4].colors[1].isTrue === true
  ) {
    players.data[player].score += 7;
  }
  if (
    players.data[player].board.main[0].colors[2].isTrue === true &&
    players.data[player].board.main[1].colors[2].isTrue === true &&
    players.data[player].board.main[2].colors[2].isTrue === true &&
    players.data[player].board.main[3].colors[2].isTrue === true &&
    players.data[player].board.main[4].colors[2].isTrue === true
  ) {
    players.data[player].score += 7;
  }
  if (
    players.data[player].board.main[0].colors[3].isTrue === true &&
    players.data[player].board.main[1].colors[3].isTrue === true &&
    players.data[player].board.main[2].colors[3].isTrue === true &&
    players.data[player].board.main[3].colors[3].isTrue === true &&
    players.data[player].board.main[4].colors[3].isTrue === true
  ) {
    players.data[player].score += 7;
  }
  if (
    players.data[player].board.main[0].colors[4].isTrue === true &&
    players.data[player].board.main[1].colors[4].isTrue === true &&
    players.data[player].board.main[2].colors[4].isTrue === true &&
    players.data[player].board.main[3].colors[4].isTrue === true &&
    players.data[player].board.main[4].colors[4].isTrue === true
  ) {
    players.data[player].score += 7;
  }
  // check for whole row
  if (
    players.data[player].board.main[0].colors[0].isTrue === true &&
    players.data[player].board.main[0].colors[1].isTrue === true &&
    players.data[player].board.main[0].colors[2].isTrue === true &&
    players.data[player].board.main[0].colors[3].isTrue === true &&
    players.data[player].board.main[0].colors[4].isTrue === true
  ) {
    players.data[player].score += 2;
  }
  // check for yellow
  if (
    players.data[player].board.main[1].colors[1].isTrue === true &&
    players.data[player].board.main[1].colors[2].isTrue === true &&
    players.data[player].board.main[1].colors[3].isTrue === true &&
    players.data[player].board.main[1].colors[4].isTrue === true &&
    players.data[player].board.main[1].colors[0].isTrue === true
  ) {
    players.data[player].score += 2;
  }
  // check for red
  if (
    players.data[player].board.main[2].colors[2].isTrue === true &&
    players.data[player].board.main[2].colors[3].isTrue === true &&
    players.data[player].board.main[2].colors[4].isTrue === true &&
    players.data[player].board.main[2].colors[0].isTrue === true &&
    players.data[player].board.main[2].colors[1].isTrue === true
  ) {
    players.data[player].score += 2;
  }
  // check for black
  if (
    players.data[player].board.main[3].colors[3].isTrue === true &&
    players.data[player].board.main[3].colors[4].isTrue === true &&
    players.data[player].board.main[3].colors[0].isTrue === true &&
    players.data[player].board.main[3].colors[1].isTrue === true &&
    players.data[player].board.main[3].colors[2].isTrue === true
  ) {
    players.data[player].score += 2;
  }
  // check for white
  if (
    players.data[player].board.main[4].colors[4].isTrue === true &&
    players.data[player].board.main[4].colors[0].isTrue === true &&
    players.data[player].board.main[4].colors[1].isTrue === true &&
    players.data[player].board.main[4].colors[2].isTrue === true &&
    players.data[player].board.main[4].colors[3].isTrue === true
  ) {
    players.data[player].score += 2;
  }
}

export function determineWinner() {
  let highestScore = -Infinity;
  let highestScorePlayer = 0;

  for (let i = 1; i < players.data.length; i++) {
    if (players.data[i - 1].score > highestScore) {
      highestScore = players.data[i - 1].score;
      highestScorePlayer = i - 1;
    }
  }

  return highestScorePlayer;
}

export function finishGame() {
  for (let i = 1; i < players.data.length; i++) {
    let player = i - 1;
    calculateBonusPoints(player);
  }
  gameStatus.winner = determineWinner();
  gameStatus.gamePhase = "game-finished"
  // check who has highest score and determine the winner
}

export function nextTurn() {
  if (gameStatus.playerTurn < players.data.length - 1) {
    gameStatus.playerTurn += 1;
  } else {
    gameStatus.playerTurn = 0;
  }
  gameStatus.turn += 1;
}

export function checkForTiles() {
  let emptySpaces = 0;
  for (let i = 0; i < board.traders.length; i++) {
    if (
      board.traders[i].black === 0 &&
      board.traders[i].blue === 0 &&
      board.traders[i].red === 0 &&
      board.traders[i].white === 0 &&
      board.traders[i].yellow === 0
      ) {
        emptySpaces += 1;
      }
  }
  if (
    board.middle.black === 0 &&
    board.middle.blue === 0 &&
    board.middle.red === 0 &&
    board.middle.white === 0 &&
    board.middle.yellow === 0 
  ) {
    emptySpaces += 1;
  }
  if (emptySpaces === board.traders.length + 1) {
    gameStatus.tilesLeft = false;
  }
}

export function nextRound() {
  console.log("next Round initiated")
  gameStatus.tilesLeft = true;
  arrangeTiles();
  for (let i = 0; i < players.data.length; i++) {
    if (players.data[i].board.penalty.FPToken === true) {
      gameStatus.playerTurn = i;
      players.data[i].board.penalty.FPToken = false
    }
  }
  board.middle.FPToken = true;
  gameStatus.round += 1
}

export function updateGameStatus() {
  const interpretatePlayers = () => {
    let interpretatedPlayers: any[] = [];
    for (let i = 0; i < players.data.length; i++) {
      const penaltyBoard = players.data[i].board.penalty.data
      const interpretatedPlayer = {
        id: players.data[i].id,
        name: players.data[i].name,
        score: players.data[i].score,
        board: {
          mainRows: [{
            blue: players.data[i].board.main[0].colors[0].isTrue,
            yellow: players.data[i].board.main[0].colors[1].isTrue,
            red: players.data[i].board.main[0].colors[2].isTrue,
            black: players.data[i].board.main[0].colors[3].isTrue,
            white: players.data[i].board.main[0].colors[4].isTrue,
          },{
            white: players.data[i].board.main[1].colors[0].isTrue,
            blue: players.data[i].board.main[1].colors[1].isTrue,
            yellow: players.data[i].board.main[1].colors[2].isTrue,
            red: players.data[i].board.main[1].colors[3].isTrue,
            black: players.data[i].board.main[1].colors[4].isTrue,
          },{
            black: players.data[i].board.main[2].colors[0].isTrue,
            white: players.data[i].board.main[2].colors[1].isTrue,
            blue: players.data[i].board.main[2].colors[2].isTrue,
            yellow: players.data[i].board.main[2].colors[3].isTrue,
            red: players.data[i].board.main[2].colors[4].isTrue,
          },{
            red: players.data[i].board.main[3].colors[0].isTrue,
            black: players.data[i].board.main[3].colors[1].isTrue,
            white: players.data[i].board.main[3].colors[2].isTrue,
            blue: players.data[i].board.main[3].colors[3].isTrue,
            yellow: players.data[i].board.main[3].colors[4].isTrue,
          },{
            yellow: players.data[i].board.main[4].colors[0].isTrue,
            red: players.data[i].board.main[4].colors[1].isTrue,
            black: players.data[i].board.main[4].colors[2].isTrue,
            white: players.data[i].board.main[4].colors[3].isTrue,
            blue: players.data[i].board.main[4].colors[4].isTrue,
          }],
          stackerRows: players.data[i].board.stacker,
          penaltyBoard: penaltyBoard,
        }
      }
      interpretatedPlayers.push(interpretatedPlayer)
    }
    return interpretatedPlayers;
  }

  function interpretateRemaining() {
    const isFPT = () => {
      if (board.middle.FPToken) {
        return 1
      } else {return 0}
    }

    const interpretatedRemaining = {
      FPT: isFPT(),
      white: board.middle.white,
      red: board.middle.red,
      black: board.middle.black,
      blue: board.middle.blue,
      yellow: board.middle.yellow,
    }

    return interpretatedRemaining;
  }

  function interpretateTraders() {
    const traders: any[] = [];
    for (let i = 0; i < board.traders.length; i++) {
      const trader: any[] = [];
      for (let k=0; k < board.traders[i].black; k++) {
        trader.push("black")
      };
      for (let k=0; k < board.traders[i].red; k++) {
        trader.push("red")
      };
      for (let k=0; k < board.traders[i].white; k++) {
        trader.push("white")
      };
      for (let k=0; k < board.traders[i].blue; k++) {
        trader.push("blue")
      };
      for (let k=0; k < board.traders[i].yellow; k++) {
        trader.push("yellow")
      };
      traders.push(trader);
    }
    return traders;
  }

  const interpretatedPlayers = interpretatePlayers();

  const interpretatedRemaining =
  interpretateRemaining();

  const interpretatedTraders = interpretateTraders();

  return {
      players: interpretatedPlayers,
      board: {
        remaining: interpretatedRemaining,
        traders: interpretatedTraders,
      },
      turn: gameStatus.turn,
      round: gameStatus.round,
      playerTurn: gameStatus.playerTurn,
      winner: gameStatus.winner,
      readyPlayers: gameStatus.readyPlayers,
      gamePhase: gameStatus.gamePhase,
    }
  }
