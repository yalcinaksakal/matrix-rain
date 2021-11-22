import { Color, Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const lightningLoader = onLoad => {
  const addModel = gltf => {
    const model = gltf.scene;
    const lightning = new Group();
    model.traverse(m => {
      if (
        [
          "Object_6",
          "Object_8",
          "Object_10",
          "Object_12",
          "Object_14",
          "Object_16",
          "Object_18",
          "Object_20",
        ].includes(m.name)
      ) {
        m.scale.set(30, 45, 30);
        m.material.color = new Color("#7DF9FF");
        lightning.add(m);
      }
    });
    lightning.visible = false;
    onLoad(lightning);
  };

  new GLTFLoader().load("lightning/scene.gltf", gltf => addModel(gltf));
};
export default lightningLoader;
