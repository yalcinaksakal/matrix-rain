import { FogExp2, PositionalAudio, Scene, AudioListener } from "three";
import thunderLoader, { rainLoader } from "../sounds/thunder";
import myCam from "./camera";
import createClouds from "./clouds";
import createPlane from "./createPlaneAndBoxes";
import createLights from "./lights";
import createRain, { rain } from "./rain";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
export let isSound = false;
export const setIsSound = () => (isSound = true);
const setScene = () => {
  //renderer
  const renderer = createR();
  //camera
  const camera = myCam();
  //scene
  const scene = new Scene();
  //fog
  scene.fog = new FogExp2(0x11111f, 0.002);
  renderer.setClearColor(scene.fog.color);

  //bg

  // scene.background = new CubeTextureLoader().load([
  //   "skybox/right.png",
  //   "skybox/left.png",

  //   "skybox/top.png",
  //   "skybox/bottom.png",

  //   "skybox/front.png",
  //   "skybox/back.png",
  // ]);

  //lights
  const lights = createLights();
  scene.add(...Object.values(lights));

  //add a plane
  const plane = createPlane();
  scene.add(plane);

  //rain
  const rainDrops = createRain();
  scene.add(rainDrops);
  const { domElement } = renderer;

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //sounds
  let listener;
  let thunderSound;
  const addSoundToObj = (buffer, isLooping = false, distanceRef = 500) => {
    const audio = new PositionalAudio(listener);
    audio.setBuffer(buffer);
    audio.setRefDistance(distanceRef);
    // obj.add(audio);
    audio.loop = isLooping;
    thunderSound = audio;
  };

  const setThundersound = buffer => addSoundToObj(buffer);
  const startSound = () => {
    listener = new AudioListener();
    camera.add(listener);
    thunderLoader(setThundersound);
    rainLoader(b => {
      const audio = new PositionalAudio(listener);
      audio.setBuffer(b);
      audio.setRefDistance(500);
      plane.add(audio);
      audio.loop = true;
      audio.play();
    });
  };

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  //animate
  let temp;
  const animate = () => {
    if (isSound) {
      startSound();
      isSound = false;
    }
    clouds.children.forEach(cloud => {
      cloud.rotation.z += Math.random() / 300;
    });
    //thunders
    if (Math.random() > 0.93 && !thunderSound?.isPlaying) {
      lights.flash.position.set(
        Math.random() * 500 - 250,
        60,
        Math.random() * 600 - 300
      );
      temp = Math.random() * 50;
      lights.flash.power = temp > 45 ? temp + 450 : temp;
      setTimeout(() => {
        lights.flash.power = 10;
      }, 500);
      if (thunderSound && lights.flash.power > 50) thunderSound.play();
    }
    //rain
    rain();
    rainDrops.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  };

  //init
  const clouds = createClouds(animate);
  scene.add(clouds);
  return { domElement, onResize, startSound };
};

export default setScene;
