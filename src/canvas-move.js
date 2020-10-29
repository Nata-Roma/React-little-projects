import React, { useRef, useState, useEffect } from "react";

const CanvasMoves = () => {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight - 50;

  const canvasRef = useRef(null);
  const imageDownRef = useRef(null);
  const imageUpRef = useRef(null);
  const imageLeftRef = useRef(null);
  const imageRightRef = useRef(null);
  const [direction, setDirection] = useState("Down");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.canvas.height = canvasHeight;
    context.canvas.width = canvasWidth;
    context.fillRect(x, y, 50, 50);
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    let setLinkRef;
    switch (direction) {
      case "Up":
        setLinkRef = imageUpRef;
        break;
      case "Down":
        setLinkRef = imageDownRef;
        break;
      case "Left":
        setLinkRef = imageLeftRef;
        break;
      case "Right":
        setLinkRef = imageRightRef;
        break;
      default:
        break;
    }

    // context.fillRect(x, y, 50, 50);
    context.drawImage(setLinkRef.current, x, y);
  }, [x, y]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    function keyDownHandler(e) {
      switch (e.key) {
        case "ArrowUp":
          moveDirection("Up");
          break;
        case "ArrowLeft":
          moveDirection("Left");
          break;
        case "ArrowDown":
          moveDirection("Down");
          break;
        case "ArrowRight":
          moveDirection("Right");
          break;
        default:
          break;
      }
    }

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, []);

  function moveDirection(path) {
    setDirection(path);
    switch (path) {
      case "Up":
        setY((y) => y - 20);
        break;
      case "Left":
        setX((x) => x - 20);
        break;
      case "Down":
        setY((y) => y + 20);
        break;
      case "Right":
        setX((x) => x + 20);
        break;
      default:
        break;
    }
  }

  return (
    <div className="canvas">
      <canvas ref={canvasRef} />
      <div className="buttons-move">
        <div className="buttons-upper">
          <button className="button-canvas" onClick={() => moveDirection("Up")}>
            Up
          </button>
        </div>
        <div className="buttons-lower">
          <button
            className="button-canvas"
            onClick={() => moveDirection("Left")}
          >
            Left
          </button>
          <button
            className="button-canvas"
            onClick={() => moveDirection("Down")}
          >
            Down
          </button>
          <button
            className="button-canvas"
            onClick={() => moveDirection("Right")}
          >
            Right
          </button>
        </div>
        <div style={{ display: "none" }}>
          <img
            src="https://i.imgur.com/JYUB0m3.png"
            alt="down"
            ref={imageDownRef}
          />
          <img
            src="https://i.imgur.com/XSA2Oom.gif"
            alt="up"
            ref={imageUpRef}
          />
          <img
            src="https://i.imgur.com/4LGAZ8t.gif"
            alt="left"
            ref={imageLeftRef}
          />
          <img
            src="https://i.imgur.com/GEXD7bk.gif"
            alt="right"
            ref={imageRightRef}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasMoves;
