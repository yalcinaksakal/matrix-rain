import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
} from "three";
const NUM_OF_DROPS = 400 * 150;
const createRain = () => {
  const rainGeo = new BufferGeometry();
  const drops = [];
  for (let i = 0; i < NUM_OF_DROPS; i++)
    drops.push(
      Math.random() * 400 - 200,
      Math.random() * 60,
      Math.random() * 150 - 25
    );

  rainGeo.setAttribute("position", new Float32BufferAttribute(drops, 3));
  console.log(rainGeo);
  const rainMaterial = new PointsMaterial({
    color: 0xaaaaaa,
    size: 0.01,
    transparent: true,
    opacity: 0.3,
  });
  return new Points(rainGeo, rainMaterial);
};
export default createRain;
