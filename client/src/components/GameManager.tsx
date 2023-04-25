import React, { PropsWithChildren } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TileProperties, findColor, findImage } from "../styles/TileStyle";
import axios from "axios";
import "../styles/GameStyle.css";
import { transcode } from "buffer";

function useInterval(callback: () => void, delay: number) {
  React.useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

export type Color = "red" | "blue" | "white" | "black" | "yellow";
const FPT = "FPT";
type PenaltyColor = Color | typeof FPT;
type Trader = Color[];

interface TileProps {
  color: string;
  unavailable?: boolean;
  small?: boolean;
  position: string;
}

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

type GameState = {
  players: Player[];
  board: GameBoard;
  turn: number;
  round: number;
  playerTurn: number;
  winner: number;
  readyPlayers: number;
  gamePhase: string;
};

interface IGameState {
  state: GameState;
  setState: (state: GameState) => void;
}

function newGameState(): IGameState {
  return {
    state: {
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
      gamePhase: "not-connected",
    },
    setState: () => {},
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
  const [state, setState] = React.useState(newGameState().state);
  const [host, setHost] = React.useState("http://localhost:8000");
  const [currentPlayerID, setCurrentPlayerID] = React.useState(0);
  const [chosenTileColor, setChosenTileColor] = React.useState("");
  const [chosenTilePosition, setChosenTilePosition] = React.useState("");
  const [hoveredTileColor, setHoveredTileColor] = React.useState("");
  const [hoveredTilePosition, setHoveredTilePosition] = React.useState("");
  const UpdateGameAddress = host + "/UpdateGame";

  function updateGameState() {
    axios.post(UpdateGameAddress).then((res) => {
      const response = res.data as IConnectPageResponse;
      if (response.success) {
        setState(response.data);
        if (response.data.gamePhase === "game-finished") {
          const winner = state.players.find(
            (player) => player.id === state.winner
          );
          alert(
            "Game over!" +
              <br /> +
              <br /> +
              "The winner is..." +
              <br /> +
              winner?.name +
              "!!!"
          );
        }
      }
    });
  }

  useInterval(updateGameState, 3000);

  return (
    <CurrentPlayerIDContext.Provider
      value={{ currentPlayerID, setCurrentPlayerID }}
    >
      <ConnectionInfoContext.Provider value={{ host, setHost }}>
        <GameStateContext.Provider value={{ state, setState }}>
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
  return gameState.state.board.remaining;
}

function useTraders() {
  const gameState = React.useContext(GameStateContext);
  return gameState.state.board.traders;
}

function usePlayers() {
  const gameState = React.useContext(GameStateContext);
  return gameState.state.players;
}

function useReadyPlayers() {
  const gameState = React.useContext(GameStateContext);
  return gameState.state.readyPlayers;
}

function useGamePhase() {
  const gamePhase = React.useContext(GameStateContext);
  return gamePhase.state.gamePhase;
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
  return gameState.state.playerTurn;
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

function useSetGameState() {
  const gameState = React.useContext(GameStateContext);
  return gameState.setState;
}

function useGameState() {
  const gameState = React.useContext(GameStateContext);
  return gameState.state;
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
      position !== "currentPlayerMain" &&
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
  let tileColor = findColor(color, true);
  let tileImage = findImage(color, true);
  let transform;

  if (small) {
    tileSize.width = TileProperties.size.small;
    tileSize.border = TileProperties.borderRadius.small;
    shadow = TileProperties.shadow.smallTile;
  }
  if (unavailable) {
    tileColor = findColor(color, false);
    tileImage = findImage(color, false);
    shadow = TileProperties.shadow.greyedOut;
  }
  if (
    hoveredTileColor === color &&
    hoveredTilePosition === position &&
    position !== "opponent" &&
    position !== "currentPlayerStacker" &&
    position !== "currentPlayerPenalty" &&
    position !== "currentPlayerMain" &&
    PlayerTurn === CurrentPlayerID
  ) {
    shadow = TileProperties.shadow.hovered;
  }
  if (
    chosenTilePosition === position &&
    (chosenTileColor === color ||
      (color === "FPT" && position === "remaining")) &&
    position !== "opponent" &&
    position !== "currentPlayerStacker" &&
    position !== "currentPlayerPenalty" &&
    position !== "currentPlayerMain" &&
    !unavailable
  ) {
    shadow = TileProperties.shadow.highlighted;
  }

  function handleTileHover() {
    if (
      PlayerTurn === CurrentPlayerID &&
      position !== "opponent" &&
      position !== "currentPlayerStacker" &&
      position !== "currentPlayerPenalty" &&
      position !== "currentPlayerMain" &&
      !unavailable
    ) {
      setHoveredTileColor(color);
      setHoveredTilePosition(position);
    }
  }
  function handleTileLeave() {
    if (
      PlayerTurn === CurrentPlayerID &&
      position !== "opponent" &&
      position !== "currentPlayerStacker" &&
      position !== "currentPlayerPenalty" &&
      position !== "currentPlayerMain" &&
      !unavailable
    ) {
      setHoveredTileColor("");
      setHoveredTilePosition("");
      if (chosenTileColor === color && chosenTilePosition === position) {
        shadow = TileProperties.shadow.highlighted;
      } else {
        shadow = TileProperties.shadow.standard;
      }
    }
  }

  return (
    <div
      className="tile"
      style={{
        backgroundImage: tileImage,
        backgroundColor: tileColor,
        width: tileSize.width,
        height: tileSize.width,
        borderRadius: tileSize.border,
        boxShadow: shadow,
        transform: transform,
      }}
      onClick={handleTileClick}
      onMouseEnter={handleTileHover}
      onMouseLeave={handleTileLeave}
    ></div>
  );
}

function RemainingBoard() {
  const remaining = useRemaining();
  return (
    <div className="remaining-board">
      {Object.entries(remaining).map(([color, count], remindex) => (
        <div className="remaining-column" key={"remaining-board" + remindex}>
          <>
            {Array.from({ length: count }).map((x, index) => (
              <Tile
                color={color}
                position="remaining"
                key={
                  "currentplayer-remainingboard-" + remindex + "tile" + index
                }
              />
            ))}
          </>
        </div>
      ))}
    </div>
  );
}

interface IPlayerStackerRow {
  row: any;
  stackerIndex: number;
}

interface IPlayersTurnResponse {
  data: GameState;
}

function PlayerStackerRow({ row, stackerIndex }: IPlayerStackerRow) {
  const chosenTileColor = useChosenTileColor();
  const chosenTilePosition = useChosenTilePosition();
  const setChosenTileColor = useSetChosenTileColor();
  const setChosenTilePosition = useSetChosenTilePosition();
  const from = chosenTilePosition.replace(/[0-9]/g, "");
  const which = Number(chosenTilePosition.replace(/^\D+/g, ""));
  const currentPlayerID = useCurrentPlayerID();
  const setGameState = useSetGameState();
  const host = useHost();
  const playerTurnAddress = host + "/PlayersTurn";
  function handleClick() {
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
      axios.post(playerTurnAddress, data).then((res) => {
        const response = res.data as IPlayersTurnResponse;
        const updatedGameState = response.data;
        setGameState(updatedGameState);
        setChosenTileColor("");
        setChosenTilePosition("");
      });
    }
  }

  return (
    <div className="currentPlayer-stacker-row" onClick={handleClick}>
      {Array.from({ length: row.quantity }).map((color, index) => (
        <Tile
          color={row.color}
          position={"currentPlayerStacker"}
          key={"currentplayer-" + "stackerrow" + "tile" + index}
        />
      ))}
    </div>
  );
}

function TradersBoard() {
  const traders = useTraders();
  return (
    <div className="traders-board">
      {traders.map((trader, traderID) => (
        <div
          className="trader"
          id={"trader" + traderID}
          key={"trader" + traderID}
        >
          <div className="inside-of-trader">
            {trader.map((traderColor, index) => (
              <Tile
                color={traderColor}
                position={"trader" + traderID}
                key={"trader" + traderID + "tile" + index}
              />
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
  const chosenTileColor = useChosenTileColor();
  const chosenTilePosition = useChosenTilePosition();
  const from = chosenTilePosition.replace(/[0-9]/g, "");
  const which = Number(chosenTilePosition.replace(/^\D+/g, ""));
  const host = useHost();
  const setGameState = useSetGameState();
  const playerTurnAddress = host + "/PlayersTurn";
  const setChosenTileColor = useSetChosenTileColor();
  const setChosenTilePosition = useSetChosenTilePosition();
  function handleClick() {
    let data;
    if (from === "trader") {
      data = {
        from: from,
        what: chosenTileColor,
        who: currentPlayerID,
        where: 5,
        which: which,
      };
    } else if (from === "remaining") {
      data = {
        from: from,
        what: chosenTileColor,
        who: currentPlayerID,
        where: 5,
      };
    }
    if (
      chosenTileColor !== "" &&
      chosenTileColor !== "FPT" &&
      chosenTilePosition !== ""
    ) {
      axios.post(playerTurnAddress, data).then((res) => {
        const response = res.data as IPlayersTurnResponse;
        const updatedGameState = response.data;
        setGameState(updatedGameState);
        setChosenTileColor("");
        setChosenTilePosition("");
      });
    }
  }

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
            <PlayerStackerRow
              row={row}
              stackerIndex={index}
              key={"currentplayer-stackerrow" + index}
            />
          ))}
        </div>
        <div className="currentPlayer-mainBoard">
          {currentPlayer?.board.mainRows.map((row, mainrowID) => (
            <div
              className="currentPlayer-mainRow"
              key={"currentplayer-mainrow" + mainrowID}
            >
              {Object.entries(row).map((properties, index) => (
                <Tile
                  color={properties[0]}
                  unavailable={!properties[1]}
                  position={"currentPlayerMain"}
                  key={"currentplayer-mainrow" + mainrowID + "tile" + index}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="currentPlayer-penalty" onClick={handleClick}>
        {currentPlayer?.board.penaltyBoard.map((tileColor, index) => (
          <Tile
            color={tileColor}
            position="currentPlayerPenalty"
            key={"currentplayer-" + "penalty-" + "tile" + index}
          />
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
        <div className="opponent" key={opponent.id}>
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
              {opponent.board.stackerRows.map((row, stackerID) => (
                <div
                  className="opponents-stacker-row"
                  key={"opponent" + opponent.id + "stacker-row" + stackerID}
                >
                  {Array.from({ length: row.quantity }).map((color, index) => (
                    <Tile
                      color={row.color}
                      small
                      position="opponent"
                      key={
                        "opponent" +
                        opponent.id +
                        "stacker-row" +
                        stackerID +
                        "tile" +
                        index
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="opponent-mainBoard">
              {opponent.board.mainRows.map((row, mainrowID) => (
                <div
                  className="opponent-mainRow"
                  key={"opponent" + opponent.id + "main-row" + mainrowID}
                >
                  {Object.entries(row).map((properties, index) => (
                    <Tile
                      color={properties[0]}
                      unavailable={!properties[1]}
                      small
                      position="opponent"
                      key={
                        "opponent" +
                        opponent.id +
                        "main-row" +
                        mainrowID +
                        "tile" +
                        index
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="opponent-penalty">
            {opponent.board.penaltyBoard.map((tileColor, index) => (
              <Tile
                color={tileColor}
                small
                position="opponent"
                key={"opponent" + opponent.id + "penaltytile" + index}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type PageType = "not-connected" | "waiting-for-players" | "game-started";

interface PageProps {
  page: PageType;
  setPage: (page: PageType) => void;
}

interface IConnectPageResponse {
  success: boolean;
  data: GameState;
}

function ConnectPage({ setPage }: PageProps, page: PageType) {
  const [typedServerHost, setTypedServerHost] = React.useState(
    "http://localhost:8000"
  );
  const handleTypedServerHost = (event: any) => {
    setTypedServerHost(event.target.value);
  };

  const [typedName, setTypedName] = React.useState("");
  const handleTypedName = (event: any) => {
    setTypedName(event.target.value);
  };

  const setGameState = useSetGameState();

  const setHost = useSetHost();
  setHost(typedServerHost);
  const setCurrentPlayerID = useSetCurrentPlayerID();

  function connectToServer() {
    const data = {
      name: typedName,
    };
    const NewPlayer = typedServerHost + "/NewPlayer";
    axios.post(NewPlayer, data).then((res) => {
      const response = res.data as IConnectPageResponse;
      if (response.success) {
        const currentPlayerID = response.data.players.length - 1;
        console.log(currentPlayerID);
        setCurrentPlayerID(currentPlayerID);
        setPage("waiting-for-players");
        setGameState(response.data);
        console.log(page);
      } else {
        alert("connection failed");
      }
    });
  }

  return (
    <div className="connect-page">
      <div className="logo" />
      <TextField
        id="outlined-basic"
        label="Server"
        variant="outlined"
        onChange={handleTypedServerHost}
        defaultValue="http://localhost:8000"
      />
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={handleTypedName}
      />
      <Button variant="contained" onClick={connectToServer}>
        Connect
      </Button>
    </div>
  );
}

function WaitingForStart({ setPage }: PageProps) {
  const [ready, setReady] = React.useState(false);
  const players = usePlayers();
  const readyPlayers = useReadyPlayers();
  const serverHost = useHost();
  const setGameState = useSetGameState();
  const StartTheGameAddress = serverHost + "/StartGame";
  const gamePhase = useGamePhase();

  function readyThePlayer() {
    if (!ready) {
      setReady(true);
      axios.post(StartTheGameAddress).then((res) => {
        const response = res.data as IConnectPageResponse;
        if (response.success) {
          setGameState(response.data);
          setPage("game-started");
        } else {
          setGameState(response.data);
        }
      });
    } else {
      return;
    }
  }

  if (gamePhase === "game-started") {
    setPage("game-started");
  }

  return (
    <div>
      <div className="logo" />
      <p>Connected to server</p>
      <div>
        <p>Waiting for other players...</p>
      </div>
      <p>
        {readyPlayers}/{players.length}
      </p>
      <Button variant="contained" onClick={readyThePlayer}>
        Ready!
      </Button>
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
  const [page, setPage] = React.useState("not-connected");

  const renderPage = () => {
    switch (page) {
      case "not-connected":
        return (
          <MenuPage>
            <ConnectPage setPage={setPage} page={page} />
          </MenuPage>
        );
      case "waiting-for-players":
        return (
          <MenuPage>
            <WaitingForStart setPage={setPage} page={page} />
          </MenuPage>
        );
      case "game-started":
        return <Game />;
    }
  };
  return <div>{renderPage()}</div>;
}
