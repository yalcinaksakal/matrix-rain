import {
  AmbientLight,
  Mesh,
  MeshBasicMaterial,
  PointLight,
  SphereBufferGeometry,
  TextureLoader,
} from "three";

const createLights = appender => {
  //lights
  // const light = new DirectionalLight(0xffeedd);
  // light.position.set(0, 100, 0);
  // light.target.position.set(0, 0, 0);
  // light.castShadow = true;
  // light.shadow.bias = -0.01;
  // light.shadow.mapSize.width = 2048;
  // light.shadow.mapSize.height = 2048;
  // light.shadow.camera.near = 1.0;
  // light.shadow.camera.far = 500;
  // light.shadow.camera.left = 200;
  // light.shadow.camera.right = -200;
  // light.shadow.camera.top = 200;
  // light.shadow.camera.bottom = -200;

  const flash = new PointLight(0x062d89, 1, 500);
  flash.position.set(0, 90, 0);

  const pl = new PointLight("#03a062", 100, 500);
  pl.castShadow = true;
  pl.shadow.bias = -0.005;

  const loader = new TextureLoader();
  const texture = loader.load("moon_texture-min.jpg", t => {
    const geometry = new SphereBufferGeometry(30, 128, 64);
    const material = new MeshBasicMaterial({
      map: texture,
      color: "#03a062",
    });
    const moon = new Mesh(geometry, material);
    pl.position.set(-window.innerWidth / 3, 140, 0);
    pl.add(moon);
    appender(pl);
  });

  // const pointLightHelper = new PointLightHelper(light, 5);
  return {
    ambient: new AmbientLight(0x555555),
    flash,
  };
};

export default createLights;
