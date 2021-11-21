import { useState } from "react";
import Canvas from "./Canvas";
import { setIsSound } from "./threeJsLib/setScene";

function App() {
  const [start, setStart] = useState(false);
  return (
    <>
      <p
        style={{
          position: "fixed",
          bottom: "0",
          left: "5px",
          color: "whitesmoke",
          fontSize: "10px",
        }}
      >
        Left click (touch) rotates.
        <br />
        Right click (two touches) pans the camera.
        <br />
        Zoom in out enabled.
      </p>
      <Canvas />
      {!start && (
        <button
          onClick={() => {
            setStart(true);
            setIsSound();
          }}
        >
          START
        </button>
      )}
    </>
  );
}

export default App;
