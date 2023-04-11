import "./Wrapper.css";

export const Wrapper = () => {
  return (
    <div className={"game"}>
      <div className={"top-panel"}></div>
      <div className={"board"}>
        <div className={"left-side-board"}>
          <div className={"other-players-container"}>
            <div className={"other-player-board"}></div>
            <div className={"other-player-board"}></div>
            <div className={"other-player-board"}></div>
          </div>
          <div className={"middle-board"}></div>
          <div className={"player-board"}></div>
        </div>
        <div className={"traders-board"}>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
          <div className={"trader"}></div>
        </div>
      </div>

      <div></div>
    </div>
  );
};
