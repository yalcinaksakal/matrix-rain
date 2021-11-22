import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const setOrbitControls = (cam, el) => {
  const controls = new OrbitControls(cam, el);
  controls.target.set(0, 20, 0);
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 0.2;
  controls.enableDamping = true;
  controls.enablePan = false;
  //horizantal
  controls.maxAzimuthAngle = Math.PI / 60;
  controls.minAzimuthAngle = -Math.PI / 60;
  //vertical
  controls.maxPolarAngle = Math.PI;
  controls.minPolarAngle = (Math.PI * 5) / 12;
  //zoom
  controls.maxDistance = 1000;
  controls.minDistance = 300;
  return controls;
};

export default setOrbitControls;
