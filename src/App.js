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
        Left click (touch) to rotate
        <br />
        Zoom
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
