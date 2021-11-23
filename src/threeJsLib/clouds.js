import {
  Group,
  Mesh,
  MeshLambertMaterial,
  PlaneBufferGeometry,
  TextureLoader,
} from "three";
const NUM_OF_CLOUDS = 20;
const cloudDir = [];
const createClouds = render => {
  let loader = new TextureLoader();
  const clouds = new Group();
  loader.load("cloud.png", function (texture) {
    const cloudGeo = new PlaneBufferGeometry(300, 300);
    const cloudMaterial = new MeshLambertMaterial({
      map: texture,
      transparent: true,
      opacity: 0.5,
    });
    let cloud;
    for (let i = 0; i < NUM_OF_CLOUDS; i++) {
      cloud = new Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        (Math.random() * window.innerWidth) / 2 - window.innerWidth / 4,
        200,
        Math.random() * 600 - 400
      );
      cloud.rotation.x = (Math.PI / 2) * 0.7;
      cloud.material.opacity = 0.6;
      cloudDir.push(Math.random() > 0.5 ? 1 : -1);
      clouds.add(cloud);
    }
    render();
  });
  return [clouds, cloudDir];
};
export default createClouds;
