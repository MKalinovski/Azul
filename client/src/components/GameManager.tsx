import React, { PropsWithChildren } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TileProperties, findColor } from "../styles/TileStyle";
import axios from "axios";
import "../styles/GameStyle.css";
import { hover } from "@testing-library/user-event/dist/hover";

export type Color = "red" | "blue" | "white" | "black" | "yellow";
const FPT = "FPT";
type PenaltyColor = Color | typeof FPT;
type Trader = Color[];

interface StackerRow {
  color: Color;
  quantity: number;
}

interface PlayerBoard {
  mainRows: { [color in Color]: boolean }[];
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
  readyPlayers: number;
  gamePhase: string;
}

interface NewGameState {
  state: GameState;
  setState: (state: GameState) => void;
}

/* function newGameState(): GameState {
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
    readyPlayers: 0,
    gamePhase: "game-started",
  };
}
*/

function newGameState(): GameState {
  return {
    players: [
      {
        id: 0,
        name: "Mateusz",
        score: 0,
        board: {
          mainRows: [
            {
              blue: false,
              yellow: false,
              red: false,
              black: false,
              white: false,
            },
            {
              white: false,
              blue: false,
              yellow: false,
              red: false,
              black: false,
            },
            {
              black: false,
              white: false,
              blue: false,
              yellow: false,
              red: false,
            },
            {
              red: false,
              black: false,
              white: false,
              blue: false,
              yellow: false,
            },
            {
              yellow: false,
              red: false,
              black: false,
              white: false,
              blue: false,
            },
          ],
          stackerRows: [
            {
              color: "red",
              quantity: 1,
            },
            {
              color: "blue",
              quantity: 2,
            },
            {
              color: "white",
              quantity: 3,
            },
            {
              color: "red",
              quantity: 4,
            },
            {
              color: "black",
              quantity: 5,
            },
          ],
          penaltyBoard: ["red"],
        },
      },
      {
        id: 1,
        name: "Asia",
        score: 20,
        board: {
          mainRows: [
            {
              blue: false,
              yellow: false,
              red: true,
              black: false,
              white: false,
            },
            {
              white: true,
              blue: false,
              yellow: false,
              red: false,
              black: false,
            },
            {
              black: false,
              white: false,
              blue: false,
              yellow: false,
              red: false,
            },
            {
              red: false,
              black: false,
              white: false,
              blue: false,
              yellow: false,
            },
            {
              yellow: false,
              red: false,
              black: false,
              white: false,
              blue: false,
            },
          ],
          stackerRows: [
            {
              color: "red",
              quantity: 1,
            },
            {
              color: "blue",
              quantity: 2,
            },
            {
              color: "white",
              quantity: 3,
            },
            {
              color: "red",
              quantity: 0,
            },
            {
              color: "black",
              quantity: 3,
            },
          ],
          penaltyBoard: ["blue", "red"],
        },
      },
    ],
    board: {
      remaining: {
        FPT: 1,
        white: 5,
        red: 3,
        black: 2,
        blue: 0,
        yellow: 1,
      },
      traders: [
        ["red", "red", "blue", "red"],
        ["white", "red", "black", "yellow"],
        ["black", "black", "white", "blue"],
        ["blue", "blue", "blue", "red"],
        ["red", "white", "yellow", "yellow"],
        ["yellow", "white", "red", "yellow"],
        ["blue", "black", "black", "red"],
        ["red", "red", "blue", "white"],
        ["red", "white", "yellow", "yellow"],
      ],
    },
    turn: 0,
    round: 0,
    playerTurn: 0,
    winner: 0,
    readyPlayers: 0,
    gamePhase: "game-started",
  };
}

interface ConnectionInfo {
  host: string;
  setHost: (host: string) => void;
}

function newConnectionInfo(): ConnectionInfo {
  return {
    host: "localhost",
    setHost: () => {},
  };
}

interface ICurrentPlayerID {
  currentPlayerID: number;
  setCurrentPlayerID: (currentPlayerID: number) => void;
}

function newCurrentPlayerID(): ICurrentPlayerID {
  return {
    currentPlayerID: 0,
    setCurrentPlayerID: () => {},
  };
}

interface IChosenTileColor {
  chosenTileColor: string;
  setChosenTileColor: (ChosenTileColor: string) => void;
}

function newChosenTileColor(): IChosenTileColor {
  return {
    chosenTileColor: "",
    setChosenTileColor: () => {},
  };
}

interface IChosenTilePosition {
  chosenTilePosition: string;
  setChosenTilePosition: (ChosenTilePosition: string) => void;
}

function newChosenTilePosition(): IChosenTilePosition {
  return {
    chosenTilePosition: "",
    setChosenTilePosition: () => {},
  };
}

interface IHoveredTileColor {
  hoveredTileColor: string;
  setHoveredTileColor: (ChosenTileColor: string) => void;
}

function newHoveredTileColor(): IHoveredTileColor {
  return {
    hoveredTileColor: "",
    setHoveredTileColor: () => {},
  };
}

interface IHoveredTilePosition {
  hoveredTilePosition: string;
  setHoveredTilePosition: (ChosenTilePosition: string) => void;
}

function newHoveredTilePosition(): IHoveredTilePosition {
  return {
    hoveredTilePosition: "",
    setHoveredTilePosition: () => {},
  };
}

interface Props {}

const GameStateContext = React.createContext(newGameState());
const ConnectionInfoContext = React.createContext(newConnectionInfo());
const CurrentPlayerIDContext = React.createContext(newCurrentPlayerID());
const ChosenTileColorContext = React.createContext(newChosenTileColor());
const ChosenTilePositionContext = React.createContext(newChosenTilePosition());
const HoveredTilePositionContext = React.createContext(
  newHoveredTilePosition()
);
const HoveredTileColorContext = React.createContext(newHoveredTileColor());

export function GameManager({ children }: PropsWithChildren<Props>) {
  const [state, setState] = React.useState(newGameState());
  const [host, setHost] = React.useState("");
  const [currentPlayerID, setCurrentPlayerID] = React.useState(0);
  const [chosenTileColor, setChosenTileColor] = React.useState("");
  const [chosenTilePosition, setChosenTilePosition] = React.useState("");
  const [hoveredTileColor, setHoveredTileColor] = React.useState("");
  const [hoveredTilePosition, setHoveredTilePosition] = React.useState("");
  return (
    <CurrentPlayerIDContext.Provider
      value={{ currentPlayerID, setCurrentPlayerID }}
    >
      <ConnectionInfoContext.Provider value={{ host, setHost }}>
        <GameStateContext.Provider value={state}>
          <ChosenTileColorContext.Provider
            value={{ chosenTileColor, setChosenTileColor }}
          >
            <ChosenTilePositionContext.Provider
              value={{ chosenTilePosition, setChosenTilePosition }}
            >
              <HoveredTileColorContext.Provider
                value={{ hoveredTileColor, setHoveredTileColor }}
              >
                <HoveredTilePositionContext.Provider
                  value={{ hoveredTilePosition, setHoveredTilePosition }}
                >
                  {children}
                </HoveredTilePositionContext.Provider>
              </HoveredTileColorContext.Provider>
            </ChosenTilePositionContext.Provider>
          </ChosenTileColorContext.Provider>
        </GameStateContext.Provider>
      </ConnectionInfoContext.Provider>
    </CurrentPlayerIDContext.Provider>
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

function usePlayers() {
  const gameState = React.useContext(GameStateContext);
  return gameState.players;
}

function useReadyPlayers() {
  const gameState = React.useContext(GameStateContext);
  return gameState.readyPlayers;
}

function useGamePhase() {
  const gamePhase = React.useContext(GameStateContext);
  return gamePhase.gamePhase;
}

function useHost() {
  const { host } = React.useContext(ConnectionInfoContext);
  return host;
}

function useSetHost() {
  const { setHost } = React.useContext(ConnectionInfoContext);
  return setHost;
}

function usePlayerTurn() {
  const gameState = React.useContext(GameStateContext);
  return gameState.playerTurn;
}

function useCurrentPlayerID() {
  const playerID = React.useContext(CurrentPlayerIDContext);
  return playerID.currentPlayerID;
}

function useSetCurrentPlayerID() {
  const playerID = React.useContext(CurrentPlayerIDContext);
  return playerID.setCurrentPlayerID;
}

function useChosenTileColor() {
  const tileColor = React.useContext(ChosenTileColorContext);
  return tileColor.chosenTileColor;
}

function useSetChosenTileColor() {
  const tileColor = React.useContext(ChosenTileColorContext);
  return tileColor.setChosenTileColor;
}

function useChosenTilePosition() {
  const tilePosition = React.useContext(ChosenTilePositionContext);
  return tilePosition.chosenTilePosition;
}

function useSetChosenTilePosition() {
  const tilePosition = React.useContext(ChosenTilePositionContext);
  return tilePosition.setChosenTilePosition;
}

function useHoveredTileColor() {
  const hoveredTileColor = React.useContext(HoveredTileColorContext);
  return hoveredTileColor.hoveredTileColor;
}

function useSetHoveredTileColor() {
  const hoveredTileColor = React.useContext(HoveredTileColorContext);
  return hoveredTileColor.setHoveredTileColor;
}

function useHoveredTilePosition() {
  const hoveredTilePosition = React.useContext(HoveredTilePositionContext);
  return hoveredTilePosition.hoveredTilePosition;
}

function useSetHoveredTilePosition() {
  const hoveredTilePosition = React.useContext(HoveredTilePositionContext);
  return hoveredTilePosition.setHoveredTilePosition;
}

interface TileProps {
  color: string;
  unavailable?: boolean;
  small?: boolean;
  position: string;
}

function Tile({ color, unavailable, small, position }: TileProps) {
  const chosenTileColor = useChosenTileColor();
  const chosenTilePosition = useChosenTilePosition();
  const setChosenTileColor = useSetChosenTileColor();
  const setChosenTilePosition = useSetChosenTilePosition();
  const PlayerTurn = usePlayerTurn();
  const CurrentPlayerID = useCurrentPlayerID();
  const hoveredTileColor = useHoveredTileColor();
  const hoveredTilePosition = useHoveredTilePosition();
  const setHoveredTileColor = useSetHoveredTileColor();
  const setHoveredTilePosition = useSetHoveredTilePosition();

  function handleTileClick() {
    if (
      PlayerTurn === CurrentPlayerID &&
      position !== "opponent" &&
      position !== "currentPlayerStacker" &&
      position !== "currentPlayerPenalty" &&
      !unavailable
    ) {
      setChosenTileColor(color);
      setChosenTilePosition(position);
    }
  }
  let shadow = TileProperties.shadow.standard;
  let FPT;
  let tileSize = {
    width: TileProperties.size.standard,
    border: TileProperties.borderRadius.standard,
  };
  let TileColor = findColor(color, true);
  if (small) {
    tileSize.width = TileProperties.size.small;
    tileSize.border = TileProperties.borderRadius.small;
    shadow = TileProperties.shadow.smallTile;
  }
  if (unavailable) {
    TileColor = findColor(color, false);
    shadow = TileProperties.shadow.greyedOut;
  }
  if (color === "FPT") {
    FPT = "1";
  }
  if (
    chosenTilePosition === position &&
    (chosenTileColor === color ||
      (color === "FPT" && position === "remaining")) &&
    position !== "opponent" &&
    position !== "currentPlayerStacker" &&
    position !== "currentPlayerPenalty" &&
    !unavailable
  ) {
    shadow = TileProperties.shadow.highlighted;
  }
  function handleTileHover() {
    setHoveredTileColor(color);
    setHoveredTilePosition(position);
    if (
      chosenTileColor !== color &&
      chosenTilePosition !== position &&
      hoveredTileColor === color &&
      hoveredTilePosition === position &&
      position !== "opponent" &&
      position !== "currentPlayerStacker" &&
      position !== "currentPlayerPenalty" &&
      PlayerTurn === CurrentPlayerID
    ) {
      shadow = TileProperties.shadow.hovered;
    }
  }
  function handleTileLeave() {
    setHoveredTileColor("");
    setHoveredTilePosition("");
    if (chosenTileColor === color && chosenTilePosition === position) {
      shadow = TileProperties.shadow.highlighted;
    } else {
      shadow = TileProperties.shadow.standard;
    }
  }

  return (
    <div
      className="tile"
      style={{
        backgroundColor: TileColor,
        width: tileSize.width,
        height: tileSize.width,
        borderRadius: tileSize.border,
        boxShadow: shadow,
      }}
      onClick={handleTileClick}
      onMouseEnter={handleTileHover}
      onMouseLeave={handleTileLeave}
    >
      <p>{FPT}</p>
    </div>
  );
}

function RemainingBoard() {
  const remaining = useRemaining();
  return (
    <div className="remaining-board">
      {Object.entries(remaining).map(([color, count]) => (
        <>
          {Array.from({ length: count }).map(() => (
            <Tile color={color} position="remaining" />
          ))}
        </>
      ))}
    </div>
  );
}

interface IPlayerStackerRow {
  row: any;
  stackerIndex: number;
}

function PlayerStackerRow({ row, stackerIndex }: IPlayerStackerRow) {
  function handleClick() {
    const chosenTileColor = useChosenTileColor();
    const chosenTilePosition = useChosenTilePosition();
    const from = chosenTilePosition.replace(/[0-9]/g, "");
    const which = Number(chosenTilePosition.replace(/^\D+/g, ""));
    const currentPlayerID = useCurrentPlayerID();
    let data;
    if (from === "trader") {
      data = {
        from: from,
        what: chosenTileColor,
        who: currentPlayerID,
        where: stackerIndex,
        which: which,
      };
    } else if (from === "remaining") {
      data = {
        from: from,
        what: chosenTileColor,
        who: currentPlayerID,
        where: stackerIndex,
      };
    }
    if (
      chosenTileColor !== "" &&
      chosenTileColor !== "FPT" &&
      chosenTilePosition !== ""
    ) {
      axios.post("http://localhost:8000/PlayersTurn", data).then((response) => {
        const updatedGameState = response.data as GameState;
      });
    }
  }

  return (
    <div className="currentPlayer-stacker-row" onClick={handleClick}>
      {Array.from({ length: row.quantity }).map(() => (
        <Tile color={row.color} position={"currentPlayerStacker"} />
      ))}
    </div>
  );
}

function TradersBoard() {
  const traders = useTraders();
  return (
    <div className="traders-board">
      {traders.map((trader, index) => (
        <div className="trader" id={"trader" + index}>
          <div className="inside-of-trader">
            {trader.map((traderColor) => (
              <Tile color={traderColor} position={"trader" + index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CurrentPlayerBoard() {
  const players = usePlayers();
  const currentPlayerID = useCurrentPlayerID();
  const currentPlayer = players.find((player) => player.id === currentPlayerID);

  return (
    <div className="currentPlayer">
      <div className="currentPlayer-info">
        <div className="currentPlayer-name">
          <p>{currentPlayer?.name}</p>
        </div>
        <div className="currentPlayer-score">
          <p>score: {currentPlayer?.score}</p>
        </div>
      </div>
      <div className="currentPlayer-boards">
        <div className="currentPlayer-stackerBoard">
          {currentPlayer?.board.stackerRows.map((row, index) => (
            <PlayerStackerRow row={row} stackerIndex={index} />
          ))}
        </div>
        <div className="currentPlayer-mainBoard">
          {currentPlayer?.board.mainRows.map((row, index) => (
            <div className="currentPlayer-mainRow">
              {Object.entries(row).map((properties) => (
                <Tile
                  color={properties[0]}
                  unavailable={!properties[1]}
                  position={"currentPlayerMain" + index}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="currentPlayer-penalty">
        {currentPlayer?.board.penaltyBoard.map((tileColor) => (
          <Tile color={tileColor} position="currentPlayerPenalty" />
        ))}
      </div>
    </div>
  );
}

function OpponentsBoards() {
  const players = usePlayers();
  const currentPlayerID = useCurrentPlayerID();
  const opponents = players.filter((player) => player.id !== currentPlayerID);
  return (
    <div className="opponents">
      {opponents.map((opponent) => (
        <div className="opponent">
          <div className="opponent-info">
            <div className="opponent-name">
              <p>{opponent.name}</p>
            </div>
            <div className="opponent-score">
              <p>score: {opponent.score}</p>
            </div>
          </div>
          <div className="opponent-boards">
            <div className="opponent-stackerBoard">
              {opponent.board.stackerRows.map((row, index) => (
                <div className="opponents-stacker-row">
                  {Array.from({ length: row.quantity }).map(() => (
                    <Tile color={row.color} small position="opponent" />
                  ))}
                </div>
              ))}
            </div>
            <div className="opponent-mainBoard">
              {opponent.board.mainRows.map((row, index) => (
                <div className="opponent-mainRow">
                  {Object.entries(row).map((properties) => (
                    <Tile
                      color={properties[0]}
                      unavailable={!properties[1]}
                      small
                      position="opponent"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="opponent-penalty">
            {opponent.board.penaltyBoard.map((tileColor) => (
              <Tile color={tileColor} small position="opponent" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ConnectPage() {
  const [typedServerHost, setTypedServerHost] = React.useState("");
  const handleTypedServerHost = (event: any) => {
    setTypedServerHost(event.target.value);
  };

  const [typedName, setTypedName] = React.useState("");
  const handleTypedName = (event: any) => {
    setTypedName(event.target.value);
  };

  const setHost = useSetHost();
  setHost(typedServerHost);

  function connectToServer() {
    axios.post(typedServerHost);
  }

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={handleTypedServerHost}
        defaultValue="localhost"
      />
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={handleTypedName}
      />
      <Button variant="contained">Connect</Button>
    </div>
  );
}

function WaitingForStart() {
  const players = usePlayers();
  const readyPlayers = useReadyPlayers();
  const serverHost = useHost();

  function readyThePlayer() {
    axios.post(serverHost);
  }

  return (
    <div>
      <p>Connected to server</p>
      <div>
        <p>Waiting for other players...</p>
      </div>
      <p>
        {readyPlayers}/{players.length}
      </p>
      <Button variant="contained">Ready!</Button>
    </div>
  );
}

function MenuPage({ children }: PropsWithChildren<Props>) {
  return (
    <div className="Wrapper">
      <div className="menu-page">{children}</div>
    </div>
  );
}

function TopPanel() {
  const whoseTurn = usePlayerTurn();
  const players = usePlayers();
  const activePlayer = players.find((player) => player.id === whoseTurn);
  const whoseTurnName = activePlayer?.name;

  return (
    <div className="top-panel">
      <div className="turn-indicator">
        <p>{whoseTurnName}'s turn</p>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game-page">
      <TopPanel />
      <OpponentsBoards />
      <div className="main-game">
        <CurrentPlayerBoard />
        <RemainingBoard />
        <TradersBoard />
      </div>
    </div>
  );
}

export function ShowGame() {
  const phase = useGamePhase();
  switch (phase) {
    case "not-connected":
      return (
        <MenuPage>
          <ConnectPage />
        </MenuPage>
      );
    case "waiting-for-players":
      return (
        <MenuPage>
          <WaitingForStart />
        </MenuPage>
      );
    case "game-started":
      return <Game />;
  }
}
