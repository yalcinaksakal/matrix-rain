import { PlaneGeometry, MeshStandardMaterial, DoubleSide, Mesh } from "three";

//Plane
const createPlane = () => {
  const plane = new Mesh(
    new PlaneGeometry(window.innerWidth / 2, 400, 2, 2),
    new MeshStandardMaterial({
      color: "black",
      transparent: true,
      opacity: 0.4,
    })
  );

  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.material.side = DoubleSide;
  plane.position.set(0, -100, 50);
  return plane;
};

export default createPlane;
