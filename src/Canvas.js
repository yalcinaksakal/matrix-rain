import { useEffect, useRef } from "react";
import setScene from "./threeJsLib/setScene";

function Canvas() {
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
  );
}

export default Canvas;
