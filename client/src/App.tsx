import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GameManager, ShowGame } from "./components/GameManager";

function App() {
  return (
    <div className="App">
      <GameManager>{ShowGame()}</GameManager>
    </div>
  );
}

export default App;
