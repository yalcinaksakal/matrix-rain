import { FogExp2, Scene } from "three";
import myCam from "./camera";
import createClouds from "./clouds";
import createPlane from "./createPlaneAndBoxes";
import createLights from "./lights";
import createRain, { rain } from "./rain";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";

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
  scene.add(createPlane());

  //rain
  const rainDrops = createRain();
  scene.add(rainDrops);
  const { domElement } = renderer;

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  //animate

  const animate = () => {
    clouds.children.forEach(cloud => {
      cloud.rotation.z += Math.random() / 300;
    });
    //thunders
    if (Math.random() > 0.93 || lights.flash.power > 100) {
      if (lights.flash.power < 100)
        lights.flash.position.set(
          Math.random() * 500 - 250,
          40,
          Math.random() * 600 - 500
        );
      lights.flash.power = 50 + Math.random() * 500;
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
  return { domElement, onResize };
};

export default setScene;
