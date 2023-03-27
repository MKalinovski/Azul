import { MouseEvent } from "react";

interface Player {
  id: number;
  name: string;
  score: number;
  board: {
    main: {
      row: number;
      colors: {
        color: string;
        isTrue: boolean;
      }[];
    }[];
    stacker: {
      row: number;
      quantity: number;
      color: string;
    }[];
  };
}

interface PlayerArray {
  quantity: number;
  data: Player[];
}

export const players: PlayerArray = {
  quantity: 0,
  data: [],
};

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
