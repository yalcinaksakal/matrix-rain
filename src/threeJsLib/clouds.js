import {
  Group,
  Mesh,
  MeshLambertMaterial,
  PlaneBufferGeometry,
  TextureLoader,
} from "three";
const NUM_OF_CLOUDS = 20;

const createClouds = render => {
  let loader = new TextureLoader();
  const clouds = new Group();
  loader.load("cloud.png", function (texture) {
    const cloudGeo = new PlaneBufferGeometry(300, 300);
    const cloudMaterial = new MeshLambertMaterial({
      map: texture,
      transparent: true,
    });
    let cloud;
    for (let i = 0; i < NUM_OF_CLOUDS; i++) {
      cloud = new Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 500 - 250,
        80,
        Math.random() * 600 - 300
      );
      cloud.rotation.x = (Math.PI / 2) * 0.8;
      cloud.material.opacity = 0.6;
      clouds.add(cloud);
    }
    render();
  });
  return clouds;
};
export default createClouds;
