import { Group, Mesh, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const cloudLoader = onLoad => {
  const geos = [],
    num_of_clouds = 10,
    material = new MeshBasicMaterial({
      color: "#404040",
      transparent: true,
      opacity: 0.8,
      roughness: 0,
    }),
    clouds = new Group(),
    cloudDir = [];
  let scale;
  const createClouds = () => {
    for (let i = 0; i < num_of_clouds; i++) {
      const cloud = new Mesh(geos[Math.floor(Math.random() * 3)], material);
      scale = Math.random() * 50 + 20;
      cloud.scale.set(scale, scale, scale);
      cloud.position.set(
        (Math.random() * window.innerWidth) / 3 - window.innerWidth / 6,
        100,
        Math.random() * 400 - 200
      );
      clouds.add(cloud);
      cloudDir.push(Math.random() > 0.5 ? 1 : -1);
    }
    // onLoad.add(clouds);
    onLoad(clouds, cloudDir);
  };
  const addModel = gltf => {
    const model = gltf.scene;
    model.traverse(m => {
      if (m.isMesh) geos.push(m.geometry);
    });
    createClouds();
  };

  new GLTFLoader().load("cloud/scene.gltf", gltf => addModel(gltf));
};
export default cloudLoader;
