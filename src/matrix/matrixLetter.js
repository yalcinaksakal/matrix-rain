import { FontLoader } from "three/src/loaders/FontLoader.js";
import { TextGeometry } from "three/src/geometries/TextGeometry";
import { Mesh, MeshBasicMaterial } from "three";

const letters = "a b c d e f g h i j k l m n o p q r s t u v w y z".split(" ");
let font;

export const loadFont = onLoad => {
  const loader = new FontLoader();
  loader.load("helvetiker_regular.typeface.json", function (f) {
    font = f;
    onLoad();
  });
};

const material = new MeshBasicMaterial({
  color: "#03a062",
  opacity: 1,
  transparent: true,
});

const getLetter = () => {
  const char = letters[Math.floor(Math.random() * 25)];

  const geometry = new TextGeometry(char, {
    font: font,
    size: 5,
    height: 1,
    // curveSegments: 12,
    // bevelEnabled: true,
    // bevelThickness: 10,
    // bevelSize: 8,
    // bevelOffset: 0,
    // bevelSegments: 5,
  });
  return new Mesh(geometry, material);
};

export default getLetter;
