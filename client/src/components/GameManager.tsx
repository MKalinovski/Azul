import React, { PropsWithChildren } from "react";

export type Color = "red" | "blue" | "white" | "black" | "yellow";
const FPT = "FPT";
type PenaltyColor = Color | typeof FPT;
type Trader = Color[];

interface StackerRow {
  color: Color;
  quantity: number;
}

interface PlayerBoard {
  mainRows: { [color in Color]: boolean };
  stackerRows: StackerRow[];
  penaltyBoard: PenaltyColor[];
}

interface Player {
  id: number;
  name: string;
  score: number;
  board: PlayerBoard;
}

interface GameBoard {
  remaining: {
    [color in PenaltyColor]: number;
  };
  traders: Trader[];
}

interface GameState {
  players: Player[];
  board: GameBoard;
  turn: number;
  round: number;
  playerTurn: number;
  winner: number;
}

function newGameState(): GameState {
  return {
    players: [],
    board: {
      remaining: {
        FPT: 0,
        white: 0,
        red: 0,
        black: 0,
        blue: 0,
        yellow: 0,
      },
      traders: [],
    },
    turn: 0,
    round: 0,
    playerTurn: 0,
    winner: 0,
  };
}

interface Props {}

const GameStateContext = React.createContext(newGameState());

export function GameManager({ children }: PropsWithChildren<Props>) {
  const [state, setState] = React.useState(newGameState());
  return (
    <GameStateContext.Provider value={state}>
      {children}
    </GameStateContext.Provider>
  );
}

function useRemaining() {
  const gameState = React.useContext(GameStateContext);
  return gameState.board.remaining;
}

function useTraders() {
  const gameState = React.useContext(GameStateContext);
  return gameState.board.traders;
}

interface TileProps {
  color: string;
}

function Tile({ color }: TileProps) {
  return (
    <div
      style={{
        backgroundColor: color,
        width: "50px",
        height: "50px",
        borderRadius: "8px",
      }}
    ></div>
  );
}

function RemainingBoard() {
  const remaining = useRemaining();
  return (
    <div className="remaining-board">
      {Object.entries(remaining).map(([color, count]) => (
        <>
          {new Array(count).map(() => (
            <Tile color={color} />
          ))}
        </>
      ))}
    </div>
  );
}

function TradersBoard() {
  const traders = useTraders();
  return (
    <div className="traders-board">
      {traders.map((trader) => (
        <div className="trader">
          {trader.map((traderColor) => (
            <Tile color={traderColor} />
          ))}
        </div>
      ))}
    </div>
  );
}
