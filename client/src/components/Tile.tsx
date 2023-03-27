import { hslToRgb } from "@mui/material";
import { MouseEventHandler } from "react";
import { useState } from "react";

export function Tile(color: string) {
  const [border, setBorder] = useState("0px");

  let greyedColor;
  let liveColor: string;

  switch (color) {
    case "red":
      greyedColor = "rgba(166, 121, 114, 65)";
      liveColor = "rgba(166, 22, 0, 65)";
      break;
    case "blue":
      greyedColor = "rgba(163, 169, 204, 80)";
      liveColor = "rgba(61, 83, 204, 80)";
      break;
    case "white":
      greyedColor = "rgba(196, 203, 204, 80)";
      liveColor = "rgba(245, 254, 255, 100)";
      break;
    case "yellow":
      greyedColor = "rgba(255, 246, 181, 100)";
      liveColor = "rgba(255, 232, 59, 100)";
      break;
    case "black":
      greyedColor = "rgba(97, 97, 97, 38)";
      liveColor = "rgba(0, 0, 0, 100)";
      break;
  }

  const [tileColor, setTileColor] = useState(greyedColor);

  function HandleClick() {
    setTileColor(liveColor);
  }

  return (
    <div
      style={{
        backgroundColor: tileColor,
        width: "50px",
        height: "50px",
        borderRadius: "8px",
        border: border,
      }}
      onClick={HandleClick}
    ></div>
  );
}
