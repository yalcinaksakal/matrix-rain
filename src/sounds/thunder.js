import { AudioLoader } from "three";

const audioLoader = new AudioLoader();

const thunderLoader = onLoad => {
  // load a sound and set it as the PositionalAudio object's buffer
  audioLoader.load("thunder.mp3", buffer => {
    onLoad(buffer);
  });
};
export const rainLoader = onLoad => {
  // load a sound and set it as the PositionalAudio object's buffer
  audioLoader.load("rain.mp3", buffer => {
    onLoad(buffer);
  });
};
export default thunderLoader;
