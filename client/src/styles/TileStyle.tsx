export const TileProperties = {
  color: {
    live: {
      red: "rgb(179, 0, 0)",
      yellow: "rgb(255, 230, 153)",
      blue: "rgb(51, 153, 255)",
      white: "rgb(237, 247, 247)",
      black: "rgb(64, 64, 64)",
      FPT: "rgb(198, 236, 236)",
    },
    greyedOut: {
      red: "rgb(236, 223, 223)",
      yellow: "rgb(237, 233, 222)",
      blue: "rgb(207, 216, 226)",
      white: "rgb(241, 244, 244)",
      black: "rgb(191, 191, 191)",
    },
  },
  shadow: {
    smallTile:
      "inset 1px 1px 0px 2px rgba(255, 255, 255, 0.50), inset -1px -1px 0px 2px rgba(0, 0, 0, 0.50)",
    standard:
      "inset 2px 2px 0px 3px rgba(255, 255, 255, 0.50), inset -2px -2px 0px 3px rgba(0, 0, 0, 0.50)",
    highlighted:
      "0px 0px 3px 3px rgba(0, 181, 18, 0.70), inset 2px 2px 0px 3px rgba(255, 255, 255, 0.57), inset -2px -2px 0px 3px rgba(0, 0, 0, 0.50)",
    greyedOut: "",
    hovered:
      "0px 0px 3px 3px rgba(0, 18, 181, 0.70), inset 2px 2px 0px 3px rgba(255, 255, 255, 0.57), inset -2px -2px 0px 3px rgba(0, 0, 0, 0.50)",
  },
  size: {
    standard: "50px",
    small: "25px",
  },
  borderRadius: {
    standard: "8px",
    small: "4px",
  },
};

export function findColor(color: string, live: boolean) {
  if (live) {
    switch (color) {
      case "red":
        return TileProperties.color.live.red;
      case "yellow":
        return TileProperties.color.live.yellow;
      case "blue":
        return TileProperties.color.live.blue;
      case "white":
        return TileProperties.color.live.white;
      case "black":
        return TileProperties.color.live.black;
      case "FPT":
        return TileProperties.color.live.FPT;
    }
  } else {
    switch (color) {
      case "red":
        return TileProperties.color.greyedOut.red;
      case "yellow":
        return TileProperties.color.greyedOut.yellow;
      case "blue":
        return TileProperties.color.greyedOut.blue;
      case "white":
        return TileProperties.color.greyedOut.white;
      case "black":
        return TileProperties.color.greyedOut.black;
    }
  }
}
