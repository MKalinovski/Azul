import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainBoard from "./components/MainBoard";
import StackerBoard from "./components/StackerBoard";

function App() {
  return (
    <div className="App">
      <div className="Board">
        <StackerBoard />
        <MainBoard />
      </div>
    </div>
  );
}

export default App;
