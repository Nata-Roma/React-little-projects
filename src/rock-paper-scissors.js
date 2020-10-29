import React, { useEffect, useState } from "react";

const RockPaperScissors = () => {
  const choices = [
    { id: 1, name: "rock", loseTo: 2 },
    { id: 2, name: "paper", loseTo: 3 },
    { id: 3, name: "scissors", loseTo: 1 }
  ];
  const [choiceUser, setChoiceUser] = useState(null);
  const [choiceComp, setChoiceComp] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameState, setGameState] = useState(null);
  const [bgColor, setBgColor] = useState(null);

  function choiceClick(choiceNum) {
    const choiceName = choices.find((c) => c.id === choiceNum);
    setChoiceUser(choiceName);
    setGameState("win");

    if (choiceName.loseTo === choiceComp.id) {
      setGameState("lose");
      setLosses((losses) => losses + 1);
      setBgColor("rgba(200, 0, 255, 0.7)");
    } else if (choiceComp.loseTo === choiceName.id) {
      setGameState("win");
      setWins((wins) => wins + 1);
      setBgColor("rgba(255, 0, 70, 0.7)");
    } else if (choiceName.id === choiceComp.id) {
      setGameState("draw");
      setBgColor("rgba(150, 255, 200, 0.7)");
    }
  }

  useEffect(() => {
    const choiceByComp = choices[Math.floor(Math.random() * choices.length)];
    setChoiceComp(choiceByComp);
  }, []);

  function playAgain() {
    const choiceByComp = choices[Math.floor(Math.random() * choices.length)];
    setChoiceComp(choiceByComp);
    setChoiceUser(null);
    setGameState(null);
    setBgColor(null);
  }

  return (
    <div className="choice-game">
      <div className="choice-header">
        <div className="choice-title">Rock, Paper, Scissors</div>
        <div className="choice-wins">
          <span>{wins}</span> {wins === 1 ? "Win" : "Wins"}
        </div>
        <div className="choice-losses">
          <span>{losses}</span> {losses === 1 ? "Loss" : "Losses"}
        </div>
      </div>
      {gameState && (
        <div className="popup">
          <div className="popup-info" style={{ backgroundColor: bgColor }}>
            <div className="popup-text">
              <p className="button-item">{choiceUser.name}</p>
              <p className="game-state">{gameState}</p>
              <p className="comp-choice">{choiceComp.name}</p>
            </div>
            <button className="play-again" onClick={() => playAgain()}>
              Play again
            </button>
          </div>
        </div>
      )}
      <div className="choice-items">
        <p>Your choice</p>
        <div className="button-choice">
          <button className="button-item" onClick={() => choiceClick(1)}>
            Rock
          </button>
          <button className="button-item" onClick={() => choiceClick(2)}>
            Paper
          </button>
          <button className="button-item" onClick={() => choiceClick(3)}>
            Scissors
          </button>
        </div>
        <p>Computer's choice</p>
        <div className="comp-choice">?</div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
