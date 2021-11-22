import { FontLoader } from "three/src/loaders/FontLoader.js";
import { TextGeometry } from "three/src/geometries/TextGeometry";
import { Mesh, MeshBasicMaterial } from "three";
import { numOfLetters } from "./matrix";

const letters = "a b c d e f g h i j k l m n o p q r s t u v w y z".split(" ");
let font;

export const loadFont = onLoad => {
  const loader = new FontLoader();
  loader.load("helvetiker_regular.typeface.json", function (f) {
    font = f;
    onLoad();
  });
};

const getLetter = (x, y, z, opacity = 1) => {
  const char = letters[Math.floor(Math.random() * 25)];

  const geometry = new TextGeometry(char, {
    font: font,
    size: 2,
    height: 0.5,
  });
  const letter = new Mesh(
    geometry,
    new MeshBasicMaterial({
      color: "#1fff0f",
      transparent: true,
      opacity,
    })
  );
  letter.position.set(x, y - numOfLetters * opacity, z);

  return letter;
};

export default getLetter;
