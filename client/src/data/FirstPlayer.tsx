import React from "react";

// ID
const [firstID, firstIDSet] = React.useState(0);
// Name
const [firstName, firstNameSet] = React.useState("");
// Score
const [firstScore, firstScoreSet] = React.useState(0);
// Board
// Main
// Row 1
export const [firstMainRow1, firstMainRow1Set] = React.useState([
  false,
  false,
  false,
  false,
  false,
]);
// Row 2
const [firstMainRow2, firstMainRow2Set] = React.useState([
  false,
  false,
  false,
  false,
  false,
]);
// Row 3
const [firstMainRow3, firstMainRow3Set] = React.useState([
  false,
  false,
  false,
  false,
  false,
]);
// Row 4
const [firstMainRow4, firstMainRow4Set] = React.useState([
  false,
  false,
  false,
  false,
  false,
]);
// Row 5
const [firstMainRow5, firstMainRow5Set] = React.useState([
  false,
  false,
  false,
  false,
  false,
]);
// Stacker
// Row 1
const [firstStackerRow1, firstStackerRow1Set] = React.useState({
  quantity: 0,
  color: "",
});
// Row 2
const [firstStackerRow2, firstStackerRow2Set] = React.useState({
  quantity: 0,
  color: "",
});
// Row 3
const [firstStackerRow3, firstStackerRow3Set] = React.useState({
  quantity: 0,
  color: "",
});
// Row 4
const [firstStackerRow4, firstStackerRow4Set] = React.useState({
  quantity: 0,
  color: "",
});
// Row 5
const [firstStackerRow5, firstStackerRow5Set] = React.useState({
  quantity: 0,
  color: "",
});
// Penalty
const [firstPenalty, firstPenaltySet] = React.useState([]);
// FPToken
const [firstFPToken, firstFPTokenSet] = React.useState(false);
