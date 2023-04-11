import { Tile } from "./Tile";
import "./MainBoard.css";
import { firstMainRow1, firstMainRow1Set } from "../data/FirstPlayer";

const MainBoard = () => {
  return (
    <div id="MainBoard">
      <div id="row">
        {Tile("blue")}
        {Tile("yellow")}
        {Tile("red")}
        {Tile("black")}
        {Tile("white")}
      </div>
      <div id="row">
        {Tile("white")}
        {Tile("blue")}
        {Tile("yellow")}§{Tile("red")}
        {Tile("black")}
      </div>
      <div id="row">
        {Tile("black")}
        {Tile("white")}
        {Tile("blue")}
        {Tile("yellow")}
        {Tile("red")}
      </div>
      <div id="row">
        {Tile("red")}
        {Tile("black")}
        {Tile("white")}
        {Tile("blue")}
        {Tile("yellow")}
      </div>
      <div id="row">
        {Tile("yellow")}
        {Tile("red")}
        {Tile("black")}
        {Tile("white")}
        {Tile("blue")}
      </div>
    </div>
  );
};

export default MainBoard;
