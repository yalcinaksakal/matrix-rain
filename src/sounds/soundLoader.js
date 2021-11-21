import { AudioLoader } from "three";

const audioLoader = new AudioLoader();

const soundLoader = (onLoad, file) => {
  // load a sound and set it as the PositionalAudio object's buffer
  audioLoader.load(file, buffer => {
    onLoad(
      buffer,
      file === "thunder.mp3" ? false : true,
      file === "thunder.mp3" ? "t" : "r"
    );
  });
};

export default soundLoader;
