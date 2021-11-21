import { useEffect, useRef } from "react";
import setScene from "./threeJsLib/setScene";

function App() {
  const rendererRef = useRef();

  useEffect(() => {
    const { domElement, onResize } = setScene();
    rendererRef.current.appendChild(domElement);

    // resize;
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      domElement.remove();
    };
  }, []);

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
      <div
        ref={rendererRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      ></div>
    </>
  );
}

export default App;
