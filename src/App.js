import React from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

import "./styles.css";
import TimerGame from "./timer";
import RockPaperScissors from "./rock-paper-scissors";
import CanvasMoves from "./canvas-move";
import WebSpeech from "./web-speech";
import CalendarPicker from "./calendar-picker";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <div className="tab">
            <NavLink to="/" className="link" exact>
              TALK <br />
              THE SPEECH
            </NavLink>
          </div>
          <div className="tab">
            <NavLink to="/timer" className="link">
              TIMER
            </NavLink>
          </div>
          <div className="tab">
            <NavLink to="/rps" className="link">
              ROCK, PAPER, <br />
              SCISSORS
            </NavLink>
          </div>
          <div className="tab">
            <NavLink to="/canvas" className="link">
              CANVAS
            </NavLink>
          </div>
          <div className="tab">
            <NavLink to="/calendar" className="link">
              CALENDAR <br /> PICKER
            </NavLink>
          </div>
        </nav>
        <div className="viewport">
          <Switch>
            <Route path="/timer">
              <TimerGame />
            </Route>
            <Route path="/rps">
              <RockPaperScissors />
            </Route>
            <Route path="/canvas">
              <CanvasMoves />
            </Route>
            <Route path="/calendar">
              <CalendarPicker />
            </Route>
            <Route path="/">
              <WebSpeech />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
