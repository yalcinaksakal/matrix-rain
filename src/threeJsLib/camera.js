import { PerspectiveCamera } from "three";

const myCam = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const fov = 60;
  const near = 1.0;
  const far = 1000.0;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 65, 600);
  return camera;
};

export default myCam;
