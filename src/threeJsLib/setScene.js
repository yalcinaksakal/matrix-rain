import { FogExp2, PositionalAudio, Scene, AudioListener } from "three";
import Matrix, { getRandomLoc } from "../matrix/matrix";
import { loadFont } from "../matrix/matrixLetter";
import soundLoader from "../sounds/soundLoader";

import myCam from "./camera";
// import cloudLoader from "./cloudGLTF";
import createClouds from "./clouds";
// import cloudLoader from "./cloudsGLTF";
import createPlane from "./createPlaneAndBoxes";
import lightningLoader from "./lightningGLTF";
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
  scene.fog = new FogExp2(0x11111f, 0.0015);
  renderer.setClearColor(scene.fog.color);

  //bg
  // scene.background = new Color(0x11111f);
  // scene.background = new CubeTextureLoader().load([
  //   "skybox/right.png",
  //   "skybox/left.png",

  //   "skybox/top.png",
  //   "skybox/bottom.png",

  //   "skybox/front.png",
  //   "skybox/back.png",
  // ]);

  //lights
  let moon;
  const lights = createLights(m => {
    scene.add(m);
    moon = m;
  });
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

  //clouds

  // let clouds, cloudsDir;
  // const onCloudsReady = (c, cD) => {
  //   clouds = c;
  //   cloudsDir = cD;
  //   scene.add(clouds);
  //   animate();
  // };
  // cloudLoader(onCloudsReady);
  //sounds
  let listener;
  let thunderSound;
  const addSoundToObj = (buffer, isLooping, type, distanceRef = 500) => {
    const audio = new PositionalAudio(listener);
    audio.setBuffer(buffer);
    audio.setRefDistance(distanceRef);
    // audio.setVolume(0.5);
    audio.loop = isLooping;
    if (type === "t") thunderSound = audio;
    else {
      plane.add(audio);
      audio.play();
    }
  };

  const startSound = () => {
    listener = new AudioListener();
    camera.add(listener);
    soundLoader(addSoundToObj, "thunder.mp3");
    soundLoader(addSoundToObj, "rain.mp3");
  };

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  //font load
  let isFontLoaded = false;
  loadFont(() => (isFontLoaded = true));

  //lightning
  let lightning;
  lightningLoader(l => {
    lightning = l;
    scene.add(lightning);
  });
  //animate
  let temp, x, z, matrix;

  const numOfMatrix = 10;
  let shakeMoon = false;
  const animate = () => {
    if (isFontLoaded) {
      matrix = [];
      for (let i = 0; i < numOfMatrix; i++) {
        matrix.push(new Matrix(...getRandomLoc()));
        scene.add(...matrix[i].letters);
      }
      isFontLoaded = false;
    }
    if (shakeMoon && moon) {
      moon.position.set(
        -window.innerWidth / 3 + Math.random() * 6 - 3,
        140 + Math.random() * 6 - 3,
        Math.random() * 6 - 3
      );
      moon.intensity = 0;
    }

    if (matrix)
      for (let i = 0; i < numOfMatrix; i++)
        if (!matrix[i].move()) matrix[i].setXZ();

    if (isSound) {
      startSound();
      isSound = false;
    }
    clouds.children.forEach((cloud, index) => {
      cloud.rotation.z += (cloudsDir[index] * Math.random()) / 50;
    });
    //thunders
    if (Math.random() > 0.93 && !thunderSound?.isPlaying) {
      x = Math.random() * 500 - 250;
      z = Math.random() * 400 - 200;
      lights.flash.position.set(x, 60, z);
      temp = Math.random() * 50;
      lights.flash.power = temp > 45 ? temp + 450 : temp;

      if (thunderSound && lights.flash.power > 50) {
        setTimeout(() => {
          lights.flash.power = 300;
        }, 300);
        setTimeout(() => {
          lights.flash.power = 40;
        }, 700);
        if (lightning) {
          for (let i = 0; i < numOfMatrix; i++) {
            matrix[i].setXZ(
              x + Math.random() * 30 - 15,
              z + Math.random() * 30 - 15
            );
          }
          shakeMoon = true;
          lightning.position.set(x, 0, z);
          lightning.rotateY(Math.PI / (Math.random() * 10));
          lightning.visible = true;

          setTimeout(() => {
            lightning.visible = false;
            shakeMoon = false;
            if (moon) {
              moon.position.set(-window.innerWidth / 3, 140, 0);
              moon.intensity = 100;
            }
          }, 700);
        }
        thunderSound.play();
      }
    }
    //rain
    rain();
    rainDrops.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  };

  //init
  const [clouds, cloudsDir] = createClouds(animate);
  scene.add(clouds);
  return { domElement, onResize, startSound };
};

export default setScene;
