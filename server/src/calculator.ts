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
};

export const eventHistory = [];

export function createPlayer(name: string) {
  let newPlayer: Player = {
    id: players.quantity + 1,
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
  if (players.quantity < 4) {
    players.data.push(newPlayer);
    players.quantity += 1;
  } else {
    console.log("Reached maximum number of Players");
  }
}

export function calculatePoints(player: number) {
  let mainBoard = players.data[player].board.main;
  let stackerBoard = players.data[player].board.stacker;
  function addPoint() {
    players.data[player].score = +1;
  }
  for (let i = 0; i < 4; i++) {
    if (stackerBoard[i].quantity === i + 1) {
      if (stackerBoard[i].color === "red") {
        for (let k = 0; k < 5; k++) {
          if (mainBoard[i].colors[k].color === "red") {
            players.data[player].board.main[i].colors[k].isTrue = true;
            addPoint();
            let checker = k;
            for (let l = k; l < k + 4; l++) {
              if (
                mainBoard[i].colors[checker + 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = k; l > k - 4; l--) {
              if (
                mainBoard[i].colors[checker - 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker -= 1;
              }
            }
            checker = k;
            for (let l = i; l < i + 4; l++) {
              if (
                mainBoard[checker + 1].colors[k].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = i; l > i - 4; l--) {
              if (
                mainBoard[checker - 1].colors[k].isTrue === true &&
                l === checker
              ) {
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
            players.data[player].board.main[i].colors[k].isTrue = true;
            addPoint();
            let checker = k;
            for (let l = k; l < k + 4; l++) {
              if (
                mainBoard[i].colors[checker + 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = k; l > k - 4; l--) {
              if (
                mainBoard[i].colors[checker - 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker -= 1;
              }
            }
            checker = k;
            for (let l = i; l < i + 4; l++) {
              if (
                mainBoard[checker + 1].colors[k].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = i; l > i - 4; l--) {
              if (
                mainBoard[checker - 1].colors[k].isTrue === true &&
                l === checker
              ) {
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
            players.data[player].board.main[i].colors[k].isTrue = true;
            addPoint();
            let checker = k;
            for (let l = k; l < k + 4; l++) {
              if (
                mainBoard[i].colors[checker + 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = k; l > k - 4; l--) {
              if (
                mainBoard[i].colors[checker - 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker -= 1;
              }
            }
            checker = k;
            for (let l = i; l < i + 4; l++) {
              if (
                mainBoard[checker + 1].colors[k].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = i; l > i - 4; l--) {
              if (
                mainBoard[checker - 1].colors[k].isTrue === true &&
                l === checker
              ) {
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
            players.data[player].board.main[i].colors[k].isTrue = true;
            addPoint();
            let checker = k;
            for (let l = k; l < k + 4; l++) {
              if (
                mainBoard[i].colors[checker + 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = k; l > k - 4; l--) {
              if (
                mainBoard[i].colors[checker - 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker -= 1;
              }
            }
            checker = k;
            for (let l = i; l < i + 4; l++) {
              if (
                mainBoard[checker + 1].colors[k].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = i; l > i - 4; l--) {
              if (
                mainBoard[checker - 1].colors[k].isTrue === true &&
                l === checker
              ) {
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
            players.data[player].board.main[i].colors[k].isTrue = true;
            addPoint();
            let checker = k;
            for (let l = k; l < k + 4; l++) {
              if (
                mainBoard[i].colors[checker + 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = k; l > k - 4; l--) {
              if (
                mainBoard[i].colors[checker - 1].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker -= 1;
              }
            }
            checker = k;
            for (let l = i; l < i + 4; l++) {
              if (
                mainBoard[checker + 1].colors[k].isTrue === true &&
                l === checker
              ) {
                addPoint();
                checker += 1;
              }
            }
            checker = k;
            for (let l = i; l > i - 4; l--) {
              if (
                mainBoard[checker - 1].colors[k].isTrue === true &&
                l === checker
              ) {
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

export function createTraders(quantity: number) {
  for (let i = 1; i < quantity; i++) {
    board.traders.push({ red: 0, blue: 0, white: 0, black: 0, yellow: 0 });
  }
}

export function getRandomTile() {
  const totalTiles = Object.values(tilesPool).reduce(
    (sum, count) => sum + count,
    0
  );

  if (totalTiles === 0) {
    throw new Error("No tiles left in the pool.");
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
  for (let i = 1; i < board.traders.length; i++) {
    for (let k = 1; k < 4; k++) {
      let randomTile = getRandomTile();
      switch (randomTile) {
        case "red":
          board.traders[i].red = +1;
          break;
        case "blue":
          board.traders[i].blue = +1;
          break;
        case "white":
          board.traders[i].white = +1;
          break;
        case "black":
          board.traders[i].black = +1;
          break;
        case "yellow":
          board.traders[i].yellow = +1;
          break;
      }
    }
  }
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
    typeof which !== "undefined" &&
    typeof who !== "undefined" &&
    typeof where !== "undefined"
  ) {
    if (from === "trader") {
      switch (what) {
        case "black":
          tilesTaken = board.traders[which].black;
          board.traders[which].black -= board.traders[which].black;
          players.data[who - 1].board.stacker[where].color = "black";
          players.data[who - 1].board.stacker[where].quantity += tilesTaken;
          redTilesLeft = board.traders[which].red;
          blueTilesLeft = board.traders[which].blue;
          whiteTilesLeft = board.traders[which].white;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.blue += blueTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.red += redTilesLeft;
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("black");
            }
          }
          break;
        case "blue":
          tilesTaken = board.traders[which].blue;
          board.traders[which].blue -= board.traders[which].blue;
          players.data[who - 1].board.stacker[where].color = "blue";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          redTilesLeft = board.traders[which].red;
          blackTilesLeft = board.traders[which].black;
          whiteTilesLeft = board.traders[which].white;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.black += blackTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.red += redTilesLeft;
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("blue");
            }
          }
          break;
        case "red":
          tilesTaken = board.traders[which].red;
          board.traders[which].red -= board.traders[which].red;
          players.data[who - 1].board.stacker[where].color = "red";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          blueTilesLeft = board.traders[which].blue;
          blackTilesLeft = board.traders[which].black;
          whiteTilesLeft = board.traders[which].white;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.black += blackTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.blue += blueTilesLeft;
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("red");
            }
          }
          break;
        case "white":
          tilesTaken = board.traders[which].white;
          board.traders[which].white -= board.traders[which].white;
          players.data[who - 1].board.stacker[where].color = "white";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          redTilesLeft = board.traders[which].red;
          blackTilesLeft = board.traders[which].black;
          blueTilesLeft = board.traders[which].blue;
          yellowTilesLeft = board.traders[which].yellow;
          board.middle.black += blackTilesLeft;
          board.middle.blue += blueTilesLeft;
          board.middle.yellow += yellowTilesLeft;
          board.middle.red += redTilesLeft;
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("white");
            }
          }
          break;
        case "yellow":
          tilesTaken = board.traders[which].yellow;
          board.traders[which].yellow -= board.traders[which].yellow;
          players.data[who - 1].board.stacker[where].color = "yellow";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          redTilesLeft = board.traders[which].red;
          blackTilesLeft = board.traders[which].black;
          blueTilesLeft = board.traders[which].blue;
          whiteTilesLeft = board.traders[which].white;
          board.middle.black += blackTilesLeft;
          board.middle.blue += blueTilesLeft;
          board.middle.white += whiteTilesLeft;
          board.middle.red += redTilesLeft;
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("yellow");
            }
          }
          break;
      }
    } else if (from === "middle") {
      switch (what) {
        case "black":
          tilesTaken = board.middle.black;
          board.middle.black = 0;
          players.data[who - 1].board.stacker[where].color = "black";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who - 1].board.penalty.FPToken = true;
            players.data[who - 1].board.penalty.data.push("FPToken");
          }
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("black");
            }
          }
          break;
        case "blue":
          tilesTaken = board.middle.blue;
          board.middle.blue = 0;
          players.data[who - 1].board.stacker[where].color = "blue";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who - 1].board.penalty.FPToken = true;
            players.data[who - 1].board.penalty.data.push("FPToken");
          }
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("blue");
            }
          }
          break;
        case "red":
          tilesTaken = board.middle.red;
          board.middle.red = 0;
          players.data[who - 1].board.stacker[where].color = "red";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who - 1].board.penalty.FPToken = true;
            players.data[who - 1].board.penalty.data.push("FPToken");
          }
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("red");
            }
          }
          break;
        case "white":
          tilesTaken = board.middle.white;
          board.middle.white = 0;
          players.data[who - 1].board.stacker[where].color = "white";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who - 1].board.penalty.FPToken = true;
            players.data[who - 1].board.penalty.data.push("FPToken");
          }
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("white");
            }
          }
          break;
        case "yellow":
          tilesTaken = board.middle.yellow;
          board.middle.yellow = 0;
          players.data[who - 1].board.stacker[where].color = "yellow";
          players.data[who - 1].board.stacker[where].quantity = tilesTaken;
          if (board.middle.FPToken === true) {
            board.middle.FPToken = false;
            players.data[who - 1].board.penalty.FPToken = true;
            players.data[who - 1].board.penalty.data.push("FPToken");
          }
          if (players.data[who - 1].board.stacker[where].quantity > where + 1) {
            penaltyTiles =
              players.data[who - 1].board.stacker[where].quantity - (where + 1);
            players.data[who - 1].board.stacker[where].quantity = where + 1;
            for (let i = 1; i < penaltyTiles; i++) {
              players.data[who - 1].board.penalty.data.push("yellow");
            }
          }
          break;
      }
    }
  }
}

export function roundEnd() {
  for (let i = 1; i < players.data.length; i++) {
    let player = i - 1;
    calculatePoints(player);
  }
  for (let i = 1; i < players.data.length; i++) {
    if (
      players.data[i - 1].board.main[0].colors.length === 5 ||
      players.data[i - 1].board.main[1].colors.length === 5 ||
      players.data[i - 1].board.main[2].colors.length === 5 ||
      players.data[i - 1].board.main[3].colors.length === 5 ||
      players.data[i - 1].board.main[4].colors.length === 5
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
  // check who has highest score and determine the winner
}

export function nextTurn() {
  if (gameStatus.turn < players.data.length - 1) {
    gameStatus.playerTurn += 1;
  } else {
    gameStatus.playerTurn = 0;
  }
  gameStatus.turn += 1;
}

export function checkForTiles() {
  let emptySpaces = 0;
  for (let i = 1; i < board.traders.length; i++) {
    if (
      board.traders[i-1].black === 0 &&
      board.traders[i-1].blue === 0 &&
      board.traders[i-1].red === 0 &&
      board.traders[i-1].white === 0 &&
      board.traders[i-1].yellow === 0
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
  arrangeTiles();
  for (let i = 0; i < players.data.length; i++) {
    if (players.data[i -1].board.penalty.FPToken === true) {
      gameStatus.playerTurn = i - 1;
    }
  }
  board.middle.FPToken = true;
  gameStatus.round += 1
}